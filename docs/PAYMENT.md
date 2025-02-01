# Payment Integration Guide

## Overview
The payment system is implemented using Stripe for secure payment processing. This guide covers the setup, implementation, and best practices for handling payments in the Rocketship Frontend application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Payment Flow](#payment-flow)
- [Implementation Guide](#implementation-guide)
- [Security Considerations](#security-considerations)
- [Testing](#testing)
- [Resources](#resources)

## Prerequisites
- Stripe account
- Stripe API keys (publishable key and secret key)
- Stripe SDK installed (`@stripe/stripe-js`)

## Setup

### 1. Environment Variables
Create or update your `.env` file:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

### 2. Dependencies
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 3. Initialize Stripe
Create `src/utils/stripe.ts`:
```typescript
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

## Payment Flow
1. User enters payment amount
2. Frontend calls backend to create a Payment Intent
3. Stripe Elements form is displayed
4. User enters card details
5. Payment is processed
6. User is redirected to confirmation page

## Implementation Guide

### 1. Backend API Implementation
Create a new endpoint for payment intents:

```typescript
// Example backend implementation (server.ts/js)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    // Validate amount
    if (amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. PaymentForm Component
Create `src/components/organisms/forms/PaymentForm/PaymentForm.tsx`:

```typescript
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button, Stack, Alert } from '@mantine/core';
import { useState } from 'react';

interface PaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const PaymentForm = ({ clientSecret, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(undefined);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        onError(error);
      } else {
        onSuccess();
      }
    } catch (e) {
      setErrorMessage('An unexpected error occurred.');
      onError(e as Error);
    } finally {
      setIsProcessing(false);
    }
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
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </Stack>
    </form>
  );
};
```

### 3. Stripe Provider Setup
Update your `App.tsx`:

```typescript
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/utils/stripe';

function App() {
  return (
    <Elements stripe={stripePromise}>
      {/* Your routes/components */}
    </Elements>
  );
}
```

## Security Considerations

### Best Practices
- Always create Payment Intents on the server side
- Never log or expose the Stripe secret key
- Implement proper error handling and validation
- Use HTTPS for all API calls
- Implement proper authentication and authorization
- Validate payment amounts on both client and server
- Handle failed payments gracefully
- Implement idempotency for payment requests

### Data Handling
- Never store raw credit card data
- Use Stripe Elements to collect card information securely
- Implement proper data sanitization for user inputs
- Log payment attempts for audit purposes (without sensitive data)

## Testing

### Test Cards
Use these Stripe test card numbers:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Authentication Required: 4000 0027 6000 3184

### Test Scenarios
1. Successful payment flow
2. Declined payment handling
3. Network error handling
4. Form validation
5. 3D Secure authentication
6. Payment confirmation
7. Error message display

## Resources
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements React](https://stripe.com/docs/stripe-js/react)
- [Testing Stripe Payments](https://stripe.com/docs/testing)
- [Stripe Best Practices](https://stripe.com/docs/security/guide) 