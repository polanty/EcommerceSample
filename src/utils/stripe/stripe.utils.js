import { loadStripe } from "@stripe/stripe-js";

// stripe publishable key

export const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
