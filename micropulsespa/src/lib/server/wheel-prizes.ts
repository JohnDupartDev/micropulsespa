import type { WheelPrize } from '../../types/wheel';

export const WHEEL_PRIZES: WheelPrize[] = [
  {
    id: 1,
    label: 'Sesión de Micropuntura',
    shortLabel: 'Micropuntura',
    weight: 4,
    category: 'premium',
  },
  {
    id: 2,
    label: 'Limpieza Facial Profunda',
    shortLabel: 'Limpieza Facial',
    weight: 7,
    category: 'service',
  },
  {
    id: 3,
    label: 'Masaje Relajante',
    shortLabel: 'Masaje Relajante',
    weight: 7,
    category: 'service',
  },
  {
    id: 4,
    label: 'Dranaje linfático',
    shortLabel: 'Dranaje linfático',
    weight: 18,
    category: 'service',
  },
  {
    id: 5,
    label: 'Masaje con Pindas',
    shortLabel: 'Masaje con Pindas',
    weight: 8,
    category: 'service',
  },
  {
    id: 6,
    label: '15% de descuento en tu primera cita',
    shortLabel: '15% OFF',
    weight: 28,
    category: 'discount',
  },
  {
    id: 7,
    label: '20% de descuento en tu primera cita',
    shortLabel: '20% OFF',
    weight: 23,
    category: 'discount',
  },
  {
    id: 8,
    label: 'Bono sorpresa para tu primera cita',
    shortLabel: 'Bono Sorpresa',
    weight: 15,
    category: 'bonus',
  },
];

export function pickPrize(): WheelPrize {
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
