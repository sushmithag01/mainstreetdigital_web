import axios from "axios";
import { getToken } from "../Utils/Auth/LocalStorage";

const Auth_Token = getToken();

const headers = {
  "Content-Type": "application/json",
  Authorization: "key=" + process.env.REACT_APP_SERVER_ID,
};

// const GetWindowUrlTest =
//   "https://dev.shoplocal.digtial/?token=92q5EArzxzo9rhQx9Z41c%2F4hszr2H%2BlBOV%2BEFyzVTXAkzikxn9gtQjbNp2MsaRrX9Nvmdu7QvUKidvi9FVeHzVq3zmxy2IarNkAgH698Dg0VbdovPHFLRbCJV%2F0FBpDaf3AnfM5Qpd52trW%2BKJcrabjtceH59B0EXwfB0s2MnEHF3PbJ5XBsQmeUVH0Pq54xJ3Wrqz6jesX0xHEHIBazvDg4xbBXrlfPVN3yREqL8obOzc48ujdArvJ7m7Nh%2FhNR";

let url = "";

if (typeof window !== "undefined") {
  const GetWindowUrl = window.location.href;
  const LocationSplit = GetWindowUrl.split("=");
  url = LocationSplit[1];
} else {
  console.log(
    "window is not defined. You might be running in a server environment."
  );
}

const headersUrl = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "x-ms-marketplace-token": url === undefined ? "no-token" : url,
};

export const executePost = async (endPoint, data) => {
  const Auth_Token = getToken();

  return await axios.post(process.env.REACT_APP_BACKEND_URL + endPoint, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Token: Auth_Token,
    },
  });
};

export const executeGET = async (endPoint) => {
  return await axios.get(process.env.REACT_APP_BACKEND_URL + endPoint, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Token: Auth_Token,
    },
  });
};

export const executeNotification = async (endPoint, data) => {
  return await axios.post("https://fcm.googleapis.com" + endPoint, data, {
    headers: headers,
  });
};

export const executePostOffer = async (data, fullUrl) => {
  const headerData = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-ms-marketplace-token": fullUrl,
  };
  return await axios.post(
    process.env.REACT_APP_BACKEND_URL + "/vms/transactable/user-activation",
    data,
    {
      headers: fullUrl !== "" ? headerData : headersUrl,
    }
  );
};
