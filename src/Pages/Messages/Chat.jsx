import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaLocationArrow } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../Components/Loader/Loader";
import { db } from "../../Firebase";
import { InsertChatApi } from "../../Services/Api/InsertChat";
import { GetSlUserName, getUser } from "../../Utils/Auth/LocalStorage";

const Chat = ({ ToggleChat, selectedChannel, ...props }) => {
  const data_product_type = 1;
  const navigate = useNavigate();
  const get_uuid = uuidv4();
  const parameter = useParams();
  const location = useLocation();
  const userdata = getUser();
  const SlUserName = GetSlUserName();
  const com_id = parameter.id;
  const flag = parameter.flag;
  const BunsinessName = location.state.businessName;
  const ProductName = location.state.productName;
  const productImage = location.state.productImage;
  const bu_id = location.state.bu_id;
  const product_id = location.state.product_id;
  const [chatMessage, setChatMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("userName");
  const userName = userdata ? userdata.first_name : SlUserName;
  const [loading, setLoading] = useState(false);

  const [notification, SetNotification] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, com_id), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });

    return unsub;
  }, [com_id]);

  useEffect(() => {
    if (com_id) {
      updateChatField();
      CallFirebaseChat();
    }
  }, [com_id]);

  const CallFirebaseChat = async () => {
    setLoading(true)
    const getcollection = query(collection(db, com_id), orderBy("createdAt"));
    const collectionSnapshot = await getDocs(getcollection);
    const getchatList = setAllMessages(
      collectionSnapshot.docs.map((doc) => ({
        id: doc.data()._id,
        messages: doc.data().text,
        createdAt: doc.data().createdAt,
        user_id: doc.data().user._id,
        user_name: doc.data().user.name,
      }))
    );
    setLoading(false);
    return getchatList;
   
  };

  const updateChatField = () => {
    let docID = "";
    allMessages.forEach((doc) => {
      if (doc.read == false && doc.userId !== userdata.uid) {
        docID = doc.id;
        chatUpdate(docID);
      }
    });
  };
  async function chatUpdate(docID) {
    const user = doc(db, com_id, docID);
    const query = await updateDoc(user, {
      read: true,
    });
  }

  const sendMessage = async () => {
    if (chatMessage === ""|| com_id === "voucher_coupon") {
      setErrorMessage("Please Enter Some Message!");
    } else {
      try {
        if (userId &&  com_id != "voucher_coupon") {
          await addDoc(collection(db, com_id), {
            _id: get_uuid,
            text: chatMessage,
            createdAt: new Date(),
            user: {
              _id: userId,
              name: userName,
            },
          });
          CallFirebaseChat();
          let messageData = {
            bu_id: bu_id,
            channel_id: com_id,
            product_id: product_id,
            help_reason: chatMessage,
            product_type: data_product_type,
          };
          InsertChattoDB(messageData);
        }
      } catch (error) {
        console.log("chat error",error);
      }
      setChatMessage("");
    }
  };

  const InsertChattoDB = async (messageData) => {
    const MessageData = await InsertChatApi(messageData, () => {
      navigate("/");
    });
    setLoading(true);
    if (MessageData.status === 200) {
      
      navigate(`/messages/${com_id.toString()}`, {
        state: { productName: ProductName, businessName: BunsinessName },
      });
      setLoading(false);
    }
    setLoading(false);
  };
  if (
    com_id !== ":order-related=true" &&
    ToggleChat === false &&
    selectedChannel.id !== ""
  ) {
    return (
      <>
        {loading === true ? <Loader /> : ""}
        {errorMessage ? (
          <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
        ) : null}
        <div className="chat-main mt-3">
          <div className="chat-header">
            <div className="d-flex align-items-center msg-main1 msg-main2">
              <Image
                loading="lazy"
                src={productImage}
                className="msgpic"
              ></Image>
              <div className="msg-1">
                <p className="msg1-text1">{ProductName}</p>
                <p className="msg1-text2">{BunsinessName}</p>
              </div>
            </div>
          </div>
          <div className="container bootstrap snippets bootdeys">
            <div className="col-md-12">
              <div className="panel" id="chat">
                <div className="panel-body">
                  <div className="chats">
                    {allMessages &&
                      allMessages.map((allMessages) => {
                        let Time = new Date(
                          allMessages.createdAt.toDate("dd/mm/yyyy")
                        ).toLocaleString();
                        return (
                          <div>
                            {allMessages.user_id !== userId ||
                            (allMessages.user_name !== username &&
                              allMessages.text !== "") ? (
                              <div className="chat chat-left">
                                <div className="chat-body">
                                  <div className="chat-content">
                                    <p style={{ color: "black" }}>
                                      {allMessages.messages}
                                    </p>
                                    <time
                                      className="chat-time"
                                      datetime="2015-07-01T11:39"
                                    >
                                      {Moment(Time).format("DD-MMM-YY hh:mm A")}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {allMessages.user_id === userId &&
                            allMessages.user_name === username &&
                            allMessages.text !== "" ? (
                              <div className="chat">
                                <div className="chat-body">
                                  <div className="chat-content">
                                    <p style={{ color: "black" }}>
                                      {allMessages.messages}
                                    </p>
                                    <time
                                      className="chat-time"
                                      datetime="2015-07-01T11:40"
                                    >
                                      {Moment(Time).format("DD-MMM-YY hh:mm A")}
                                    </time>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="panel-footer">
                  {/* <form onSubmit="return false;"> */}
                  <div className="input-group">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="input"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Type a message..."
                        autoComplete="off"
                      />
                      <button
                        className="btn btn-primary chat-send"
                        type="submit"
                        onClick={() => sendMessage()}
                      >
                        <FaLocationArrow className="locationArrow" />
                      </button>
                    </Form.Group>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

Chat.propTypes = {};

export default Chat;
