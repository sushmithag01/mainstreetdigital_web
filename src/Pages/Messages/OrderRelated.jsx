import {
  collection,
  getCountFromServer,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import Msgpic from "../../assets/default-upload.svg";
import { db } from "../../Firebase";
import { getChatFlagOrderSlice } from "../../Redux/ChatFlagSlice";
import { MessageDetailApi } from "../../Services/Api/MessageDetails";
import { userId } from "../../Utils/Auth/LocalStorage";

const OrderRelated = ({ props, selectedChannel, flagFetchHandler }) => {
  const navigate = useNavigate();
  const user_id = userId();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [messageCount, setmessageCount] = useState();
  const [selectChannelLog, setselectedChannelLog] = useState("");

  const dispatch = useDispatch();

  const Handler = async () => {
    setLoading(true);
    const ChatHistory = await MessageDetailApi(() => {
      navigate("/");
    });

    let chatList = ChatHistory.data;
    // for (let key in chatList) {
    //   getChatCount(chatList[key]['channel_id']);
    // }
    setChatHistory(chatList);
    setLoading(false);
  };
  useEffect(() => {
    Handler();
    setselectedChannelLog(selectedChannel.id);
  }, []);

  const getChatCount = async (com_id) => {
    const getcollection = query(collection(db, com_id), orderBy("createdAt"));
    const snapshot = await getCountFromServer(getcollection);
    const msg_count = snapshot.data().count;
    return msg_count;
    // setmessageCount(snapshot.data().count);
    // const unsubscribe = onSnapshot(getcollection, (snapshot) => {
    //   snapshot.docChanges().forEach((index, change) => {
    //     if (change.type === "added") {
    //       setmessageCount(change.doc.data()._id);
    //     }
    //   })
    // })
  };

  function handleClick(chat_id) {
    navigate(`/messages/${chat_id.channel_id.toString()}`, {
      state: {
        productName: chat_id.product_name,
        businessName: chat_id.business_name,
        product_id: chat_id.product_id,
        bu_id: chat_id.business_id,
        productImage: chat_id.productImage,
      },
    });
    setselectedChannelLog(chat_id.channel_id);
    dispatch(getChatFlagOrderSlice(true));
  }
  const ReduxData = useSelector((state) => state.ChatFlag);

  const dummyData = chatHistory.map((item) => ({
    productImage: process.env.REACT_APP_BACKEND_URL + "/" + item.product_image,
    product_name: item.product_name,
    business_name: item.business_name,
    chat_type: item.chat_type,
    channel_id: item.channel_id,
  }));

  const OrderFlag = ReduxData.ChatFlagOrder;
  return (
    <>
      <div className="chat-top">
        {dummyData && true ? (
          dummyData.map((item, index) => {
            return item.chat_type == 1 ? (
              <div
                className={
                  selectChannelLog === item.channel_id && OrderFlag === true
                    ? "d-flex msg-main1 active_chat"
                    : "d-flex msg-main1"
                }
                onClick={() => {
                  handleClick(item);
                  flagFetchHandler(false);
                }}
              >
                <Image
                  loading="lazy"
                  src={item.productImage ? item.productImage : Msgpic}
                  className="msgpic"
                ></Image>
                <div className="msg-1">
                  <p className="msg1-text1" style={{ color: "black" }}>
                    {item.product_name ? item.product_name : ""}
                  </p>
                  <p className="msg1-text2" style={{ color: "black" }}>
                    {item.business_name ? item.business_name : ""}
                  </p>
                </div>
                {/* <div className="msg-2">
                  <p className="msg2-text1" style={{ color: "black" }}>
                    {Moment(item.created_at).format("DD/MM/YYYY")}
                  </p>

                  <p className='msg2-text2' style={{ color: "black" }}>0</p>
                </div> */}
              </div>
            ) : null;
          })
        ) : (
          <p className="NoDataAvailable" style={{ color: "black" }}>
            No data available!
          </p>
        )}
      </div>
    </>
  );
};

OrderRelated.propTypes = {};

export default OrderRelated;
