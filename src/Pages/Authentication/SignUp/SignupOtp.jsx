import moment from "moment-timezone";
import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import forgot from "../../../assets/forgot.png";
import Logo from "../../../assets/newLogo.svg";
import ErrorLabel from "../../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../../Components/Loader/Loader";
import { SignUP } from "../../../Services/Api/SignUP";
import { VerifyOtpApi } from "../../../Services/Api/VerifyOtpApi";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../../Utils/Messages/Toasters";
import { OtpCheck } from "../../../Utils/Validations/ConditionChecks";

const SignupOtp = () => {
  const [Otp, setOtp] = useState("");
  const [errDisplay, setErrDisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const currentTimeZone = moment.tz.guess();
  const navigate = useNavigate();

  const otpTimer = localStorage.getItem("otpTimer") || 600;
  const [timer, setTimer] = useState(otpTimer);
  const ResendCodeData =
    JSON.parse(localStorage.getItem("ResendCodeData")) || null;

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

  const BackHandler = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const OtpValidation = OtpCheck(Otp);

    if (OtpValidation.input === "empty") {
      setErrDisplay(OtpValidation.err_display);
      return;
    }
    if (OtpValidation.input === "LessCharacters") {
      setErrDisplay(OtpValidation.err_display);
      return;
    }

    if (OtpValidation.validition) {
      const validateOtp = {
        email_id: ResendCodeData.eu_email,
        otp: parseInt(Otp),
        time_zone: currentTimeZone,
      };
      await VerifyOtp(validateOtp);
    }
  };

  const ResendOtpHandler = async () => {
    setLoading(true);
    const ResendOtpRes = await SignUP(ResendCodeData, () => {
      navigate("/");
    });
    if (!ResendOtpRes) {
      ErrorToast(ErrorText.InternalError);
    } else if (ResendOtpRes.success) {
      SuccessToast("One-time verification code sent");
      setErrDisplay("");
      setTimer(ResendOtpRes.timer * 60 || 600);
      setOtp("");
    } else {
      ErrorToast("Something went wrong! Please try again.");
    }
    setLoading(false);
  };

  const VerifyOtp = async (data) => {
    setLoading(true);
    const VerifyRes = await VerifyOtpApi(data, () => {
      navigate("/");
    });
    if (VerifyRes.success) {
      SuccessToast(VerifyRes.message);
      localStorage.clear();
      navigate("/");
    } else {
      ErrorToast(VerifyRes.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!ResendCodeData || !otpTimer) {
      navigate("/signup");
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [ResendCodeData, navigate]);

  return (
    <>
      {loading && <Loader />}
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
                  <p className="text-center recive-text">
                    Please enter the one-time verification code sent to your
                    registered email
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
                    (If you haven't received the One-time verification code in
                    your inbox, kindly check your spam folder.)
                  </p>
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
                  />
                  <div className="p-2">
                    {errDisplay ? (
                      <ErrorLabel ErrorDisplay={errDisplay} />
                    ) : timer !== 0 ? (
                      <p style={{ color: "#e66100" }}>
                        The verification code sent will expire in{" "}
                        {formatTime(timer)} minutes
                      </p>
                    ) : null}
                  </div>
                  <Link
                    onClick={ResendOtpHandler}
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
                <a onClick={BackHandler} style={{ cursor: "pointer" }}>
                  <p className="text-center back-btn">
                    <MdArrowBack /> Back
                  </p>
                </a>
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
    </>
  );
};

export default SignupOtp;
