import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const CouponDetailsApi = async (couponId, cb) => {
  try {
    const coupondetail = await executePost("/vms/viewCouponDetails", couponId);
    const coupondetailData = coupondetail.data ? coupondetail.data : {};
    return coupondetailData;
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
