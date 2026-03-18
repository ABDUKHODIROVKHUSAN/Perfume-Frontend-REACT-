export type PaymentMethodId = "visa" | "mastercard" | "paypal" | "western";

export interface PaymentProfile {
  preferredMethod: PaymentMethodId;
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const STORAGE_PREFIX = "paymentProfile:";

const DEFAULT_PAYMENT_PROFILE: PaymentProfile = {
  preferredMethod: "visa",
  cardHolder: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export const getPaymentProfile = (memberKey?: string): PaymentProfile => {
  if (!memberKey) return { ...DEFAULT_PAYMENT_PROFILE };

  const raw = localStorage.getItem(`${STORAGE_PREFIX}${memberKey}`);
  if (!raw) return { ...DEFAULT_PAYMENT_PROFILE };

  try {
    const parsed = JSON.parse(raw) as Partial<PaymentProfile>;
    return {
      preferredMethod:
        parsed.preferredMethod === "mastercard" ||
        parsed.preferredMethod === "paypal" ||
        parsed.preferredMethod === "western"
          ? parsed.preferredMethod
          : "visa",
      cardHolder: parsed.cardHolder ?? "",
      cardNumber: parsed.cardNumber ?? "",
      expiry: parsed.expiry ?? "",
      cvv: parsed.cvv ?? "",
    };
  } catch {
    return { ...DEFAULT_PAYMENT_PROFILE };
  }
};

export const savePaymentProfile = (
  memberKey: string,
  profile: PaymentProfile
): void => {
  localStorage.setItem(`${STORAGE_PREFIX}${memberKey}`, JSON.stringify(profile));
};
