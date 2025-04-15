import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
export const CheckoutOverviewApi = async (data, cb) => {
  try {
    const CheckoutOverview = await executePost("/vms/payment_check_out", data);
    const CheckoutOverviewData = CheckoutOverview.data
      ? CheckoutOverview.data
      : {};
    return CheckoutOverviewData;
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
