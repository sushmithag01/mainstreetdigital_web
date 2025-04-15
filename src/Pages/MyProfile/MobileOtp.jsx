import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import redeem1 from "../../assets/redeem-1.png";
import BackArrow from "../../Components/BackButton/BackArrow";
import ErrorLabel from "../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../Components/Loader/Loader";
import Navigation from "../../Components/Navigation/Navigation";
import { ResetUserMobile } from "../../Services/Api/ResetUserMobile";
import { VerifyUserMobile } from "../../Services/Api/VerifyUserMobile";
import { userId } from "../../Utils/Auth/LocalStorage";
import ErrorText from "../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../Utils/Messages/Toasters";
import { MobileNumberCheck } from "../../Utils/Validations/ConditionChecks";

const MobileOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [resendPayloadData, setResendPayloadData] = useState({});

  useEffect(() => {
    const getMobilePayload = localStorage.getItem("mobileResendCodePayload");
    const getTotalTimeValue = localStorage.getItem("mobileTimer");

    if (!getMobilePayload || !getTotalTimeValue) {
      navigate("/my-profile");
    } else {
      const parsedMobileNumber = JSON.parse(getMobilePayload);
      const mobileNumber = parsedMobileNumber?.mobile_number;
      setMobile(mobileNumber);
      setResendPayloadData(getMobilePayload);

      const initialTime = getTotalTimeValue ? parseInt(getTotalTimeValue) : 10;
      const timeperiod = initialTime * 60;
      setTimer(timeperiod);
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("mobileTimer", 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle the timer countdown
  useEffect(() => {
    if (timer === 0) {
      localStorage.setItem("mobileTimer", 0);
      return;
    }
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      localStorage.setItem("mobileTimer", 0);
    }
  }, [timer]);

  const validateOTP = (event) => {
    event.preventDefault();
    const user_id = userId();
    let check = true;

    if (!OTP) {
      setErrorMessage("One-time verification code is required!");
      check = false;
    } else if (OTP.length < 6) {
      setErrorMessage("Please enter all 6 digits!");
      check = false;
    } else {
      setErrorMessage("");
      check = true;

      if (MobileNumberCheck(mobile).validition === true) {
        if (!OTP) {
          setErrorMessage("One-time verification code is required!");
        } else {
          setErrorMessage("");
          let payload = {
            mobile_number: mobile,
            user_id: user_id,
            otp: parseInt(OTP),
          };
          if (check === true) {
            handleVerify(payload);
          }
        }
      }
    }
  };

  const handleVerify = async (payload) => {
    setLoading(true);
    const Response = await VerifyUserMobile(payload, () => {
      navigate("/");
    });
    if (Response.success === true) {
      SuccessToast(Response.message);
      localStorage.removeItem("mobileResendCodePayload");
      localStorage.removeItem("mobileTimer");
      navigate("/my-profile");
      setLoading(false);
    } else if (Response.status === 429) {
      ErrorToast(Response.message);
      setLoading(true);
    } else {
      ErrorToast(Response.message);
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setErrorMessage("");
    setLoading(true);
    const Response = await ResetUserMobile(resendPayloadData, () => {
      navigate("/");
    });
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
    } else if (Response.status === 429) {
      ErrorToast(Response.message);
      setLoading(true);
    } else {
      SuccessToast(Response.message);
      setTimer(Response.timer * 60);
      setLoading(false);
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
          <p className="page-text">
            <BackArrow />
          </p>
          <p className="page-maintitle">Edit Mobile Number</p>
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              <div className="text-center mt-3">
                <Image
                  loading="lazy"
                  className="mobile-image"
                  width={180}
                  src={redeem1}
                />
                <p className="mt-4 text-19 bold-600 changeMobile">
                  Verification
                </p>
                <p className="mt-2 text-17 bold-600">
                  Please enter the one-time verification code sent to your new
                  mobile number.
                </p>
                <Row className="just-center otp-verify">
                  <OTPInput
                    className="otp-section mt-3 otp-redeem"
                    value={OTP}
                    onChange={(e) => {
                      setOTP(e);
                      setErrorMessage("");
                    }}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    maxTime={-1}
                  />
                  <div style={{ padding: "1rem 1rem 0rem 1rem" }}>
                    {errorMessage && <ErrorLabel ErrorDisplay={errorMessage} />}
                    {timer !== 0 ? (
                      <p
                        style={{
                          color: "#e66100",
                          padding: "1rem 1rem 0rem 1rem",
                        }}
                      >
                        The one-time verification code will expire in&nbsp;
                        {formatTime(timer)} minutes
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "250px" }}
                    className="green-btn mt-3 mb-3 verify"
                    onClick={validateOTP}
                  >
                    Verify
                  </Button>
                  <p>
                    Didn't receive the verification code?{" "}
                    <Link onClick={handleResendCode} className="redeem-resend">
                      Resend Code
                    </Link>
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      color: "#000",
                      fontSize: 14,
                      fontStyle: "italic",
                    }}
                  >
                    (Do not refresh the page)
                  </p>
                </Row>
              </div>
            </Col>
            <Col md="3"></Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default MobileOtp;
