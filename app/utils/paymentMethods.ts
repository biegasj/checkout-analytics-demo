export interface PaymentMethod {
  id: string;
  label: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "paypal", label: "PayPal" },
  { id: "credit-card", label: "Credit Card" },
];
