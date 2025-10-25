import { StripeProvider } from "@stripe/stripe-react-native";

export default function PaymentNative() {
  return (
    <StripeProvider publishableKey="your-publishable-key">
      {/* Your native payment UI */}
    </StripeProvider>
  );
}
