import { toast } from "react-toastify";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const Categories = async (data, cb) => {
  try {
    const Categories = await executePost("/vms/landing/category_list", data);
    const CategoriesData = Categories.data ? Categories.data : [];
    return CategoriesData;
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
