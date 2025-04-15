import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, GetSocialLoginToken } from "./LocalStorage";

const RequireAuth = ({ children }) => {
  const Token = getToken();
  const SlToken = GetSocialLoginToken();
  const location = useLocation();

  if (!Token && !SlToken) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
