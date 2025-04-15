import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = () => {
  return (
    <ToastContainer
      style={{ zIndex: "1000000000", width: "auto" }}
      autoClose={2000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      limit={1}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={true}
    />
  );
};

export default Toaster;
