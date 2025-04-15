import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const ResetUserMobile = async (mobile, cb) => {
  try {
    const mobileVerification = await executePost(
      "/vms/changeMobileNumber",
      mobile
    );
    const mobileVerificationData = mobileVerification.data
      ? mobileVerification.data
      : {};
    return mobileVerificationData;
  } catch (err) {
    if (err.response?.data.message === "Token is invalid!") {
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
