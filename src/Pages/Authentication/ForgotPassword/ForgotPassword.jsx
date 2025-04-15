import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import forgot from "../../../assets/forgot.png";
import Logo from "../../../assets/newLogo.svg";
import Loader from "../../../Components/Loader/Loader";
import "../SignIn/SignIn.css";
import { Forgotpassword } from "./../../../Services/Api/Forgotpassword";
import "./ForgotPassword.css";
import {
  formatPhoneNumber,
  validatePhoneNumber,
} from "../../../Utils/Validations/MobileFormatter";

const ForgotPassword = () => {
  const [emailcheck, setEmailCheck] = useState("on");
  const [mobileCheck, setMobileCheck] = useState("");
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [commonErr, setCommonErr] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e, field) => {
    setCommonErr("");
    let value = e.target.value;
    if (field === "email") {
      setEmail(value);
      if (!validateEmail(value)) {
        setEmailErr("* Please enter a valid email address!");
      } else {
        setEmailErr("");
      }
    } else if (field === "mobile") {
      let formattedValue = formatPhoneNumber(value);
      setPhone(formattedValue);
      if (!validatePhoneNumber(formattedValue)) {
        setPhoneErr("* Please enter a valid mobile number!");
      } else {
        setPhoneErr("");
      }
    }
  };

  const onEmailCheck = (e) => {
    setEmailCheck(e.target.value);
    setMobileCheck("");
    setPhone("");
    setChecked(!checked);
    setCommonErr("");
  };

  const onMobileCheck = (e) => {
    setMobileCheck(e.target.value);
    setEmailCheck("");
    setEmail("");
    setCommonErr("");
  };

  const navigate = useNavigate();
  const ForgotPasswordHandler = async (ForgotPsswordCredentials) => {
    setLoading(true);
    const forgotpassword = await Forgotpassword(
      ForgotPsswordCredentials,
      () => {
        navigate("/");
      }
    );

    if (forgotpassword === false) {
      toast.error("Internal Server Error!", {
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
      if (forgotpassword.success === true) {
        toast.success(forgotpassword.p_responseMessage, {
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
        localStorage.setItem(
          "forgotPasswordResponse",
          JSON.stringify(forgotpassword)
        );
        localStorage.setItem(
          "forgotPasswordResendCode",
          JSON.stringify(ForgotPsswordCredentials)
        );
        navigate("/forgot-password/otp");
        setCommonErr("");
        setLoading(false);
      } else {
        toast.error(forgotpassword.p_responseMessage, {
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

  const SubmitHandler = (e) => {
    e.preventDefault();

    const isEmailChecked = emailcheck === "on";
    const input = isEmailChecked ? email : phone;
    const inputErr = isEmailChecked ? emailErr : phoneErr;
    const emptyInputMessage = isEmailChecked
      ? "Please enter email address!"
      : "Please enter mobile number!";
    const checkValue = isEmailChecked ? 1 : 2;
    const formattedInput = isEmailChecked ? email : phone.replace(/-/g, "");

    if (input.length === 0) {
      setCommonErr(emptyInputMessage);
    } else if (commonErr === "" && inputErr === "") {
      let ForgetPassword_API_Details = {
        check: checkValue,
        forgot_pwd_input: isEmailChecked ? input : parseInt(formattedInput),
      };
      ForgotPasswordHandler(ForgetPassword_API_Details);
    } else {
      console.log("not filled");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <Container>
            <Row className="justify-content-md-center py-3">
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
                  <p className="sign-second mt-2 pt-2">Forgot Password</p>
                </div>
                <Row>
                  <div className="signemail mt-3 pb-2 formmain signin-row">
                    <p className="text-center recive-text">
                      Recieve a verification Code
                    </p>
                    <Form
                      onSubmit={SubmitHandler}
                      className="forgot passwordcheck mt-4"
                      autoComplete="off"
                    >
                      <div
                        className={
                          emailcheck === "on" ? "emailcheckTrue" : "emailcheck"
                        }
                      >
                        <Form.Check
                          name="grouped"
                          required
                          inline
                          type="radio"
                          className={checked === true ? "checked-radio" : ""}
                          isValid
                          defaultChecked={true}
                          onChange={onEmailCheck}
                        />
                        Via Registered Email Address
                      </div>
                      <p className="loginwith pt-3">
                        <span>Or</span>
                      </p>
                      <div
                        className={
                          emailcheck !== "on" ? "emailcheckTrue" : "emailcheck"
                        }
                      >
                        <Form.Check
                          className={checked === true ? "checked-radio" : ""}
                          name="grouped"
                          required
                          inline
                          type="radio"
                          isValid
                          onChange={onMobileCheck}
                        />
                        Via Registered Mobile Number
                      </div>

                      <Form.Group className="mt-4" controlId="formBasicEmail">
                        {emailcheck === "on" ? (
                          <>
                            <Form.Label className="form-label-custom">
                              <div className="label-info-text">
                                Email Address{" "}
                                <span className="star-required">*</span>
                              </div>
                            </Form.Label>{" "}
                            <Form.Control
                              type="email"
                              placeholder="Enter Email Address"
                              className="custom-formcontrol"
                              onChange={(e) => handleChange(e, "email")}
                              value={email}
                              maxLength={70}
                              autoComplete="off"
                            />
                            {emailErr && email.length !== 0 && (
                              <div style={{ color: "red" }}>{emailErr}</div>
                            )}
                          </>
                        ) : (
                          <>
                            <Form.Label className="form-label-custom">
                              <div className="label-info-text">
                                Mobile Number{" "}
                                <span className="star-required">*</span>
                                <p className="info-text-space">
                                  &#40;Numbers only. No dash (-) or dot(.)
                                  between numbers&#41;
                                </p>
                              </div>
                            </Form.Label>
                            <div className="mobile_Number_Forgot">
                              <Form.Control
                                value="+1"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                disabled={true}
                                className="mobile_Input"
                                autoComplete="off"
                              />
                              <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e) => handleChange(e, "mobile")}
                                placeholder="Enter Mobile Number"
                                className="custom-formcontrol"
                                autoComplete="off"
                              />
                            </div>
                            {phoneErr && (
                              <div style={{ color: "red" }}>{phoneErr}</div>
                            )}
                          </>
                        )}
                        {commonErr && (
                          <div style={{ color: "red" }}>{commonErr}</div>
                        )}
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="green-btn mt-4"
                      >
                        Send
                      </Button>
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

export default ForgotPassword;
