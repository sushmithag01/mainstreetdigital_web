import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import forgot from "../../../assets/forgot.png";
import Logo from "../../../assets/newLogo.svg";
import ErrorLabel from "../../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../../Components/Loader/Loader";
import { Forgotpassword } from "../../../Services/Api/Forgotpassword";
import { ForgotPswdValidateOtp } from "../../../Services/Api/ForgotPswdValidateOtp";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../../Utils/Messages/Toasters";
import { OtpCheck } from "../../../Utils/Validations/ConditionChecks";
import "../ForgotPassword/ForgotPassword.css";
import "../SignIn/SignIn.css";

const ForgotPasswordOtp = () => {
  const navigate = useNavigate();

  const [Otp, setOtp] = useState("");
  const [errDisplay, setErrDisplay] = useState("");
  const [loading, setLoading] = useState(false);

  const otpTimeObj = localStorage.getItem("forgotPasswordResponse");
  const ParsedOtpTimer = JSON.parse(otpTimeObj);
  const otpTimer = ParsedOtpTimer?.timer * 60;
  const userID = parseInt(ParsedOtpTimer?.user_id);
  const userTOKEN = parseInt(ParsedOtpTimer?.token);

  const ResendCodeData = localStorage.getItem("forgotPasswordResendCode");

  // time counter
  const [timer, setTimer] = useState(otpTimer);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const onOtp = () => {
    setErrDisplay("");
  };

  const ResendCodeHandler = async () => {
    setLoading(true);
    const Response = await Forgotpassword(ResendCodeData, () => {
      navigate("/");
    });
    if (Response === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success === true) {
        SuccessToast(Response.p_responseMessage);
        setErrDisplay("");
        setTimer(Response.timer * 60);
        setOtp("");
        localStorage.setItem(
          "forgotPasswordResponse",
          JSON.stringify(Response)
        );
        setLoading(false);
      } else {
        ErrorToast(Response.p_responseMessage);
        setLoading(false);
      }
    }
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    const OtpValidation = OtpCheck(Otp);

    if (OtpValidation.input === "empty") {
      setErrDisplay(OtpValidation.err_display);
    }
    if (OtpValidation.input === "LessCharacters") {
      setErrDisplay(OtpValidation.err_display);
    }
    if (OtpValidation.validition === true) {
      ForgotPasswordApiHandler();
    }
  };

  const ForgotPasswordApiHandler = async () => {
    setLoading(true);
    let payload = {
      user_id: userID,
      token: userTOKEN,
      otp: parseInt(Otp),
    };
    const Response = await ForgotPswdValidateOtp(payload, () => {
      navigate("/");
    });

    if (Response === false) {
      ErrorToast(ErrorText.InternalError);

      setLoading(false);
    } else {
      if (Response.success === true) {
        SuccessToast(Response.message);
        setOtp("");
        localStorage.clear();
        navigate("/create-new-password", {
          state: { token: Response.token },
        });
        setLoading(false);
      } else {
        ErrorToast(Response.message);
        setOtp("");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!ResendCodeData || !otpTimer) {
      navigate("/forgot-password");
    }
    let intervalId = null;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  useEffect(() => {
    if (!ResendCodeData || !otpTimer) {
      navigate("/forgot-password");
    }
    setTimer(otpTimer);
  }, [otpTimer]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <Container className="public_Container">
            <Row className="justify-content-md-center py-3 mobile-main">
              <Col
                md="6"
                className="page-content-left text-center hide-mobile  d-flex align-items-center justify-content-center"
              >
                <Image src={forgot} className="imgwidth-100" />
              </Col>
              <Col md="6" className="page-content-right">
                <div className="text-center mb-2">
                  <div className="otp_Logo">
                    <Image src={Logo} />
                  </div>
                  <p className="sign-second mt-2">
                    Verify One-time verification code
                  </p>
                </div>
                <Row>
                  <div className="signemail mt-3 pt-0 pb-3 text-center emailforgot">
                    {ResendCodeData?.check === 2 ? (
                      <p className="text-center recive-text">
                        Please enter the one-time verification code sent to your
                        registered mobile number
                      </p>
                    ) : (
                      <>
                        <p className="text-center recive-text">
                          Please enter the one-time verification code sent to
                          your registered email
                        </p>
                        <p
                          className="text-center recive-text p-3"
                          style={{
                            fontStyle: "italic",
                            paddingTop: 10,
                            fontSize: 14,
                            lineHeight: "21px",
                          }}
                        >
                          (If you haven't received the One-time verification
                          code in your inbox, kindly check your spam folder.)
                        </p>
                      </>
                    )}
                    <OTPInput
                      className="otp-section mt-4 mb-2"
                      value={Otp}
                      onChange={(val) => {
                        setOtp(val);
                        onOtp();
                      }}
                      autoFocus
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      maxTime={-1}
                    />
                    <div className="p-2">
                      {errDisplay ? (
                        <ErrorLabel
                          ErrorDisplay={errDisplay}
                          color={errDisplay === "Successful!" ? true : false}
                        />
                      ) : timer !== 0 ? (
                        <p style={{ color: "#e66100" }}>
                          The verification code sent will expire in{" "}
                          {formatTime(timer)} minutes
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>

                    <Link
                      onClick={ResendCodeHandler}
                      className="resendotp-section"
                    >
                      <p className="forgot-text">Resend Code</p>
                    </Link>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={SubmitHandler}
                      className="green-btn mt-2 mb-3 otp-submit"
                    >
                      Verify
                    </Button>
                  </div>
                  <Link to={"/forgot-password"}>
                    <p className="text-center back-btn">
                      <MdArrowBack />
                      Back
                    </p>
                  </Link>
                  <p
                    style={{
                      textAlign: "center",
                      paddingTop: "20px",
                      color: "#fff",
                      fontSize: 14,
                      fontStyle: "italic",
                    }}
                  >
                    (Do not refresh the page)
                  </p>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordOtp;
