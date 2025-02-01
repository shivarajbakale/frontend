import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Title,
  Text,
  Stack,
  Button,
  rem,
} from "@mantine/core";
import { getPaymentStatus } from "@/utils/api/payment.api";
import {
  PAYMENT_STATUS,
  type PaymentStatus,
} from "@/utils/config/stripe.config";

export const PaymentConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PaymentStatus>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    if (paymentIntentId) {
      getPaymentStatus(paymentIntentId)
        .then((response) => {
          setStatus(response.status);
        })
        .catch((err) => {
          setError(err.message || "Failed to fetch payment status");
        });
    }
  }, [searchParams]);

  const getStatusColor = () => {
    switch (status) {
      case PAYMENT_STATUS.SUCCEEDED:
        return "green";
      case PAYMENT_STATUS.PROCESSING:
        return "yellow";
      case PAYMENT_STATUS.FAILED:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" gap="md">
          {status === PAYMENT_STATUS.SUCCEEDED ? (
            <IconCheck
              style={{ width: rem(48), height: rem(48) }}
              color="green"
            />
          ) : (
            <IconX style={{ width: rem(48), height: rem(48) }} color="red" />
          )}
          <Title order={2}>
            {status === PAYMENT_STATUS.SUCCEEDED
              ? "Payment Successful!"
              : "Payment Failed"}
          </Title>
          <Text c={getStatusColor()}>
            {status === PAYMENT_STATUS.SUCCEEDED
              ? "Your payment has been processed successfully."
              : error || "There was an issue processing your payment."}
          </Text>
          <Button onClick={() => navigate("/")} mt="md">
            Return to Home
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};
