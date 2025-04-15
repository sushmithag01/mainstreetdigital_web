import React from "react";
import { Link } from "react-router-dom";

const PrivacyTermsConditions = () => {
  return (
    <div className="end-footer">
      <div className="P-T-C">
        <h6>
          Copyright © {new Date().getFullYear()} Meylah Corporation. All rights
          reserved.
        </h6>
        <div className="sub-P-T-C">
          <a href="https://meylah.com/privacy-policy/" target="_blank">
            <p className="PrivacyPolicy">Privacy Policy</p>
          </a>
          |
          <Link to="https://meylah.com/termsofuse/" target="_blank">
            <p className="TermsAndConditionsfooter">Terms & Conditions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTermsConditions;
