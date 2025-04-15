import { executePost } from "../ServiceMethods";
import { removeUserCredentials, userId } from "../../Utils/Auth/LocalStorage";
import { toast } from "react-toastify";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const UserProfile = async (cb) => {
  const Uid = userId();
  const UserId = { user_id: Uid };

  try {
    const userprofile = await executePost("/vms/endUserProfile", UserId);
    const UserProfileData = userprofile.data ? userprofile.data : {};
    return UserProfileData;
  } catch (err) {
    if (err.response.data.message === "Token is invalid!") {
      toast.dismiss();
      toast.clearWaitingQueue();
      ErrorToast(SessionTimeout);
      removeUserCredentials();
      if (cb) {
        cb();
      }
      // window.location.href = "/";
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 500);
      // }
    } else {
      return false;
    }
  }
};
