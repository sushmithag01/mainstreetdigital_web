import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

export const SocialLoginApi = async (LoginCredentials, cb) => {
  try {
    const socialLoginApi = await executePost(
      "/vms/userSocioLogin",
      LoginCredentials
    );
    const SocialLoginApiData = socialLoginApi.data ? socialLoginApi.data : {};
    return SocialLoginApiData;
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
