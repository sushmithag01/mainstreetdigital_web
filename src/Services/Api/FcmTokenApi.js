import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const FcmTokenApi = async (data, cb) => {
  try {
    const firebasetoken = await executePost("/vms/notifyToken", data);
    const store_firebaseoken = firebasetoken.data ? firebasetoken.data : {};
    return store_firebaseoken;
  } catch (error) {
    if (error.response.data.message === "Token is invalid!") {
      toast.dismiss();
      toast.clearWaitingQueue();
      ErrorToast(SessionTimeout);
      removeUserCredentials();
      if (cb) {
        cb();
      }
    } else {
      return false;
    }
  }
};
