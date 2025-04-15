import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

export const VerifyRedeemVoucherApi = async (data, cb) => {
  try {
    const redeem = await executePost("/vms/verifyVoucherOtp", data);
    const redeemData = redeem.data ? redeem.data : {};
    return redeemData;
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
