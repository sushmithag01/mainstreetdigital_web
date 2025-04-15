import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackArrow from "../../Components/BackButton/BackArrow";
import Loader from "../../Components/Loader/Loader";
import { NotificationsAPI } from "./../../Services/Api/NotificationsAPI";
import { userId } from "../../Utils/Auth/LocalStorage";
import Navigation from "../../Components/Navigation/Navigation";

const Notifications = () => {
  //read More
  const [readMore, setreadMore] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [indexValue, setIndexValue] = useState("");
  const [loading, setLoading] = useState(false);

  const userid = userId();

  const navigate = useNavigate();

  const NotificationsApiHandler = async () => {
    setLoading(true);
    const data = {
      user_id: parseInt(userid),
      user_type: "end_user",
    };
    const NotificationList = await NotificationsAPI(data, () => {
      navigate("/");
    });
    setLoading(false);
    if (NotificationList.status === 200) {
      setNotificationData(NotificationList.data);
    } else if (NotificationList.status === 429) {
      setLoading(true);
      toast.error(NotificationList.message, {
        position: "top-center",
        width: "500px",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const ReadmoreHandler = (i) => {
    setreadMore(!readMore);
    setIndexValue(i);
  };

  const d = new Date();
  let CurrentDate =
    d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  useEffect(() => {
    NotificationsApiHandler();
  }, []);

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard">
            <BackArrow />
            {/* <Link to="/explore">
              <MdKeyboardArrowLeft className="arrow-left" />
              Back
            </Link> */}
          </p>
          <p className="page-maintitle" style={{ color: "black" }}>
            Notifications
          </p>
          {/* <p className="redeemed-date">{CurrentDate}</p> */}
          {notificationData?.length !== 0 ? (
            notificationData.map((data, index) => {
              let Description1 = data.content.substring(0, 200);

              let Description2 = data.content.substring(
                200,
                data.content?.length
              );

              const extraContentRead = (
                <div>
                  <p className="extra-content" style={{ color: "black" }}>
                    {Description2}
                  </p>
                </div>
              );

              const linkNameRead =
                indexValue === index && readMore ? "Read Less" : "Read More";

              return (
                <div className="border-card">
                  <p className="border-card-text" style={{ color: "black" }}>
                    {data.heading}
                  </p>
                  <p style={{ color: "black" }}>
                    {Description1}

                    {indexValue === index ? readMore && extraContentRead : ""}

                    <span
                      className="read-more-link mb-2"
                      style={{
                        cursor: "pointer !important",
                        color: "black",
                      }}
                      onClick={() => {
                        ReadmoreHandler(index);
                      }}
                    >
                      {data.content?.length > 200 ? [linkNameRead] : ""}
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <div
              style={{
                padding: "1rem 1rem 1rem 0.5rem",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              No notifications are available.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
