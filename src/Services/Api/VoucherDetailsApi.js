import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const VoucherDetailsApi = async (voucherId, cb) => {
  try {
    const voucherdetail = await executePost("/vms/voucherdetail", voucherId);
    const voucherdetailData = voucherdetail.data ? voucherdetail.data : {};
    return voucherdetailData;
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
