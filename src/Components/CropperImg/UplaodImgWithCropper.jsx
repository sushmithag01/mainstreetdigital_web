import React, { useCallback, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import { Image } from "react-bootstrap";
import profile from "../../../src/assets/profile.png";
import getCroppedImg from "./cropImage";

export const UplaodImgWithCropper = (props) => {
  const {
    cropImg,
    setcropImg,
    iscropImgEdited,
    setIscropImgEdited,
    setEditcropImg,
    EditFlag,
    SetErrDisplayImage,
  } = props;
  const inputRef = useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();

  // popups
  const [show, setShow] = useState(false);
  // img
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [prevImg, setPrevimg] = useState("");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSetCropperImg = (e) => {
    setShow(true);
    setPrevimg(URL.createObjectURL(e.target.files[0]));
  };

  const modelClose = () => {
    setShow(false);
    setIscropImgEdited(false);
    setEditcropImg(false);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        prevImg,
        croppedAreaPixels,
        rotation
      );
      setcropImg(croppedImage);
      setIscropImgEdited(true);
      setEditcropImg(true);
      setShow(false);
      setZoom(1);
      setRotation(0);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const imageErrorHandler = (e) => {
    e.target.src = profile;
  };
  return (
    <div className="upload_main">
      <Modal
        show={show}
        onHide={() => setShow(false)}
        style={{ marginTop: 0 }}
        className="profile-popup"
      >
        <Modal.Header></Modal.Header>
        <Modal.Body style={{ width: "100%", height: 300 }}>
          <div>
            <Cropper
              image={prevImg}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1 / 1}
              cropShape="square"
              showGrid={false}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modelFooter">
          <div className="btn-footer">
            <div className="btns" style={{ marginRight: 10 }}>
              <Button onClick={modelClose} className="close_btn_cropper">
                Close
              </Button>
            </div>
            <div className="btns">
              <Button
                onClick={showCroppedImage}
                className="green-btn btn btn-primary"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
      {/* uplaod */}
      <div
        className="upload_main"
        onClick={() => {
          triggerFileSelectPopup();
          SetErrDisplayImage("");
        }}
      >
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleSetCropperImg}
          disabled={EditFlag === true ? false : true}
          onClick={(e) => (e.target.value = null)}
          style={
            EditFlag === true
              ? { cursor: "no-drop", display: "none" }
              : { cursor: "pointer", display: "none" }
          }
        />
        {cropImg == "" ? (
          <div>
            <Image
              loading="lazy"
              width={100}
              src={profile}
              className="mb-3"
            ></Image>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onClick={(e) => (e.target.value = null)}
            />
          </div>
        ) : (
          <img
            loading="lazy"
            src={cropImg}
            onError={imageErrorHandler}
            className="img_profile"
            style={
              EditFlag === true
                ? { cursor: "pointer" }
                : { cursor: "not-allowed" }
            }
          />
        )}
      </div>
    </div>
  );
};
