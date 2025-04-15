import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, GetSocialLoginToken } from "./LocalStorage";

const RedirectLoginUserAuth = ({ children }) => {
  const Token = getToken();
  const SlToken = GetSocialLoginToken();
  const location = useLocation();

  if (Token || SlToken) {
    const from = location.pathname;
    return <Navigate to="/explore" state={{ from }} />;
  }

  return children;
};

export default RedirectLoginUserAuth;
