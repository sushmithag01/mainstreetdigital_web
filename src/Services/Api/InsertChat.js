import { executePost } from "../ServiceMethods";
import { removeUserCredentials, userId } from "../../Utils/Auth/LocalStorage";
import { toast } from "react-toastify";
import { SessionTimeout } from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";

export const InsertChatApi = async (MessageData, cb) => {
  const id = userId();
  const data = {
    user_id: userId(),
    // location: "kirkland",
  };

  try {
    const insertMessage = await executePost("/vms/chat/message", {
      api_method: "post",
      eu_id: parseInt(id),
      bu_id: MessageData.bu_id,
      channel_id: MessageData.channel_id,
      product_id: MessageData.product_id,
      product_type: MessageData.product_type,
      help_reason: MessageData.help_reason,
    });
    const insertMessageData = insertMessage.data ? insertMessage.data : {};
    return insertMessageData;
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
