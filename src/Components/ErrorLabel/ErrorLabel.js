import React from "react";
import "./ErrorLabel.css";

const ErrorLabel = ({ ErrorDisplay, color }) => {
  const Color = color === true ? "success" : "star-required";
  return (
    <>
      {ErrorDisplay ? (
        <span className={`${Color} Errlabel-font_size`}>{ErrorDisplay}</span>
      ) : (
        <div className="empty_Space"></div>
      )}
    </>
  );
};

export default ErrorLabel;
