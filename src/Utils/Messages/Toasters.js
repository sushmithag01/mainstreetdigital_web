import { toast } from "react-toastify";

export function ErrorToast(msg) {
  toast.error(msg, {
    position: "top-center",
    width: "500px",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

export function SuccessToast(msg) {
  toast.success(msg, {
    position: "top-center",
    width: "500px",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}
