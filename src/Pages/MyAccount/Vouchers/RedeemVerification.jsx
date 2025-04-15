import Moment from "moment";
import OTPInput from "otp-input-react";
import React, { useEffect, useState } from "react";
import { Button, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import redeem1 from "../../../assets/redeem-1.png";
import BackArrow from "../../../Components/BackButton/BackArrow";
import ErrorLabel from "../../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../../Components/Loader/Loader";
import Navigation from "../../../Components/Navigation/Navigation";
import { NotificatonServiceApi } from "../../../Services/Api/NotificationService";
import { RedeemVoucherApi } from "../../../Services/Api/RedeemVoucherApi";
import { VerifyRedeemVoucherApi } from "../../../Services/Api/VerifyRedeemVoucherApi";
import { userId } from "../../../Utils/Auth/LocalStorage";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../../Utils/Messages/Toasters";

const RedeemVerification = () => {
  const navigate = useNavigate();
  const parameter = useParams();
  const VoucherId = parseInt(parameter.voucher_id);

  const [OTP, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(0);
  const [recentId, setRecentID] = useState(0);
  const [resendPayloadData, setResendPayloadData] = useState({});

  useEffect(() => {
    const getEmailPayload = localStorage.getItem("RedeemResendCodePayload");
    const getTotalTimeValue = localStorage.getItem("RedeemTimer");

    if (!getEmailPayload || !getTotalTimeValue) {
      navigate("/my-profile");
    } else {
      const parsedEmailNumber = JSON.parse(getEmailPayload);
      const recentID = parsedEmailNumber?.recent_id;
      setRecentID(recentID);
      setResendPayloadData(getEmailPayload);

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
      localStorage.setItem("RedeemTimer", 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Handle the timer countdown
  useEffect(() => {
    if (timer === 0) {
      localStorage.setItem("RedeemTimer", 0);
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
      localStorage.setItem("RedeemTimer", 0);
    }
  }, [timer]);

  const validateOtp = (event) => {
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
      let data = {
        user_id: user_id,
        voucher_id: VoucherId,
        otp: parseInt(OTP),
        recent_id: recentId,
      };
      if (check === true) {
        handleVerify(data);
      }
    }
  };

  const ResendCodeHandler = async () => {
    setErrorMessage("");
    setLoading(true);
    const Response = await RedeemVoucherApi(resendPayloadData, () => {
      navigate("/");
    });
    if (Response === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success === true) {
        SuccessToast(Response.message);
        setTimer(Response.timer * 60);
        localStorage.setItem("RedeemTimer", JSON.stringify(Response.timer));
        setLoading(false);
      } else if (Response.status === 429) {
        ErrorToast(Response.message);
        setLoading(true);
      } else {
        ErrorToast(Response.message);
        setLoading(false);
      }
    }
  };

  const handleVerify = async (data) => {
    const businessName = localStorage.getItem("businessName");
    const firebasedata = {
      body:
        "Voucher from " +
        businessName +
        " was redeemed on " +
        Moment(new Date()).format(" DD-MM-YYYY"),
      title: "Voucher from " + " redeemed",
    };

    setLoading(true);
    const Response = await VerifyRedeemVoucherApi(data, () => {
      navigate("/");
    });
    if (Response === false) {
      ErrorText(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success == true) {
        const sendnotification = await NotificatonServiceApi(
          firebasedata,
          () => {
            navigate("/");
          }
        );
        SuccessToast(Response.message);
        localStorage.removeItem("RedeemTimer");
        localStorage.removeItem("RedeemResendCodePayload");
        navigate("/my-account/my-vouchers?tab=redeemed");
        setLoading(false);
      } else if (Response.status === 429) {
        setLoading(true);
        ErrorToast(Response.message);
      } else {
        ErrorToast(Response.message);
        setLoading(false);
      }
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
          <p className="page-text dashboard">
            <BackArrow />
          </p>
          <p className="page-maintitle">Redeem Voucher</p>
          <div className="text-center mt-3 mb-5   ">
            <Image loading="lazy" src={redeem1}></Image>
            <p className="mt-4 redem-confirm">Verification</p>
            <p className="redem-confirm">
              You will get the verification code via email or mobile number
            </p>
            <Row className="just-center otp-verify">
              <OTPInput
                className="otp-section mt-4 otp-redeem"
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
              {errorMessage ? (
                <div style={{ padding: "1rem 1rem 0rem 1rem" }}>
                  <ErrorLabel ErrorDisplay={errorMessage} />
                </div>
              ) : timer !== 0 ? (
                <p style={{ color: "#e66100", padding: "1rem 1rem 0rem 1rem" }}>
                  The One-time verification code sent will expire in{" "}
                  {formatTime(timer)} minutes
                </p>
              ) : (
                <></>
              )}
              <Button
                variant="primary"
                type="submit"
                style={{ width: "250px" }}
                className="green-btn mt-3 mb-3 verify"
                onClick={validateOtp}
              >
                Verify
              </Button>
              <p>
                Didn't receive the verification code?{" "}
                <Link onClick={ResendCodeHandler} className="redeem-resend">
                  Resend Code
                </Link>
              </p>
              <p
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                  color: "#000",
                  fontSize: 14,
                  fontStyle: "italic",
                }}
              >
                (Do not refresh the page)
              </p>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedeemVerification;
