// StripeProviderWeb.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
};

// Stripe is not supported on web — render children without wrapping
export default function StripeProvider({ children }: Props) {
  return <>{children}</>;
}
