import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import forgot from "../../../assets/forgot.png";
import Logo from "../../../assets/newLogo.svg";
import ErrorLabel from "../../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../../Components/Loader/Loader";
import {
  ConfirmPasswordCheck,
  CreatePasswordCheck,
} from "../../../Utils/Validations/ConditionChecks";
import "../SignIn/SignIn.css";
import { CreatePswdApi } from "./../../../Services/Api/CreatePswdApi";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errDisplayNewPswd, setErrDisplayNewPswd] = useState("");
  const [errDisplayConfirmPswd, setErrorDisplayConfirmPswd] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [visibleOldPassword, setVisibleOldPassword] = useState(true);
  const [visibleOldPassword2, setVisibleOldPassword2] = useState(true);

  const onOldPassword = (e) => {
    let oldpswd = e.target.value;
    setOldPassword(oldpswd);
  };
  const OldPasswordVisibleHandler = () => {
    setVisibleOldPassword(true);
  };
  const OldPasswordNotVisibleHandler = () => {
    setVisibleOldPassword(false);
  };
  const OldPasswordVisibleHandler2 = () => {
    setVisibleOldPassword2(true);
  };
  const OldPasswordNotVisibleHandler2 = () => {
    setVisibleOldPassword2(false);
  };

  const location = useLocation();
  const Api_Token = location.state.token;

  const navigate = useNavigate();

  const onNewPswd = (e) => {
    let NewPswd = e.target.value;
    setNewPassword(NewPswd);
    setErrDisplayNewPswd("");
  };

  const onConfirmPswd = (e) => {
    let ConfirmPswd = e.target.value;
    setConfirmPassword(ConfirmPswd);
    setErrorDisplayConfirmPswd("");
  };

  const SaveHandler = (e) => {
    e.preventDefault();
    const NewPasswordValidation = CreatePasswordCheck(newPassword);
    const ConfirmPasswordValidation = ConfirmPasswordCheck(
      newPassword,
      confirmPassword
    );

    if (NewPasswordValidation.input === "empty") {
      setErrDisplayNewPswd(NewPasswordValidation.err_display);
    } else if (NewPasswordValidation.input === "lesscharacters") {
      setErrDisplayNewPswd(NewPasswordValidation.err_display);
    } else if (NewPasswordValidation.input === "invalid") {
      setErrDisplayNewPswd(NewPasswordValidation.err_display);
    }

    if (ConfirmPasswordValidation.input === "empty") {
      setErrorDisplayConfirmPswd(ConfirmPasswordValidation.err_display);
    } else if (ConfirmPasswordValidation.input === "deosnotmatch") {
      setErrorDisplayConfirmPswd(ConfirmPasswordValidation.err_display);
    }

    if (
      NewPasswordValidation.validition &&
      ConfirmPasswordValidation.validition === true
    ) {
      let NewPswd = {
        token: Api_Token,
        password: confirmPassword,
      };
      CreateNewPasswordHandler(NewPswd);
    }
  };

  const CreateNewPasswordHandler = async (data) => {
    setLoading(true);
    const NewPswdResponse = await CreatePswdApi(data, () => {
      navigate("/");
    });
    if (NewPswdResponse.status === true) {
      setLoading(false);
      toast.success("Your password has successfully changed", {
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
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      setLoading(false);
      toast.success("Something went wrong! please try again", {
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
      setTimeout(() => {
        navigate("/forgot-password");
      }, 800);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <Container className="public_Container">
            <Row className="justify-content-md-center py-3 mobile-main">
              <Col md="6" className="page-content-left text-center hide-mobile">
                <Image
                  loading="lazy"
                  src={forgot}
                  className="my-5 py-5 imgwidth-100"
                ></Image>
              </Col>
              <Col md="6" className="page-content-right">
                <div className="text-center mb-2">
                  <div className="otp_Logo">
                    <Image loading="lazy" src={Logo}></Image>
                  </div>
                  <p className="sign-second mt-1 pt-1 pb-2">
                    Create New Password
                  </p>
                </div>
                <Row>
                  <div className="signemail pt-0 pb-3">
                    <Form
                      onSubmit={SaveHandler}
                      className="formmain signin-row"
                      autoComplete="off"
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                        style={{ position: "relative" }}
                      >
                        <Form.Label className="form-label-custom">
                          New Password <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          onChange={onNewPswd}
                          type={visibleOldPassword === true ? "password" : ""}
                          placeholder="New Password"
                          className="custom-formcontrol"
                          autoComplete="off"
                        />
                        {visibleOldPassword === true ? (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2 newpswd signin"
                            onClick={OldPasswordNotVisibleHandler}
                          >
                            <FaEyeSlash className="eyeIcon" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2 signin"
                            onClick={OldPasswordVisibleHandler}
                          >
                            <FaEye className="eyeIcon" />
                          </Button>
                        )}
                        <ErrorLabel ErrorDisplay={errDisplayNewPswd} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                        style={{ position: "relative" }}
                      >
                        <Form.Label className="form-label-custom">
                          Confirm Password{" "}
                          <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          onChange={onConfirmPswd}
                          type={visibleOldPassword2 === true ? "password" : ""}
                          placeholder="Confirm Password"
                          className="custom-formcontrol"
                          autoComplete="off"
                        />
                        {visibleOldPassword2 === true ? (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2 confirmpswd signin"
                            onClick={OldPasswordNotVisibleHandler2}
                          >
                            <FaEyeSlash className="eyeIcon" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            className="edit-mainn px-2 signin"
                            onClick={OldPasswordVisibleHandler2}
                          >
                            <FaEye className="eyeIcon" />
                          </Button>
                        )}
                        <ErrorLabel ErrorDisplay={errDisplayConfirmPswd} />
                      </Form.Group>
                      <div className="text-center">
                        <Button
                          variant="primary"
                          type="submit"
                          className="green-btn mt-3"
                        >
                          Save
                        </Button>
                      </div>
                    </Form>
                  </div>
                  <Link to="/">
                    <p className="text-center back-btn">
                      <MdArrowBack />
                      Back
                    </p>
                  </Link>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default CreateNewPassword;
