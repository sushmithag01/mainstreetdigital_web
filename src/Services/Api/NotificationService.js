import { executeNotification } from "../ServiceMethods";
import {
  getFirebaseToken,
  removeUserCredentials,
} from "../../Utils/Auth/LocalStorage";
import { toast } from "react-toastify";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const NotificatonServiceApi = async (firebasedata, cb) => {
  const token = getFirebaseToken();
  try {
    const Firebasedata = await executeNotification("/fcm/send", {
      body: {},
      notification: {
        body: firebasedata.body,
        title: firebasedata.title,
      },
      to: token,
    });
    const Firebase_data = Firebasedata.data ? Firebasedata.data : {};
    return Firebase_data;
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
