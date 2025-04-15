import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import BackArrow from "../../Components/BackButton/BackArrow";
import AllMessages from "./AllMessages";
import Chat from "./Chat";
import Navigation from "../../Components/Navigation/Navigation";

const Messages = ({ props }) => {
  const routeParams = useParams();
  const location = useLocation();
  const [toggleChat, setToggleChat] = useState(false);

  const flagFetchHandler = (flag) => {
    setToggleChat(flag);
  };
  return (
    <>
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
          <p className="page-maintitle" style={{ paddingTop: "10px" }}>
            Messages
          </p>
          <Row>
            <Col md="6">
              <AllMessages
                FlagFetchHandler={flagFetchHandler}
                PageName={location.state.pageName}
                selectedChannel={routeParams}
              />
            </Col>
            <Col md="6">
              <Chat ToggleChat={toggleChat} selectedChannel={routeParams} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Messages;
