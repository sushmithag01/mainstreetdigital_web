import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Modal from "react-bootstrap/Modal";
import shopLocalDigital from "../../assets/Black Shop local logo.svg";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

function StripeModal({
  voucherAmount,
  setModalShow,
  SetLoading,
  voucherDetail,
  ...props
}) {
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHBALE_KEY
  );

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {
      theme: "stripe",
      backgroundColor: "#000",
    },
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="stripe_Modal_Main"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="stripe_Modal">
          <div className="shopLocalDigital_Logo">
            <img alt="shop local digital" src={shopLocalDigital} />
          </div>
          <p>Please fill in your card details to proceed.</p>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              setLoading={SetLoading}
              setModalShow={setModalShow}
              voucherDetail={voucherDetail}
            />
          </Elements>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StripeModal;
