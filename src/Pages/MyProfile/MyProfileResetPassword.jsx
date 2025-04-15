import React, { useState } from "react";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackArrow from "../../Components/BackButton/BackArrow";
import ErrorLabel from "../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../Components/Loader/Loader";
import {
  ConfirmPasswordCheck,
  CreatePasswordCheck,
} from "../../Utils/Validations/ConditionChecks";
import { ResetPasswordApi } from "../../Services/Api/ResetPasswordApi";
import { ServerError } from "../../Utils/Messages/ErrorMessages";
import { getToken, userId } from "../../Utils/Auth/LocalStorage";
import Navigation from "../../Components/Navigation/Navigation";

const MyProfileResetPassword = () => {
  const user_id = userId();
  const authToken = getToken();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [visibleOldPassword, setVisibleOldPassword] = useState(true);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const [errDisplayOldPassword, seterrDisplayOldPassword] = useState("");
  const [errDisplayNewPassword, seterrDisplayNewPassword] = useState("");
  const [errDisplayConfirmPassword, seterrDisplayConfirmPassword] =
    useState("");
  const [checkRightNewPswd, setCheckRightNewPswd] = useState(false);
  const [checkRightConfirmPswd, setCheckRightConfirmPswd] = useState(false);

  const onOldPassword = (e) => {
    let oldpswd = e.target.value;
    setOldPassword(oldpswd);
    seterrDisplayOldPassword("");
  };

  const onNewPassword = (e) => {
    let newPswd = e.target.value;
    setNewPassword(newPswd);
    seterrDisplayNewPassword("");

    const NewPasswordValidation = CreatePasswordCheck(newPswd);

    if (NewPasswordValidation.input === "empty") {
      seterrDisplayNewPassword("");
      setCheckRightNewPswd(false);
    } else if (NewPasswordValidation.input === "lesscharacters") {
      seterrDisplayNewPassword(NewPasswordValidation.err_display);
      setCheckRightNewPswd(false);
    } else if (NewPasswordValidation.input === "invalid") {
      seterrDisplayNewPassword(NewPasswordValidation.err_display);
      setCheckRightNewPswd(false);
    }
    if (NewPasswordValidation.validition === true) {
      setCheckRightNewPswd(true);
      seterrDisplayNewPassword("");
    }
  };

  const onConfirmPassword = (e) => {
    let confirmPswd = e.target.value;
    setConfirmPassword(confirmPswd);
    seterrDisplayNewPassword("");
    const ConfirmPasswordValidation = ConfirmPasswordCheck(
      newPassword,
      confirmPswd
    );

    if (ConfirmPasswordValidation.input === "empty") {
      seterrDisplayConfirmPassword("");
      setCheckRightConfirmPswd(false);
    } else if (ConfirmPasswordValidation.input === "deosnotmatch") {
      seterrDisplayConfirmPassword(ConfirmPasswordValidation.err_display);
      setCheckRightConfirmPswd(false);
    }
    if (ConfirmPasswordValidation.validition === true) {
      setCheckRightConfirmPswd(true);
      seterrDisplayConfirmPassword("");
    }
  };

  const OldPasswordVisibleHandler = () => {
    setVisibleOldPassword(true);
  };
  const OldPasswordNotVisibleHandler = () => {
    setVisibleOldPassword(false);
  };

  const NewPasswordVisibleHandler = () => {
    setVisibleNewPassword(false);
  };
  const NewPasswordNotVisibleHandler = () => {
    setVisibleNewPassword(true);
  };

  const ConfirmPasswordVisibleHandler = () => {
    setVisibleConfirmPassword(false);
  };
  const ConfirmPasswordNotVisibleHandler = () => {
    setVisibleConfirmPassword(true);
  };

  const ResetPasswordHandler = async (data) => {
    setLoading(true);
    const RestPasswordData = await ResetPasswordApi(data, () => {
      navigate("/");
    });
    if (RestPasswordData === false) {
      toast.error(ServerError, {
        position: "top-center",
        width: "600px",
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
      if (RestPasswordData.success == true) {
        toast.success(RestPasswordData.message, {
          position: "top-center",
          width: "600px",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/my-profile");
        setLoading(false);
      } else if (RestPasswordData.status === 429) {
        setLoading(true);
        toast.error(RestPasswordData.message, {
          position: "top-center",
          width: "600px",
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(RestPasswordData.message, {
          position: "top-center",
          width: "600px",
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

  const ResetPasswordSaveHandler = (e) => {
    e.preventDefault();
    const NewPasswordValidation = CreatePasswordCheck(newPassword);
    const ConfirmPasswordValidation = ConfirmPasswordCheck(
      newPassword,
      confirmPassword
    );
    let OldPasswordValidation = true;

    if (!oldPassword) {
      seterrDisplayOldPassword("Old password is required!");
      OldPasswordValidation = false;
    }

    if (NewPasswordValidation.input === "empty") {
      seterrDisplayNewPassword(NewPasswordValidation.err_display);
    } else if (NewPasswordValidation.input === "lesscharacters") {
      seterrDisplayNewPassword(NewPasswordValidation.err_display);
    } else if (NewPasswordValidation.input === "invalid") {
      seterrDisplayNewPassword(NewPasswordValidation.err_display);
    }

    if (ConfirmPasswordValidation.input === "empty") {
      seterrDisplayConfirmPassword(ConfirmPasswordValidation.err_display);
    } else if (ConfirmPasswordValidation.input === "deosnotmatch") {
      seterrDisplayConfirmPassword(ConfirmPasswordValidation.err_display);
    }

    // if (OldPasswordValidation === true) {
    //   seterrDisplayOldPassword("");
    // }

    // if (NewPasswordValidation.validition === true) {
    //   seterrDisplayNewPassword("");
    // }

    // if (ConfirmPasswordValidation.validition === true) {
    //   seterrDisplayConfirmPassword("");
    // }

    if (
      NewPasswordValidation.validition &&
      ConfirmPasswordValidation.validition &&
      OldPasswordValidation === true
    ) {
      let ResetPasswordData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
        user_id: user_id,
        auth_token: authToken,
      };
      ResetPasswordHandler(ResetPasswordData);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setCheckRightConfirmPswd(false);
      setCheckRightNewPswd(false);

      seterrDisplayOldPassword("");
      seterrDisplayNewPassword("");
      seterrDisplayConfirmPassword("");
    }
  };

  return (
    <>
      {loading === true ? <Loader /> : ""}
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text mt-3">
            <BackArrow />
            {/* <Link to="/my-profile">
              <MdKeyboardArrowLeft className="arrow-left" />
              Back
            </Link> */}
          </p>
          <p className="page-maintitle">Reset Password</p>
          <div className="white-bg mt-4 py-5">
            <Row className="resetpage">
              <Col md="4"></Col>
              <Col md="4">
                <Form
                  onSubmit={ResetPasswordSaveHandler}
                  className="formmain mx-5 mb-3 signin-row"
                  autoComplete="off"
                >
                  <Row>
                    <Col md="12" className="mt-3">
                      <Form.Label className="form-label-custom edit-sec">
                        Old Password
                      </Form.Label>
                      <InputGroup
                        className="mb-1 edit-border"
                        style={{ position: "relative" }}
                      >
                        <Form.Control
                          type={visibleOldPassword === false ? "" : "password"}
                          placeholder="Enter Old Password"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          onChange={onOldPassword}
                          value={oldPassword}
                          autoComplete="off"
                        />
                        {visibleOldPassword === false ? (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2"
                            onClick={OldPasswordVisibleHandler}
                          >
                            <FaEyeSlash className="eye-icon" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2"
                            onClick={OldPasswordNotVisibleHandler}
                          >
                            <FaEye className="eye-icon" />
                          </Button>
                        )}
                      </InputGroup>
                      <ErrorLabel ErrorDisplay={errDisplayOldPassword} />
                    </Col>
                    <Col md="12" className="mt-2">
                      <Form.Label className="form-label-custom edit-sec">
                        New Password{" "}
                        {checkRightNewPswd === true ? (
                          <BsCheckCircleFill
                            style={{
                              color: "green",
                              fontSize: "1rem",
                              padding: "0rem 0rem 0.1rem 0rem",
                            }}
                          ></BsCheckCircleFill>
                        ) : (
                          <></>
                        )}
                      </Form.Label>
                      <InputGroup
                        className="mb-1 edit-border"
                        style={{ position: "relative" }}
                      >
                        <Form.Control
                          type={visibleNewPassword === true ? "" : "password"}
                          placeholder="Enter New Password"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          onChange={onNewPassword}
                          value={newPassword}
                          autoComplete="off"
                          role="presentation"
                        />
                        {visibleNewPassword === true ? (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2"
                            onClick={NewPasswordVisibleHandler}
                          >
                            <FaEyeSlash className="eye-icon" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2"
                            onClick={NewPasswordNotVisibleHandler}
                          >
                            <FaEye className="eye-icon" />
                          </Button>
                        )}
                      </InputGroup>
                      <ErrorLabel ErrorDisplay={errDisplayNewPassword} />
                    </Col>
                    <Col md="12" className="mt-2">
                      <Form.Label className="form-label-custom edit-sec">
                        Confirm Password{" "}
                        {checkRightConfirmPswd === true ? (
                          <BsCheckCircleFill
                            style={{
                              color: "green",
                              fontSize: "1rem",
                              padding: "0rem 0rem 0.1rem 0rem",
                            }}
                          ></BsCheckCircleFill>
                        ) : (
                          <></>
                        )}
                      </Form.Label>
                      <InputGroup
                        className="mb-1 edit-border"
                        style={{ position: "relative" }}
                      >
                        <Form.Control
                          type={
                            visibleConfirmPassword === true ? "" : "password"
                          }
                          placeholder="Re-enter new password"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          onChange={onConfirmPassword}
                          value={confirmPassword}
                          autoComplete="off"
                        />
                        {visibleConfirmPassword === true ? (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2"
                            onClick={ConfirmPasswordVisibleHandler}
                          >
                            <FaEyeSlash className="eye-icon" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2"
                            onClick={ConfirmPasswordNotVisibleHandler}
                          >
                            <FaEye className="eye-icon" />
                          </Button>
                        )}
                      </InputGroup>
                      <ErrorLabel ErrorDisplay={errDisplayConfirmPassword} />
                    </Col>
                  </Row>
                  <div className="text-center reset-btns mt-1">
                    <Button
                      variant="primary"
                      type="submit"
                      className="green-btn mt-3 saveReset"
                    >
                      Save
                    </Button>
                    <Link to="/my-profile" className="redeem-resend ">
                      <p className="mt-2 view-btn">Cancel</p>
                    </Link>
                  </div>
                </Form>
              </Col>
              <Col md="4"></Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfileResetPassword;
