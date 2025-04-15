import { executePost } from "../ServiceMethods";
import { removeUserCredentials, userId } from "../../Utils/Auth/LocalStorage";
import { toast } from "react-toastify";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const MessageDetailApi = async (cb) => {
  const id = userId();
  try {
    const activeVouchers = await executePost("/vms/chat/message", {
      eu_id: id,
      api_method: "get",
    });
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
