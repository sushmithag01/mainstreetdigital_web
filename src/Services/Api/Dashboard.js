import { toast } from "react-toastify";
import { executePost } from "../ServiceMethods";
import { removeUserCredentials } from "../../Utils/Auth/LocalStorage";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const dashboardApi = async (data, cb) => {
  try {
    const dashboardData = await executePost("/vms/endUserDashboard", data);
    const DashboardData = dashboardData.data ? dashboardData.data : {};
    return DashboardData;
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
