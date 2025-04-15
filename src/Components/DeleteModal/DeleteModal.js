import React from "react";
import Modal from "react-bootstrap/Modal";
import deleteImg from "../../assets/DeleteIcon.svg";
import closebtn from "../../assets/close-btn.png";
import { Button } from "react-bootstrap";
import { RotatingLines } from "react-loader-spinner";

function DeleteModal({ onHide, DeleteFuc, CityID, btnloading, ...props }) {
  const DeleteHandler = () => {
    const data = {
      user_id: parseInt(CityID),
    };
    DeleteFuc(data);
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
                className="deleteImg modal_Head_Image"
                src={deleteImg}
              />
            </div>
            <p>Are you sure you want to delete your account?</p>
            <p className="mt-2 welcome-text px-5">
              Once you confirm, our team will review your request and get back
              to you within 48 hours with the options.
            </p>
            <div className="modal-buttons">
              <Button onClick={onHide}>No</Button>
              <Button onClick={DeleteHandler}>
                {btnloading === true ? (
                  <RotatingLines
                    strokeColor="white"
                    width={20}
                    visible={true}
                  />
                ) : (
                  "Yes"
                )}
              </Button>
            </div>
          </Modal.Body>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
