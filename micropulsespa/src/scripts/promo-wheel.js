const panels = document.querySelectorAll('[data-panel]');
const toast = document.querySelector('[data-toast]');
const form = document.querySelector('[data-form]');
const submitBtn = document.querySelector('[data-submit]');
const spinBtn = document.querySelector('[data-spin]');
const wheel = document.querySelector('[data-wheel]');
const wheelArea = document.querySelector('[data-wheel-area]');
const wheelHint = document.querySelector('[data-wheel-hint]');
const greeting = document.querySelector('[data-greeting]');
const resultPrize = document.querySelector('[data-result-prize]');
const resultCode = document.querySelector('[data-result-code]');
const claimBtn = document.querySelector('[data-claim]');
const statusPill = document.querySelector('[data-status-pill]');
const promoCard = document.querySelector('[data-promo-card]');

const notice = document.querySelector('[data-notice]');
const noticeTitle = document.querySelector('[data-notice-title]');
const noticeMessage = document.querySelector('[data-notice-message]');
const noticeIcon = document.querySelector('[data-notice-icon]');
const noticeClose = document.querySelector('[data-notice-close]');

const startButtons = document.querySelectorAll('[data-start-form], [data-jump-form], [data-scroll-game]');
const scrollWheelBtn = document.querySelector('[data-scroll-wheel]');

const PRIZES = JSON.parse(wheelArea?.dataset.prizes || '[]');
const ARC = 360 / PRIZES.length;
const SPIN_DURATION = 7200;

let assignedPrizeIndex = null;
let currentRotation = 0;
let lastResult = null;
let spinning = false;
let audioContext = null;
let tickTimeout = null;
let spinFinished = false;

function setStep(step) {
  panels.forEach((panel) => {
    panel.classList.toggle('hidden', panel.dataset.panel !== step);
  });
}

function scrollToCard() {
  setTimeout(() => {
    promoCard?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, 150);
}

function scrollToWheel() {
  setTimeout(() => {
    wheelArea?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, 150);
}

function showToast(message, type = 'error') {
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'mb-4 rounded-2xl border px-4 py-3 text-sm font-semibold';

  if (type === 'success') {
    toast.classList.add('border-green-200', 'bg-green-50', 'text-green-700');
  } else {
    toast.classList.add('border-red-200', 'bg-red-50', 'text-red-700');
  }

  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 4200);
}

function showNotice({
  title = 'Atención',
  message = 'Primero debes registrarte para girar la ruleta.',
  icon = '⚠️',
} = {}) {
  noticeTitle.textContent = title;
  noticeMessage.textContent = message;
  noticeIcon.textContent = icon;
  notice.classList.remove('hidden');
  notice.classList.add('flex');
}

function closeNotice() {
  notice.classList.add('hidden');
  notice.classList.remove('flex');
}

noticeClose?.addEventListener('click', closeNotice);
notice?.addEventListener('click', (event) => {
  if (event.target === notice) closeNotice();
});

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, duration = 0.06, type = 'sine', volume = 0.035) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn('Audio unavailable:', error);
  }
}

function playTick() {
  playTone(950, 0.035, 'square', 0.014);
}

function playStartSound() {
  playTone(220, 0.1, 'sawtooth', 0.025);
  setTimeout(() => playTone(330, 0.09, 'sawtooth', 0.025), 90);
}

function playWinSound() {
  [523, 659, 784, 1046].forEach((frequency, index) => {
    setTimeout(() => playTone(frequency, 0.16, 'sine', 0.05), index * 120);
  });
}

function startTickLoop() {
  const startedAt = Date.now();

  function loop() {
    const progress = Math.min((Date.now() - startedAt) / SPIN_DURATION, 1);
    const delay = 55 + progress * 260;

    playTick();

    if (progress < 0.96 && spinning) {
      tickTimeout = setTimeout(loop, delay);
    }
  }

  loop();
}

function stopTickLoop() {
  if (tickTimeout) {
    clearTimeout(tickTimeout);
    tickTimeout = null;
  }
}

function cleanPhone(value) {
  return value.replace(/\D/g, '');
}

function cleanInstagram(value) {
  return value.trim().replace(/^@+/, '').toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCurrentWheelRotation() {
  const transform = window.getComputedStyle(wheel).transform;

  if (!transform || transform === 'none') {
    return currentRotation;
  }

  const values = transform.match(/matrix\(([^)]+)\)/);

  if (!values) {
    return currentRotation;
  }

  const matrix = values[1].split(',').map(Number);
  const a = matrix[0];
  const b = matrix[1];
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

  return ((angle % 360) + 360) % 360;
}

function activateWheelState() {
  statusPill.textContent = 'Listo para girar';
  statusPill.className =
    'rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-bold text-green-700';

  wheelHint.textContent = 'Tu registro está validado. Ahora puedes girar la ruleta.';
  spinBtn.classList.remove('bg-[#1f2024]');
  spinBtn.classList.add('bg-[#b76bc0]');

  setStep('ready');
  scrollToCard();
}

startButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const gameSection = document.querySelector('#ruleta');
    setStep('form');

    setTimeout(() => {
      gameSection?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 100);
  });
});

scrollWheelBtn?.addEventListener('click', scrollToWheel);

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const fullName = String(formData.get('fullName') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const phone = cleanPhone(String(formData.get('phone') || ''));
  const instagram = cleanInstagram(String(formData.get('instagram') || ''));

  if (!fullName || !email || !phone || !instagram) {
    showNotice({
      title: 'Datos incompletos',
      message: 'Por favor completa todos los campos para validar tu participación.',
      icon: '⚠️',
    });
    return;
  }

  if (!isValidEmail(email)) {
    showNotice({
      title: 'Correo inválido',
      message: 'Ingresa un correo electrónico válido.',
      icon: '✉️',
    });
    return;
  }

  if (phone.length < 10) {
    showNotice({
      title: 'WhatsApp inválido',
      message: 'Ingresa un número de WhatsApp válido.',
      icon: '📱',
    });
    return;
  }

  if (!/^[a-z0-9._]{2,30}$/.test(instagram)) {
    showNotice({
      title: 'Instagram inválido',
      message: 'Ingresa tu usuario de Instagram sin espacios ni caracteres especiales.',
      icon: '📸',
    });
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Validando participación...';

  try {
    const response = await fetch('/api/spin-wheel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, instagram }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      showNotice({
        title: result.errorType === 'DUPLICATE' ? 'Ya participaste' : 'No se pudo registrar',
        message: result.message || 'No se pudo registrar la participación.',
        icon: result.errorType === 'DUPLICATE' ? '🔒' : '⚠️',
      });
      return;
    }

    lastResult = result;
    assignedPrizeIndex = PRIZES.findIndex((prize) => prize.id === result.prizeId);

    if (assignedPrizeIndex < 0) {
      showNotice({
        title: 'Error de premio',
        message: 'No se pudo asignar el premio visualmente.',
        icon: '⚠️',
      });
      return;
    }

    greeting.textContent = `¡${fullName}, ya puedes girar!`;

    showToast('Registro exitoso. Ya puedes girar la ruleta.', 'success');
    playTone(700, 0.08, 'sine', 0.035);
    activateWheelState();
  } catch (error) {
    console.error(error);

    showNotice({
      title: 'Error de conexión',
      message: 'No pudimos conectar con el sistema. Intenta nuevamente.',
      icon: '⚠️',
    });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Validar participación';
  }
});

spinBtn?.addEventListener('click', () => {
  if (!lastResult || assignedPrizeIndex === null) {
    showNotice({
      title: 'Primero regístrate',
      message: 'Completa el formulario para activar tu giro. Solo se permite una participación por persona.',
      icon: '✨',
    });

    setStep('form');
    scrollToCard();
    return;
  }

  if (spinning) return;

  spinning = true;
  spinFinished = false;

  spinBtn.disabled = true;
  spinBtn.textContent = 'Girando...';

  wheel.classList.remove('wheel-idle');

  const visualRotation = getCurrentWheelRotation();

  currentRotation = visualRotation;
  wheel.style.transition = 'none';
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  playStartSound();
  startTickLoop();

  requestAnimationFrame(() => {
    const prizeCenterAngle = assignedPrizeIndex * ARC + ARC / 2;
    const safeJitter = (Math.random() - 0.5) * ARC * 0.42;
    const targetAngle = prizeCenterAngle + safeJitter;

    const currentRotationMod = ((currentRotation % 360) + 360) % 360;
    const targetRotationMod = ((360 - targetAngle) % 360 + 360) % 360;
    const delta = (targetRotationMod - currentRotationMod + 360) % 360;

    const extraTurns = 6 * 360;
    const finalRotation = currentRotation + extraTurns + delta;

    currentRotation = finalRotation;

    wheel.style.transition =
      `transform ${SPIN_DURATION}ms cubic-bezier(0.12, 0.72, 0.08, 1)`;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
  });

  const finishSpin = () => {
    if (spinFinished) return;
    spinFinished = true;

    stopTickLoop();
    playWinSound();

    resultPrize.textContent = lastResult.prizeLabel;
    resultCode.textContent = lastResult.couponCode;

    if (lastResult.whatsappUrl) {
      claimBtn.href = lastResult.whatsappUrl;
      claimBtn.classList.remove('hidden');
    } else {
      claimBtn.classList.add('hidden');
    }

    setStep('result');

    spinning = false;
    spinBtn.disabled = false;
    spinBtn.textContent = 'Girar ruleta';

    setTimeout(() => {
      resultPrize?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 250);
  };

  wheel.addEventListener('transitionend', finishSpin, { once: true });
  setTimeout(finishSpin, SPIN_DURATION + 500);
});
