import { toast } from "react-toastify";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";

const dummyresponse = {
  first_name: "Sid",
  last_name: "Sid",
  message: "Your Profile Updated",
  status: 200,
  success: true,
};

export const UpdateName = async (data, cb) => {
  try {
    const updatename = await executePost("/vms/updateProfile", data);
    const updateName = updatename.data ? updatename.data : dummyresponse;
    return updateName;
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
