import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

export const MarketplaceActiveCheckAPI = async (data, cb) => {
  try {
    const MarketplaceActiveCheck = await executePost(
      "/vms/checkcityactiveness",
      data
    );
    const MarketplaceActiveCheckData = MarketplaceActiveCheck.data
      ? MarketplaceActiveCheck.data
      : {};
    return MarketplaceActiveCheckData;
  } catch (err) {
    if (err.response.data.message === "Token is invalid!") {
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
