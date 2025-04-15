import { toast } from "react-toastify";
import { removeUserCredentials } from "../../../Utils/Auth/LocalStorage";
import { executePostOffer } from "../../ServiceMethods";
import { SessionTimeout } from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../../Utils/Messages/Toasters";

export const TransactableOfferAPI = async (data, cb) => {
  //  https://devapi.shoplocal.digital/vms/transactable/user-activation
  try {
    const TransactableOffer = await executePostOffer(data, "");
    const TransactableOfferData = TransactableOffer.data
      ? TransactableOffer.data
      : [];
    return TransactableOfferData;
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
