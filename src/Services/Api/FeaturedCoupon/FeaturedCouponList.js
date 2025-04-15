import { toast } from "react-toastify";
import { removeUserCredentials } from "../../../Utils/Auth/LocalStorage";
import { executePost } from "../../ServiceMethods";
import { SessionTimeout } from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../../Utils/Messages/Toasters";

export const FeaturedCouponListAPI = async (data, cb) => {
  try {
    const CouponList = await executePost("/vms/featured-coupons", data);
    const CouponListData = CouponList.data ? CouponList.data : [];
    return CouponListData;
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
