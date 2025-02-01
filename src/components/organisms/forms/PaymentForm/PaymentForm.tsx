import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { Button, Stack, Alert } from "@mantine/core";
import { stripePromise } from "@/utils/config/stripe.config";

interface PaymentFormProps {
  clientSecret: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const PaymentFormContent = ({
  onSuccess,
  onError,
}: Omit<PaymentFormProps, "clientSecret">) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred during payment");
        onError?.(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess?.();
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      onError?.("An unexpected error occurred");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        {errorMessage && (
          <Alert color="red" title="Error">
            {errorMessage}
          </Alert>
        )}
        <PaymentElement />
        <Button
          type="submit"
          loading={isProcessing}
          disabled={!stripe || isProcessing}
          fullWidth
        >
          {isProcessing ? "Processing..." : "Pay now"}
        </Button>
      </Stack>
    </form>
  );
};

export const PaymentForm = ({ clientSecret, ...props }: PaymentFormProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};
