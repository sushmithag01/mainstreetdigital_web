import React, { useEffect } from "react";
import { useState } from "react";
// import { FormContainer, FormComponent } from "react-authorize-net";
// import { Button } from "react-bootstrap";
import { HostedForm } from "react-acceptjs";
import { toast } from "react-toastify";
// import { loadAcceptJs } from "react-acceptjs";

const authData = {
  apiLoginID: process.env.REACT_APP_API_LOGIN_ID,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
};

// const isSandbox = false;

const DemoAuthorize = () => {
  const handleSubmit = async (response) => {
    console.log(response);
  };

  return (
    <HostedForm
      buttonClassName="checkout-place-order"
      buttonText="Place Order"
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

export default DemoAuthorize;
