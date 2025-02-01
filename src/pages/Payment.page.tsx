import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  NumberInput,
  Button,
} from "@mantine/core";
import { PaymentForm } from "@/components/organisms/forms/PaymentForm/PaymentForm";
import { createPaymentIntent } from "@/utils/api/payment.api";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState<string>();
  const navigate = useNavigate();

  const handleAmountSubmit = async () => {
    try {
      const { clientSecret: secret } = await createPaymentIntent({
        amount: amount * 100, // Convert to cents
        currency: "usd",
      });
      setClientSecret(secret);
    } catch (error) {
      console.error("Failed to create payment intent:", error);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper p="xl" radius="md" withBorder>
        <Stack gap="lg">
          <Title order={2}>Make a Payment</Title>

          {!clientSecret ? (
            <>
              <Text>Enter the amount you want to pay:</Text>
              <NumberInput
                value={amount}
                onChange={(value) => setAmount(Number(value))}
                min={0}
                decimalScale={2}
                prefix="$"
                placeholder="Enter amount"
              />
              <Button onClick={handleAmountSubmit} fullWidth>
                Proceed to Payment
              </Button>
            </>
          ) : (
            <PaymentForm
              clientSecret={clientSecret}
              onSuccess={() => {
                navigate("/payment-confirmation");
              }}
              onError={(error) => {
                console.error("Payment failed:", error);
              }}
            />
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default PaymentPage;
