import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirebaseToken, onForegroundMessage } from "../../Firebase";
import { setFirebaseToken, userId } from "../../Utils/Auth/LocalStorage";
import { FcmTokenApi } from "./../../Services/Api/FcmTokenApi";
import ToastNotification from "./ToastNotification";

const Notifications = () => {
  const [showNotificationBanner, setShowNotificationBanner] = useState(
    Notification.permission === "default"
  );
  // const [showNotificationBanner, setShowNotificationBanner] = useState(true);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const user_id = userId();

  const navigate = useNavigate();

  onForegroundMessage()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        storeFcmToken(firebaseToken);
        setFirebaseToken(firebaseToken);
        if (firebaseToken) {
          setShowNotificationBanner(false);
        }
      })
      .catch((err) =>
        console.error("An error occured while retrieving firebase token. ", err)
      );
  };

  async function storeFcmToken(firebaseToken) {
    const data = {
      user_type: "end_user",
      user_id: user_id,
      notify_token: firebaseToken,
    };
    const store_firebaseoken = await FcmTokenApi(data, () => {
      navigate("/");
    });
    if (store_firebaseoken.status === 429) {
    }
  }

  useEffect(() => {
    handleGetFirebaseToken();
  }, []);

  return (
    <div className="app">
      {/* {showNotificationBanner && (
        <div className="notification-banner">
          <span>The app needs permission to</span>
          <button
            className="notification-banner-link"
            onClick={handleGetFirebaseToken}
          >
            enable push notifications.
          </button>
        </div>
      )} */}
      {show ? (
        <ToastNotification
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Notifications;
