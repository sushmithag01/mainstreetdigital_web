import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

export const VerifyUserMobile = async (mobile, cb) => {
  try {
    const mobileVerification = await executePost(
      "/vms/validateChangeMobileOtp",
      mobile
    );
    const mobileVerificationData = mobileVerification.data
      ? mobileVerification.data
      : {};
    return mobileVerificationData;
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
