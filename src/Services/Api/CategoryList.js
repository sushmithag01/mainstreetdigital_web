import { toast } from "react-toastify";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { executePost } from "../ServiceMethods";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const CategoryList = async (data, cb) => {
  try {
    const categorylist = await executePost("/vms/categorieslist", data);
    const CategoryListData = categorylist.data ? categorylist.data : [];
    return CategoryListData;
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
