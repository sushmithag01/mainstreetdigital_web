import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getUser, userId } from "../../Utils/Auth/LocalStorage";
import ErrorText from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { StripepaymentApi } from "./../../Services/Api/StripepaymentApi";

const CheckoutForm = ({ setLoading, setModalShow, voucherDetail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const user_id = userId();
  const userDetails = getUser();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    try {
      setClicked(true);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Stripe Error:", error);
        setPaymentError(error.message);
        setLoading(false);
        setClicked(false);
      } else {
        const data = {
          product_id: voucherDetail?.city_voucher_id,
          amount: voucherDetail?.voucher_offer_price,
          business_id: voucherDetail?.business_id,
          user_id: user_id,
          user_email: userDetails.eu_email,
          city_id: voucherDetail?.mms_city_id,
          dataDescriptor: "COMMON.ACCEPT.INAPP.PAYMENT",
          dataValue: paymentMethod.id,
          zipcode: "560100",
          is_mobile: 0,
        };

        if (paymentMethod.id) {
          StripepaymentApiHandler(data);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      setPaymentError(error);
      setLoading(false);
      setClicked(false);
    }
  };

  const StripepaymentApiHandler = async (data) => {
    const Stripepaymentres = await StripepaymentApi(data, () => {
      navigate("/");
    });
    setLoading(false);
    if (Stripepaymentres === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Stripepaymentres.success === true) {
        setLoading(false);
        navigate("/explore/checkout/transaction-successful");
      } else if (Stripepaymentres.status === 429) {
        setLoading(true);
        setModalShow(false);
        ErrorToast(Stripepaymentres.message);
      } else {
        setLoading(false);
        navigate("/explore/checkout/transaction-failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="card_Element" id="card-element" />
      <p className="autofill">
        To save your card for future transactions, click on the link "Autofill"
        button above and create your account.(optional)
      </p>
      <div className="stripe_Popup_Button">
        <button type="submit" disabled={!stripe || !elements}>
          {clicked === true ? (
            <RotatingLines strokeColor="white" width={20} visible={true} />
          ) : (
            <div>Pay ${voucherDetail?.subtotal}</div>
          )}
        </button>
      </div>
      {paymentError && <div className="payment_Error">{paymentError}</div>}
    </form>
  );
};

export default CheckoutForm;
