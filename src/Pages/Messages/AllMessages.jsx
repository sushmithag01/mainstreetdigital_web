import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../../assets/css/style.css";
import {
  getChatFlagGeneralSlice,
  getChatFlagOrderSlice,
} from "../../Redux/ChatFlagSlice";
import GeneralRelated from "./GeneralRelated";
import OrderRelated from "./OrderRelated";

const AllMessages = ({
  props,
  PageName,
  selectedChannel,
  FlagFetchHandler,
}) => {
  const [activeTab, setActiveTab] = useState("orderRelated");

  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "orderRelated") {
      dispatch(getChatFlagOrderSlice(false));
      dispatch(getChatFlagGeneralSlice(false));
      setActiveTab("orderRelated");
    } else {
      dispatch(getChatFlagOrderSlice(false));
      dispatch(getChatFlagGeneralSlice(false));
    }
    FlagFetchHandler(true);
  };

  useEffect(() => {
    if (PageName === "explore") {
      setActiveTab("general");
    }
  }, []);

  return (
    <>
      <div className="msg-main mt-3">
        <div className="msg-inner1">
          {/* <InputGroup className="search-bar messages">
            <InputGroup.Text>
              <MdSearch />
            </InputGroup.Text>
            <Form.Control placeholder="Search" />
          </InputGroup> */}
          {/* <div
            defaultActiveKey={
              PageName === "explore" ? "general" : "order-related"
            }
            id="uncontrolled-tab-example"
            className="mb-3 order-related mt-3"
          > */}
          {/* <Tab eventKey="order-related" title="Order Related"> */}
          <div className="div_Chat_Heads">
            <div
              onClick={() => handleTabClick("orderRelated")}
              className={
                activeTab === "orderRelated" ? "active_Tab" : "non-active_Tab"
              }
            >
              Order Related
              {/*  */}
            </div>
            <div
              onClick={() => handleTabClick("general")}
              className={
                activeTab === "general" ||
                (activeTab === "general" && PageName === "explore")
                  ? "active_Tab"
                  : "non-active_Tab"
              }
            >
              General
              {/* <OrderRelated selectedChannel={selectedChannel} /> */}
            </div>
          </div>
          <div
            className={
              activeTab === "orderRelated" ? "display_Block" : "display_None"
            }
          >
            <OrderRelated
              selectedChannel={selectedChannel}
              flagFetchHandler={FlagFetchHandler}
            />
          </div>
          <div
            className={
              activeTab === "general" ? "display_Block" : "display_None"
            }
          >
            <GeneralRelated
              selectedChannel={selectedChannel}
              flagFetchHandler={FlagFetchHandler}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default AllMessages;
