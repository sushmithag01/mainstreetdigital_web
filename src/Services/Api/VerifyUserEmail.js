import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const VerifyUserEmail = async (email, cb) => {
  try {
    const emailVerification = await executePost(
      "/vms/validateChangeEmailOtp",
      email
    );
    const emailVerificationData = emailVerification.data
      ? emailVerification.data
      : {};
    return emailVerificationData;
  } catch (err) {
    if (err.response.data.message === "Token is invalid!") {
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
