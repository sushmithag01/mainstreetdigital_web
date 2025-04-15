import React, { useState } from "react";
import { Link } from "react-router-dom";
import deleteicon from "../../assets/delete.png";
import plus from "../../assets/plus sign.png";
import visa from "../../assets/visa.png";

const PaymentType = () => {
  const [cardToggle, setCardToggle] = useState("");
  const [payPal, setPayPal] = useState("");
  const [stripePay, setStripePay] = useState("");

  const Card = (e) => {
    let value = e.target.value;
    setCardToggle(value);
    setPayPal("");
    setStripePay("");
  };
  const Paymentpal = (e) => {
    let value = e.target.value;
    setPayPal(value);
    setCardToggle("");
    setStripePay("");
  };

  const PaymentStripe = (e) => {
    let value = e.target.value;
    setStripePay(value);
    setCardToggle("");
    setPayPal("");
  };

  return (
    <>
      <div className="payment-type-one">
        <h3>Payment method</h3>
        <input
          type="radio"
          onChange={Card}
          checked={cardToggle === "on" ? true : false}
        />
        <span className="credit-head">Credit/Debit Card</span>
        {cardToggle === "on" ? (
          <>
            <div className="credit-card-list">
              <div className="credit-cards">
                <input type="radio" />
                <img loading="lazy" src={visa} />
                <p>1234 5678 9123 4567</p>
                <img loading="lazy" className="deleteicon" src={deleteicon} />
              </div>
              <Link className="new-card" to="/addnewcard">
                <img loading="lazy" src={plus} />
                <p>Add new card</p>
              </Link>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="payment-type-two">
        <input
          type="radio"
          onChange={PaymentStripe}
          checked={stripePay === "on" ? true : false}
        />
        <span className="credit-head">Stripe</span>
      </div>
      <div className="payment-type-two">
        <input
          type="radio"
          onChange={Paymentpal}
          checked={payPal === "on" ? true : false}
        />
        <span className="credit-head">PayPal</span>
        {/* {payPal === "on" ? (
          <>
            <div className="credit-card-list">
              <div className="credit-cards">
                <input type="radio" v />
                 <img loading="lazy" src={visa} />
                <p>1234 5678 9123 4567</p>
                 <img loading="lazy" className="deleteicon" src={deleteicon} />
              </div>
              <div className="new-card">
                 <img loading="lazy" src={plus} />
                <p>Add new card</p>
              </div>
            </div>
          </>
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default PaymentType;
