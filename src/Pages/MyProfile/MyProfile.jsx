import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { MdDelete, MdEdit, MdOutlineBorderColor } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackArrow from "../../Components/BackButton/BackArrow";
import { UplaodImgWithCropper } from "../../Components/CropperImg/UplaodImgWithCropper";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import ErrorLabel from "../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../Components/Loader/Loader";
import {
  FirstNameCheck,
  LastNameCheck,
} from "../../Utils/Validations/ConditionChecks";
import { getProfileUpdateFlag } from "../../Redux/ProfileUpdateSlice";
import { DeleteProfileAPI } from "../../Services/Api/DeleteProfileAPI";
import { UserProfile } from "../../Services/Api/UserProfile";
import { UpdateName } from "../../Services/Api/UsrProfileNameUpdate";
import { ServerError } from "../../Utils/Messages/ErrorMessages";
import { userId } from "../../Utils/Auth/LocalStorage";
import "../../assets/css/style.css";
import Navigation from "../../Components/Navigation/Navigation";
import "./MyProfile.css";
import { formatPhoneNumber } from "../../Utils/Validations/MobileFormatter";

const MyProfile = (props) => {
  // Boolean values for dynamic representation for edit first name, last name and buttons(save,cancel)
  const [UserData, setUserData] = useState([]);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editImage, setEditImage] = useState(false);

  //  stored value of inputs(first name, last name)
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");

  const [errDisplayFirstName, setErrDisplayFirstName] = useState("");
  const [errDisplayLastName, setErrDisplayLastName] = useState("");
  const [errDisplayImage, setErrDisplayImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [cursor, setCursor] = useState("no-drop");
  const [cursor2, setCursor2] = useState("no-drop");
  const [cursor3, setCursor3] = useState("no-drop");
  const [cursor4, setCursor4] = useState("no-drop");

  const [border, setBorder] = useState("none");
  const [border2, setBorder2] = useState("none");

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const [cropImg, setcropImg] = useState("");
  const [iscropImgEdited, setIscropImgEdited] = useState(false);
  const [editcropImg, setEditcropImg] = useState(false);
  const [ImagePath, setImagePath] = useState("");
  const [btnloading, setBtnLoading] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [mobileNumber, setMobileNumber] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (cropImg) {
      localStorage.setItem("profileImage", cropImg);
    }
  }, [cropImg]);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const CancelHandler = () => {
    setEditFirstName(false);
    setEditLastName(false);
    setEditImage(false);
    setErrDisplayFirstName("");
    setErrDisplayLastName("");
    setErrDisplayImage("");
    setInputLastName(UserData.last_name);
    setInputFirstName(UserData.first_name);
    setBorder("");
    setBorder2("");
    setCursor("no-drop");
    setCursor2("no-drop");
  };

  const onFirstName = (event) => {
    setInputFirstName(event.target.value);
    setErrDisplayFirstName("");
  };

  const onLastName = (event) => {
    setInputLastName(event.target.value);
    setErrDisplayLastName("");
  };

  const navigate = useNavigate();

  const EditEmailHandler = () => {
    navigate("/my-profile/edit-email-address");
    setCursor4("auto");
  };

  const EditMobileHandler = () => {
    navigate("/my-profile/edit-mobile-number");
    setCursor3("auto");
  };

  const UserCredentials = async () => {
    setLoading(true);
    const usercredentials = await UserProfile(() => {
      navigate("/");
    });
    setLoading(false);
    if (usercredentials === false) {
      toast.error(ServerError, {
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
    } else if (usercredentials.status === 429) {
      setLoading(true);
      toast.error(usercredentials.message, {
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
    } else {
      setUserData(usercredentials[0]);
      setMobileNumber(formatPhoneNumber(usercredentials[0]?.mobile_number));
      localStorage.setItem("username", usercredentials[0].first_name);

      // You should set the default value here
      setInputFirstName(usercredentials[0].first_name);
      setInputLastName(usercredentials[0].last_name);
      if (
        usercredentials[0].profile_image ==
        process.env.REACT_APP_BACKEND_URL + "/0"
      ) {
        setcropImg("");
      } else {
        setcropImg(usercredentials[0].profile_image);
      }
    }
  };

  const UpdateNameAPI = async (updateVal) => {
    setLoading(true);
    const updatestatus = await UpdateName(updateVal, () => {
      navigate("/");
    });
    if (updatestatus === false) {
      toast.error(ServerError, {
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
      setLoading(false);
    } else {
      if (updatestatus.success === true) {
        dispatch(getProfileUpdateFlag(true));
        UserCredentials();
        setCursor("no-drop");
        setCursor2("no-drop");
        setBorder("");
        setBorder2("");
        navigate("/my-profile");
        setTimeout(() => {
          setLoading(false);
          toast.success(updatestatus.message, {
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
        }, 1000);
      } else if (updatestatus.status === 429) {
        toast.error(updatestatus.message, {
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
        setLoading(true);
      } else {
        toast.error(updatestatus.message, {
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
        setLoading(false);
      }
    }
  };

  const userid = userId();

  const SaveHandler = (event) => {
    event.preventDefault();
    let check = true;
    const FirstNameValidation = FirstNameCheck(inputFirstName);
    const LastNameValidation = LastNameCheck(inputLastName);

    if (editFirstName === true && FirstNameValidation.input === "empty") {
      setErrDisplayFirstName(FirstNameValidation.err_display);
      check = false;
    }

    if (editLastName === true && LastNameValidation.input === "empty") {
      setErrDisplayLastName(LastNameValidation.err_display);
      check = false;
    }

    if (!cropImg) {
      setErrDisplayImage("Profile image is required!");
      check = false;
    }

    const CroppedImage = cropImg.split("/");

    const ImgPath =
      CroppedImage[3] + "/" + CroppedImage[4] + "/" + CroppedImage[5];

    if (editFirstName && editLastName && editImage === true && check === true) {
      let data = {
        first_name: inputFirstName,
        last_name: inputLastName ? inputLastName : UserData.last_name,
        user_id: userid,
        pro_img_change: editcropImg != true ? 0 : 1,
        profile_image:
          editcropImg != true ? ImgPath : { data: cropImg, file_type: "png" },
      };
      UpdateNameAPI(data);
      setEditFirstName(false);
      setEditLastName(false);
      setEditImage(false);
      setEditcropImg(false);
    }
    // if (editFirstName === true && FirstNameValidation.validition === true) {
    //   let FirstName = {
    //     first_name: inputFirstName,
    //     last_name: inputLastName ? inputLastName : UserData.last_name,
    //     user_id: userid,
    //     pro_img_change: editcropImg != true ? 0 : 1,
    //     profile_image:
    //       editcropImg != true ? ImgPath : { data: cropImg, file_type: "png" },
    //   };
    //   UpdateNameAPI(FirstName);
    //   setEditFirstName(false);
    //   setEditcropImg(false);
    // } else if (
    //   editLastName === true &&
    //   LastNameValidation.validition === true
    // ) {
    //   let LastName = {
    //     first_name: inputFirstName ? inputFirstName : UserData.first_name,
    //     last_name: inputLastName,
    //     user_id: userid,
    //     pro_img_change: editcropImg != true ? 0 : 1,
    //     profile_image:
    //       editcropImg != true ? ImgPath : { data: cropImg, file_type: "png" },
    //   };
    //   UpdateNameAPI(LastName);
    //   setEditLastName(false);
    //   setErrDisplayFirstName("");
    //   setEditcropImg(false);
    // } else if (cropImg != "") {
    //   let payloadImg = {
    //     first_name: inputFirstName ? inputFirstName : UserData.first_name,
    //     last_name: inputLastName ? inputLastName : UserData.last_name,
    //     user_id: userid,
    //     pro_img_change: editcropImg != true ? 0 : 1,
    //     profile_image:
    //       editcropImg != true ? ImgPath : { data: cropImg, file_type: "png" },
    //   };

    //   UpdateNameAPI(payloadImg);
    //   setEditcropImg(false);
    // }
  };

  const editProfileHandler = () => {
    setEditImage(true);
    setEditFirstName(true);
    setCursor("auto");
    setBorder("1px solid #E66100");

    setEditLastName(true);
    setCursor2("auto");
    setBorder2("1px solid #E66100");
  };

  const DeleteHandlerApi = async (data) => {
    setBtnLoading(true);
    const DeleteRes = await DeleteProfileAPI(data, () => {
      navigate("/");
    });
    if (DeleteRes === false) {
      toast.error(ServerError, {
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
      setBtnLoading(false);
    } else {
      if (DeleteRes.success === true) {
        toast.success(DeleteRes.message, {
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
        setModalShow(false);
        setBtnLoading(false);
      } else if (DeleteRes.status === 429) {
        toast.error(DeleteRes.message, {
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
        setBtnLoading(true);
      } else {
        toast.error(DeleteRes.message, {
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
        setBtnLoading(false);
      }
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  useEffect(() => {
    UserCredentials();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="gray-bg my-profilr-position">
          <div className="navbar-section p-0">
            <Navigation />
          </div>
          <div className="main-content pt-4 pr-3 pb-4 profile">
            <p className="page-text mt-3">
              <BackArrow />
            </p>
            <p className="page-maintitle pt-1 mb-2">My Profile</p>
            <div className="white-bg">
              <Row>
                <Col md="2"></Col>
                <Col md="8">
                  <div className="formmain mx-1 mt-1 signin-row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="my-profile-image-div"
                    >
                      <UplaodImgWithCropper
                        SetErrDisplayImage={setErrDisplayImage}
                        EditFlag={editImage}
                        cropImg={cropImg}
                        setcropImg={setcropImg}
                        iscropImgEdited={iscropImgEdited}
                        setIscropImgEdited={setIscropImgEdited}
                        setEditcropImg={setEditcropImg}
                      />
                    </div>
                    <p className="upload_Profile">
                      (Please upload a profile picture with dimensions of 300 x
                      300 px)
                    </p>
                    {errDisplayImage && (
                      <p className="text_center">
                        <ErrorLabel ErrorDisplay={errDisplayImage} />
                      </p>
                    )}
                    <div
                      className="edit_Button_My_Profile"
                      onClick={editProfileHandler}
                    >
                      <MdEdit />
                      <button>Edit</button>
                    </div>
                    <Row>
                      <Col md="6" className="mt-2">
                        <Form.Group className="mb-0" controlId="formBasicEmail">
                          <Form.Label
                            className="form-label-custom name"
                            style={{}}
                          >
                            First Name
                          </Form.Label>
                          <span className="star-required">*</span>
                          <InputGroup className="edit-border">
                            <Form.Control
                              type="text"
                              style={{ cursor: cursor, border: border }}
                              value={
                                editFirstName === false
                                  ? UserData.first_name
                                  : inputFirstName
                              }
                              placeholder="Enter First Name"
                              className="custom-formcontrol"
                              disabled={editFirstName === true ? false : true}
                              onChange={onFirstName}
                              maxLength={50}
                              autoComplete="off"
                            />

                            {/* <Button
                            to="/my-profile/edit-mobile-number"
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn p-2"
                            onClick={() => {
                              EditFirstNameHandler();
                            }}
                          >
                            <MdOutlineBorderColor className="edit-icon" />
                          </Button> */}
                          </InputGroup>
                          <ErrorLabel ErrorDisplay={errDisplayFirstName} />
                          {/* // */}
                        </Form.Group>
                      </Col>
                      <Col md="6" className="mt-2">
                        <Form.Group className="mb-0" controlId="formBasicEmail">
                          <Form.Label className="form-label-custom email">
                            Last Name
                          </Form.Label>
                          <span className="star-required">*</span>
                          <InputGroup className="edit-border">
                            <Form.Control
                              type="text"
                              style={{ cursor: cursor2, border: border2 }}
                              value={
                                editLastName === false
                                  ? UserData.last_name
                                  : inputLastName
                              }
                              placeholder="Enter Last name"
                              maxLength={50}
                              className="custom-formcontrol"
                              disabled={editLastName === true ? false : true}
                              onChange={onLastName}
                              autoComplete="off"
                            />
                            {/* <Button
                            to="/my-profile/edit-mobile-number"
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn p-2"
                            onClick={EditLastNameHandler}
                          >
                            <MdOutlineBorderColor className="edit-icon" />
                          </Button> */}
                          </InputGroup>
                          <ErrorLabel ErrorDisplay={errDisplayLastName} />
                        </Form.Group>
                      </Col>
                      <Col md="6" className="mt-1 mobile_Number_Col">
                        <Form.Label className="form-label-custom edit-sec">
                          Mobile Number
                        </Form.Label>
                        <span className="star-required">*</span>
                        <InputGroup className="mb-3 edit-border">
                          <Form.Control
                            value="+1"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            className="plus_One_Change"
                            disabled={true}
                          />
                          <div className="profile_Mobile">
                            <Form.Control
                              style={{ cursor: cursor3 }}
                              value={mobileNumber}
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              disabled={true}
                              maxLength={15}
                              autoComplete="off"
                            />
                            <Button
                              onClick={EditMobileHandler}
                              // to="/my-profile/edit-mobile-number"
                              variant="outline-secondary"
                              id="button-addon2"
                              className="edit-mainn p-2"
                            >
                              <MdOutlineBorderColor className="edit-icon" />
                            </Button>
                          </div>
                        </InputGroup>
                      </Col>
                      <Col md="6" className="mt-1">
                        <Form.Label className="form-label-custom edit-sec email">
                          E-Mail Address
                        </Form.Label>
                        <span className="star-required">*</span>
                        <InputGroup className="mb-3 edit-border">
                          <Form.Control
                            style={{ cursor: cursor4 }}
                            value={UserData.email_address}
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            disabled={true}
                            maxLength={70}
                            autoComplete="off"
                          />
                          <Button
                            onClick={EditEmailHandler}
                            // to="/my-profile/edit-email-address"
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn p-2"
                          >
                            <MdOutlineBorderColor className="edit-icon" />
                          </Button>
                        </InputGroup>
                      </Col>
                    </Row>
                    <p className="mt-3 text-center">
                      <Link
                        to="/my-profile/reset-password"
                        className="redeem-resend"
                      >
                        Reset Password
                      </Link>
                    </p>
                    <div className="text-center small-btns d-flex">
                      {editFirstName || editLastName || editcropImg === true ? (
                        <>
                          <Link onClick={CancelHandler}>
                            <p className="view">Cancel</p>
                          </Link>
                          <Button
                            variant="primary"
                            type="submit"
                            className="green-btn mt-3"
                            onClick={SaveHandler}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Col>
                <Col md="2"></Col>
              </Row>
              <div className="delete_My_Account">
                <button onClick={deleteHandler}>
                  Delete Account
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
          <DeleteModal
            show={modalShow}
            CityID={userid}
            DeleteFuc={DeleteHandlerApi}
            onHide={() => setModalShow(false)}
            btnloading={btnloading}
          />
        </div>
      )}
    </>
  );
};

export default MyProfile;
