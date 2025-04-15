import { toast } from "react-toastify";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const DownloadCouponApi = async (data) => {
  try {
    const downloadcoupon = await executePost("/vms/downloadCoupon", data);
    const downloadcouponData = downloadcoupon.data ? downloadcoupon.data : {};
    return downloadcouponData;
  } catch (error) {
    if (error.response.data.message === "Token is invalid!") {
      toast.dismiss();
      toast.clearWaitingQueue();
      ErrorToast(SessionTimeout);
      removeUserCredentials();
      // if (cb) {
      //   cb();
      // }
    } else {
      return false;
    }
  }
};
