import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const Forgotpassword = async (ForgotPsswordCredentials, cb) => {
  try {
    const forgotPassword = await executePost(
      "/vms/forgotPasswordnew",
      ForgotPsswordCredentials
    );
    const forgotpasswordData = forgotPassword.data ? forgotPassword.data : {};
    return forgotpasswordData;
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
