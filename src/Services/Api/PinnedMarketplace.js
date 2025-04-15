import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

export const PinnedMarketplaceAPI = async (data, cb) => {
  try {
    const PinnedMarketplace = await executePost(
      "/vms/set-default-marketplace",
      data
    );
    const PinnedMarketplaceData = PinnedMarketplace.data
      ? PinnedMarketplace.data
      : [];
    return PinnedMarketplaceData;
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
