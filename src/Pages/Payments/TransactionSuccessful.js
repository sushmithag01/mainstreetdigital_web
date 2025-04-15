import React from "react";
import Navigation from "../../Components/Navigation/Navigation";
import Plant from "../../assets/Plant1.png";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import BackArrow from "../../Components/BackButton/BackArrow";

const TransactionSuccessful = () => {
  return (
    <div>
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard">
            <BackArrow />
            {/* <Link to="/explore">
              <MdKeyboardArrowLeft className="arrow-left" />
              Back
            </Link> */}
          </p>
          <div className="successfulPage">
            <img src={Plant} alt="Plant" />
            <h2>Congratulations on your purchase!</h2>
            <p>
              Thank you for choosing Shop Local Digital. Your purchase details
              has been sent to your registered email and is available under "My
              Account" for redeeming.
            </p>
            <div className="transaction-buttons">
              <Link to="/my-account/my-vouchers">
                <button className="view-order-button">View Order</button>
              </Link>
              <Link to="/explore">
                <button className="purchase-more-button">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccessful;
