import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const VouchersApi = async (data, cb) => {
  try {
    const activeVouchers = await executePost("/vms/myVouchers", data);
    const activeVouchersData = activeVouchers.data ? activeVouchers.data : {};
    return activeVouchersData;
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
