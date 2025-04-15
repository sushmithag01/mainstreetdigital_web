import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

export const RelatedDealsApi = async (data, cb) => {
  try {
    const relateddeals = await executePost(
      "/vms/voucherCouponRelatedDeals",
      data
    );
    const relateddealsData = relateddeals.data ? relateddeals.data : {};
    return relateddealsData;
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
