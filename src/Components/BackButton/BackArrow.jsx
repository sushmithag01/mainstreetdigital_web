import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

const BackArrow = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      const pathSegments = window.location.pathname.split("/");
      const fallbackPath = pathSegments[3] ? `/${pathSegments[3]}` : "/";
      navigate(fallbackPath);
    }
  };

  return (
    <p className="back-btn-bold" onClick={goBack}>
      <MdKeyboardArrowLeft className="arrow-left" />
      Back
    </p>
  );
};

export default BackArrow;
