import React, { useEffect, useState } from "react";
// import { FormContainer, FormComponent } from "react-authorize-net";
// import { Button } from "react-bootstrap";
import { HostedForm } from "react-acceptjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PurchaseVoucherApi } from "./../../Services/Api/PurchaseVoucherApi";
// import { loadAcceptJs } from "react-acceptjs";

const authData = {
  apiLoginID: process.env.REACT_APP_API_LOGIN_ID,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
};

// const isSandbox = false;

const AuthorizePayment = ({
  checkflag,
  userId,
  buId,
  cityId,
  email,
  amount,
  productId,
  SetLoading,
}) => {
  const [Authresponse, setAuthResponse] = useState({});

  const navigate = useNavigate();

  // Redux data
  // const data = useSelector(
  //   (state) => state.CouponAndVoucherDetail.CheckoutPageOverviews
  // );

  // const Amount = data.CheckoutData.subtotal;

  const TransactionApiHandler = async () => {
    const data = {
      amount: amount,
      business_id: buId,
      user_id: parseInt(userId),
      user_email: email,
      product_id: productId,
      city_id: cityId,
      dataDescriptor: Authresponse.opaqueData.dataDescriptor,
      dataValue: Authresponse.opaqueData.dataValue,
      zipcode: Authresponse.encryptedCardData.expDate,
    };
    const TransactionRes = await PurchaseVoucherApi(data, () => {
      navigate("/");
    });
    if (TransactionRes === false) {
      toast.error("Internal Server Error!", {
        position: "top-center",
        width: "500px",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      SetLoading(false);
    } else {
      if (TransactionRes.success === true) {
        navigate("/explore/checkout/transaction-successful");
        setTimeout(() => {
          SetLoading(false);
        }, 1000);
      } else if (TransactionRes.status === 429) {
        SetLoading(true);
        toast.error(TransactionRes.message, {
          position: "top-center",
          width: "500px",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        navigate("/explore/explore/checkout/transaction-failed");
        setTimeout(() => {
          SetLoading(false);
        }, 1000);
      }
    }
  };

  const handleSubmit = async (response) => {
    try {
      const Authres = await response;
      if (Authres) {
        SetLoading(true);
        setAuthResponse(Authres);
      } else {
        toast.error("Something went wrong! please try again", {
          position: "top-center",
          width: "500px",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Something went wrong! please try again", {
        position: "top-center",
        width: "500px",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  useEffect(() => {
    if (Authresponse) {
      TransactionApiHandler();
    }
  }, [Authresponse]);

  return (
    <HostedForm
      buttonClassName={
        checkflag === false
          ? "checkout-place-order-disable"
          : "checkout-place-order"
      }
      // formHeaderText="Payment Details"
      // formButtonText={`Pay $${amoutStore}`}
      buttonText="Place Order"
      disabled={checkflag === false ? true : false}
      authData={authData}
      environment={"SANDBOX"}
      onSubmit={handleSubmit}
      billingAddressOptions={{ show: true, required: true }}
      paymentOptions={{ showCreditCard: true }}
    />

    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <FormContainer
    //     apiLoginId={process.env.REACT_APP_API_LOGIN_ID}
    //     clientKey={process.env.REACT_APP_CLIENT_KEY}

    //     amount={100}
    //     buttonText="Pay Now"
    //     environment="sandbox"
    //     transactionName="Test Transaction"
    //     onSuccess={(response) => console.log(response)}
    //     onError={(response) => console.error(response)}
    //     component={FormComponent}
    //   />
    // </div>
  );
};

export default AuthorizePayment;
