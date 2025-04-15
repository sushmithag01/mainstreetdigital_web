import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RotatingLines } from "react-loader-spinner";

function ShowCodeModal({
  AcknowledgeFuc,
  index,
  cityId,
  recentId,
  btnloading,
  ...props
}) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="ShowCodeModal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="ShowCodeModalContent">
          <img src={props.image} alt="ShowCode" />
          <p className="showCodeP">{props.description}</p>
        </Modal.Body>
        <Modal.Footer className="ShowCodeModalFooter">
          <Button onClick={props.onHide}>{props.firstbutton}</Button>
          <Button
            onClick={() => {
              AcknowledgeFuc(index, cityId, recentId);
            }}
          >
            {btnloading === true ? (
              <RotatingLines strokeColor="white" width={20} visible={true} />
            ) : (
              props.secondbutton
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowCodeModal;
