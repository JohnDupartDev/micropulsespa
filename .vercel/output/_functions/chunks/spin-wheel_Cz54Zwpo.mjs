import { createClient } from '@supabase/supabase-js';
import { l as getEnv$1, n as setOnSetGetEnv } from './entrypoint_Cbjfms40.mjs';

// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const getSecret = (key) => {
	return getEnv(key);
};

setOnSetGetEnv(() => {
	
});

function getSupabaseAdmin() {
  const supabaseUrl = getSecret("SUPABASE_URL");
  const supabaseServiceRoleKey = getSecret("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase server environment variables.");
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
function getWhatsappNumber() {
  return getSecret("WHATSAPP_NUMBER") ?? "";
}

const WHEEL_PRIZES = [
  {
    id: 1,
    label: "Sesión de Micropuntura",
    shortLabel: "Micropuntura",
    weight: 3,
    category: "premium"
  },
  {
    id: 2,
    label: "Limpieza Facial Profunda",
    shortLabel: "Limpieza Facial",
    weight: 7,
    category: "service"
  },
  {
    id: 3,
    label: "Masaje Relajante",
    shortLabel: "Masaje",
    weight: 8,
    category: "service"
  },
  {
    id: 4,
    label: "Sesión de Presoterapia",
    shortLabel: "Presoterapia",
    weight: 8,
    category: "service"
  },
  {
    id: 5,
    label: "15% de descuento en tu primera cita",
    shortLabel: "15% OFF",
    weight: 32,
    category: "discount"
  },
  {
    id: 6,
    label: "20% de descuento en tu primera cita",
    shortLabel: "20% OFF",
    weight: 22,
    category: "discount"
  },
  {
    id: 7,
    label: "Diagnóstico facial gratis",
    shortLabel: "Diagnóstico Gratis",
    weight: 15,
    category: "bonus"
  },
  {
    id: 8,
    label: "Bono sorpresa para tu primera cita",
    shortLabel: "Bono Sorpresa",
    weight: 5,
    category: "bonus"
  }
];
function pickPrize() {
  const totalWeight = WHEEL_PRIZES.reduce((sum, prize) => {
    return sum + prize.weight;
  }, 0);
  let randomValue = Math.random() * totalWeight;
  for (const prize of WHEEL_PRIZES) {
    randomValue -= prize.weight;
    if (randomValue <= 0) {
      return prize;
    }
  }
  return WHEEL_PRIZES[WHEEL_PRIZES.length - 1];
}

const prerender = false;
function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
function normalizeName(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}
function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}
function normalizePhone(value) {
  return String(value ?? "").replace(/\D/g, "");
}
function normalizeInstagram(value) {
  return String(value ?? "").trim().replace(/^@+/, "").toLowerCase();
}
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidInstagram(instagram) {
  return /^[a-z0-9._]{2,30}$/.test(instagram);
}
function makeCouponCode() {
  const suffix = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `MICRO-${suffix}`;
}
function getClientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
}
const POST = async ({ request }) => {
  try {
    const rawBody = await request.json();
    const fullName = normalizeName(rawBody.fullName);
    const email = normalizeEmail(rawBody.email);
    const phone = normalizePhone(rawBody.phone);
    const instagram = normalizeInstagram(rawBody.instagram);
    if (!fullName || !email || !phone || !instagram) {
      return jsonResponse(
        {
          success: false,
          errorType: "VALIDATION",
          message: "Nombre, correo, teléfono e Instagram son obligatorios."
        },
        400
      );
    }
    if (fullName.length < 3) {
      return jsonResponse(
        {
          success: false,
          errorType: "VALIDATION",
          message: "Ingresa un nombre válido."
        },
        400
      );
    }
    if (!isValidEmail(email)) {
      return jsonResponse(
        {
          success: false,
          errorType: "VALIDATION",
          message: "Ingresa un correo válido."
        },
        400
      );
    }
    if (phone.length < 10) {
      return jsonResponse(
        {
          success: false,
          errorType: "VALIDATION",
          message: "Ingresa un teléfono válido."
        },
        400
      );
    }
    if (!isValidInstagram(instagram)) {
      return jsonResponse(
        {
          success: false,
          errorType: "VALIDATION",
          message: "Ingresa un usuario de Instagram válido."
        },
        400
      );
    }
    const supabase = getSupabaseAdmin();
    const { data: existingParticipant, error: existingError } = await supabase.from("wheel_participants").select("id, email, phone, instagram").or(`email.eq.${email},phone.eq.${phone},instagram.eq.${instagram}`).maybeSingle();
    if (existingError) {
      console.error("Supabase duplicate check error:", existingError);
      return jsonResponse(
        {
          success: false,
          errorType: "DATABASE",
          message: "No se pudo validar la participación."
        },
        500
      );
    }
    if (existingParticipant) {
      return jsonResponse(
        {
          success: false,
          errorType: "DUPLICATE",
          message: "Ya existe una participación registrada con ese correo, teléfono o Instagram."
        },
        409
      );
    }
    const prize = pickPrize();
    const couponCode = makeCouponCode();
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") ?? "";
    const { data: participant, error: insertError } = await supabase.from("wheel_participants").insert({
      full_name: fullName,
      email,
      phone,
      instagram,
      prize_id: prize.id,
      prize_label: prize.label,
      coupon_code: couponCode,
      ip,
      user_agent: userAgent
    }).select("id, prize_id, prize_label, coupon_code").single();
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      if (insertError.code === "23505") {
        return jsonResponse(
          {
            success: false,
            errorType: "DUPLICATE",
            message: "Ya existe una participación registrada con ese correo, teléfono o Instagram."
          },
          409
        );
      }
      return jsonResponse(
        {
          success: false,
          errorType: "DATABASE",
          message: "No se pudo registrar la participación."
        },
        500
      );
    }
    const whatsappNumber = getWhatsappNumber();
    const whatsappText = `Hola, soy ${fullName}. Participé en la ruleta de inauguración de MicroPulse Spa y gané: ${participant.prize_label}. Mi código es ${participant.coupon_code}. Mi Instagram es @${instagram}.`;
    const whatsappUrl = whatsappNumber ? `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      whatsappText
    )}` : "";
    return jsonResponse({
      success: true,
      participantId: participant.id,
      prizeId: participant.prize_id,
      prizeLabel: participant.prize_label,
      couponCode: participant.coupon_code,
      whatsappUrl
    });
  } catch (error) {
    console.error("Spin wheel server error:", error);
    return jsonResponse(
      {
        success: false,
        errorType: "SERVER",
        message: "Error interno del servidor."
      },
      500
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
