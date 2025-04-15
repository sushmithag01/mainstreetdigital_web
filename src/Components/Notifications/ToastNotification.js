import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ title, body }) => {
  const Display = () => {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  };

  toast(<Display />);

  return (
    <ToastContainer
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
    />
  );
};

export default ToastNotification;
