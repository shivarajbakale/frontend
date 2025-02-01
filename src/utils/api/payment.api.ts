import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3002";

interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
}

export const createPaymentIntent = async (
  data: CreatePaymentIntentRequest,
): Promise<CreatePaymentIntentResponse> => {
  const response = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
    amount: data.amount,
    currency: data.currency || "usd",
  });
  return response.data;
};

export const getPaymentStatus = async (paymentIntentId: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/payment-status/${paymentIntentId}`,
  );
  return response.data;
};
