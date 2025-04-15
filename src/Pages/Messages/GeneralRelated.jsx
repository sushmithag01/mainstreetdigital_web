import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Msgpic from "../../assets/default-upload.svg";
import { getChatFlagGeneralSlice } from "../../Redux/ChatFlagSlice";
import { MessageDetailApi } from "../../Services/Api/MessageDetails";

const GeneralRelated = ({ props, selectedChannel, flagFetchHandler }) => {
  const navigate = useNavigate();
  const parameter = useParams();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectChannelLog, setselectedChannelLog] = useState("");

  const Handler = async () => {
    setLoading(true);
    const ChatHistory = await MessageDetailApi(() => {
      navigate("/");
    });
    setLoading(false);
    setChatHistory(ChatHistory.data);
  };
  const dispatch = useDispatch();

  const ReduxData = useSelector((state) => state.ChatFlag);

  const GeneralFlag = ReduxData.ChatFlagGeneral;

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
    dispatch(getChatFlagGeneralSlice(true));
  }

  const dummyData = chatHistory.map((item) => ({
    productImage: process.env.REACT_APP_BACKEND_URL + "/" + item.product_image,
    product_name: item.product_name,
    business_name: item.business_name,
    chat_type: item.chat_type,
    channel_id: item.channel_id,
  }));

  useEffect(() => {
    Handler();
    setselectedChannelLog(selectedChannel.id);
  }, []);

  return (
    <>
      <div>
        {dummyData && true ? (
          dummyData.map((item) => {
            return item.chat_type == 2 ? (
              <div
                className={
                  selectChannelLog === item.channel_id && GeneralFlag === true
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
                    {item.product_name}
                  </p>
                  <p className="msg1-text2" style={{ color: "black" }}>
                    {item.business_name}
                  </p>
                </div>
                {/* <div className='msg-2'>
                                        <p className='msg2-text1' style={{ color: "black" }}>{Moment(item.created_at).format('HH:MM:SS')}</p>
                                        <p className='msg2-text2'>2</p>
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

GeneralRelated.propTypes = {};

export default GeneralRelated;
