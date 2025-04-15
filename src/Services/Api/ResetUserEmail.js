import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const ResetUserEmail = async (email, cb) => {
  try {
    const EmailVerification = await executePost(
      "/vms/changeEmailAddress",
      email
    );
    const EmailVerificationData = EmailVerification.data
      ? EmailVerification.data
      : {};
    return EmailVerificationData;
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
