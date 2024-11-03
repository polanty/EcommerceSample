import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; //
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.styles";

import { FormContainer, PaymentFormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    console.log("submitted");

    // if (!stripe || !elements) {
    //   return;
    // }

    // const response = await fetch("/.netlify/functions/create-payment-intent", {
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({ amount: 1000 }),
    // }).then((res) => res.json());

    // console.log(response);
  };

  return (
    <PaymentFormContainer onSubmit={paymentHandler}>
      <FormContainer>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          children={"Pay Now"}
        ></Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
