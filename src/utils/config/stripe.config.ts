import { loadStripe } from "@stripe/stripe-js";

// Replace with your Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const PAYMENT_STATUS = {
  SUCCEEDED: "succeeded",
  PROCESSING: "processing",
  FAILED: "failed",
} as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
