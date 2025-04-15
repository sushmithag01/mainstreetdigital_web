import { toast } from "react-toastify";
import { removeUserCredentials } from "../../../Utils/Auth/LocalStorage";
import { executePost } from "../../ServiceMethods";
import { SessionTimeout } from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../../Utils/Messages/Toasters";

export const FeaturedVoucherListAPI = async (data, cb) => {
  try {
    const VoucherList = await executePost("/vms/featured-vouchers", data);
    const VoucherListData = VoucherList.data ? VoucherList.data : [];
    return VoucherListData;
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
