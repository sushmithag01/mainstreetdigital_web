import { toast } from "react-toastify";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { executePost } from "../ServiceMethods";

export const CouponsApi = async (data, cb) => {
  try {
    const couponsData = await executePost("/vms/myCoupons", data);
    const CouponsData = couponsData.data ? couponsData.data : [];
    return CouponsData;
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
