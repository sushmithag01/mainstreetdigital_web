import React from "react";
import Navigation from "../../Components/Navigation/Navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import failed from "../../assets/failed1.png";
import BackArrow from "../../Components/BackButton/BackArrow";

const TransactionFailed = () => {
  return (
    <div className="transaction-failed">
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
            <img src={failed} alt="Plant" />
            <h2>Oops, something went wrong!</h2>
            <p>
              We're sorry, but it seems that your transaction couldn't be
              completed at the moment.
            </p>
            <div className="transaction-buttons">
              <a href="/explore/checkout">
                <button className="purchase-more-button">Retry</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFailed;
