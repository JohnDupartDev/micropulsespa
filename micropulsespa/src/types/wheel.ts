export type WheelPrizeCategory =
  | 'premium'
  | 'service'
  | 'discount'
  | 'bonus';

export type WheelPrize = {
  id: number;
  label: string;
  shortLabel: string;
  weight: number;
  category: WheelPrizeCategory;
};

export type SpinWheelRequest = {
  fullName: string;
  email: string;
  phone: string;
  instagram: string;
};

export type SpinWheelSuccessResponse = {
  success: true;
  participantId: string;
  prizeId: number;
  prizeLabel: string;
  couponCode: string;
  whatsappUrl: string;
};

export type SpinWheelErrorResponse = {
  success: false;
  errorType:
    | 'VALIDATION'
    | 'DUPLICATE'
    | 'DATABASE'
    | 'CONFIG'
    | 'SERVER';
  message: string;
};

export type SpinWheelResponse =
  | SpinWheelSuccessResponse
  | SpinWheelErrorResponse;
