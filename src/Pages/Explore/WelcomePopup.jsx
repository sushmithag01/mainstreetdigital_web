import React from "react";
import Modal from "react-bootstrap/Modal";
import welcomeImg from "../../assets/welcome-home.jpg";
import closebtn from "../../assets/close-btn.png";
import { Button } from "react-bootstrap";

function WelcomePopup({ onHide, setShowWelcomePopup, ...props }) {
  const handleStart = () => {
    setShowWelcomePopup(false);
    if (onHide) onHide();
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="delete_Modal">
          <Modal.Body>
            <img
              loading="lazy"
              alt="close-btn"
              className="closeButton"
              src={closebtn}
              onClick={onHide}
            />
            <div className="modal-image">
              <img
                loading="lazy"
                alt="delete"
                className="welcomeImg modal_Head_Image"
                src={welcomeImg}
              />
            </div>
            <p>Welcome to Shop Local Digital!</p>
            <p className="mt-2 welcome-text px-5">
              You can set the marketplace you came from as your favorite or
              explore deals from other marketplaces to discover exciting offers.
            </p>
            <div className="modal-buttons">
              <Button onClick={handleStart} className="get-start-btn">
                Get Started
              </Button>
            </div>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WelcomePopup;
