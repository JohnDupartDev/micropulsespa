import type { APIRoute } from 'astro';
import { getSupabaseAdmin, getWhatsappNumber } from '../../lib/server/supabase';
import { pickPrize } from '../../lib/server/wheel-prizes';
import type {
  SpinWheelErrorResponse,
  SpinWheelRequest,
  SpinWheelSuccessResponse,
} from '../../types/wheel';

export const prerender = false;

function jsonResponse(
  body: SpinWheelSuccessResponse | SpinWheelErrorResponse,
  status = 200
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function normalizeName(value: unknown) {
  return String(value ?? '').trim().replace(/\s+/g, ' ');
}

function normalizeEmail(value: unknown) {
  return String(value ?? '').trim().toLowerCase();
}

function normalizePhone(value: unknown) {
  return String(value ?? '').replace(/\D/g, '');
}

function normalizeInstagram(value: unknown) {
  return String(value ?? '')
    .trim()
    .replace(/^@+/, '')
    .toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidInstagram(instagram: string) {
  return /^[a-z0-9._]{2,30}$/.test(instagram);
}

function makeCouponCode() {
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `MICRO-${suffix}`;
}

function getClientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    ''
  );
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = (await request.json()) as Partial<SpinWheelRequest>;

    const fullName = normalizeName(rawBody.fullName);
    const email = normalizeEmail(rawBody.email);
    const phone = normalizePhone(rawBody.phone);
    const instagram = normalizeInstagram(rawBody.instagram);

    if (!fullName || !email || !phone || !instagram) {
      return jsonResponse(
        {
          success: false,
          errorType: 'VALIDATION',
          message: 'Nombre, correo, teléfono e Instagram son obligatorios.',
        },
        400
      );
    }

    if (fullName.length < 3) {
      return jsonResponse(
        {
          success: false,
          errorType: 'VALIDATION',
          message: 'Ingresa un nombre válido.',
        },
        400
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          errorType: 'VALIDATION',
          message: 'Ingresa un correo válido.',
        },
        400
      );
    }

    if (phone.length < 10) {
      return jsonResponse(
        {
          success: false,
          errorType: 'VALIDATION',
          message: 'Ingresa un teléfono válido.',
        },
        400
      );
    }

    if (!isValidInstagram(instagram)) {
      return jsonResponse(
        {
          success: false,
          errorType: 'VALIDATION',
          message: 'Ingresa un usuario de Instagram válido.',
        },
        400
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: existingParticipant, error: existingError } = await supabase
      .from('wheel_participants')
      .select('id, email, phone, instagram')
      .or(`email.eq.${email},phone.eq.${phone},instagram.eq.${instagram}`)
      .maybeSingle();

    if (existingError) {
      console.error('Supabase duplicate check error:', existingError);

      return jsonResponse(
        {
          success: false,
          errorType: 'DATABASE',
          message: 'No se pudo validar la participación.',
        },
        500
      );
    }

    if (existingParticipant) {
      return jsonResponse(
        {
          success: false,
          errorType: 'DUPLICATE',
          message:
            'Ya existe una participación registrada con ese correo, teléfono o Instagram.',
        },
        409
      );
    }

    const prize = pickPrize();
    const couponCode = makeCouponCode();
    const ip = getClientIp(request);
    const userAgent = request.headers.get('user-agent') ?? '';

    const { data: participant, error: insertError } = await supabase
      .from('wheel_participants')
      .insert({
        full_name: fullName,
        email,
        phone,
        instagram,
        prize_id: prize.id,
        prize_label: prize.label,
        coupon_code: couponCode,
        ip,
        user_agent: userAgent,
      })
      .select('id, prize_id, prize_label, coupon_code')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);

      if (insertError.code === '23505') {
        return jsonResponse(
          {
            success: false,
            errorType: 'DUPLICATE',
            message:
              'Ya existe una participación registrada con ese correo, teléfono o Instagram.',
          },
          409
        );
      }

      return jsonResponse(
        {
          success: false,
          errorType: 'DATABASE',
          message: 'No se pudo registrar la participación.',
        },
        500
      );
    }

    const whatsappNumber = getWhatsappNumber();

    const whatsappText = `Hola, soy ${fullName}. Participé en la ruleta de inauguración de MicroPulse Spa y gané: ${participant.prize_label}. Mi código es ${participant.coupon_code}. Mi Instagram es @${instagram}.`;

    const whatsappUrl = whatsappNumber
      ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
          whatsappText
        )}`
      : '';

    return jsonResponse({
      success: true,
      participantId: participant.id,
      prizeId: participant.prize_id,
      prizeLabel: participant.prize_label,
      couponCode: participant.coupon_code,
      whatsappUrl,
    });
  } catch (error) {
    console.error('Spin wheel server error:', error);

    return jsonResponse(
      {
        success: false,
        errorType: 'SERVER',
        message: 'Error interno del servidor.',
      },
      500
    );
  }
};
