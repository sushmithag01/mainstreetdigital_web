import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import email from "../../assets/email.png";
import BackArrow from "../../Components/BackButton/BackArrow";
import ErrorLabel from "../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../Components/Loader/Loader";
import Navigation from "../../Components/Navigation/Navigation";
import { ResetUserEmail } from "../../Services/Api/ResetUserEmail";
import { userId } from "../../Utils/Auth/LocalStorage";
import ErrorText from "../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../Utils/Messages/Toasters";
import { EmailCheck } from "../../Utils/Validations/ConditionChecks";

const EditEmailAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailAddress, setEmailAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errdisplay, setErrdisplay] = useState("");

  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value);
    setErrdisplay("");
  };

  const validateEmailAddress = (event) => {
    event.preventDefault();
    const emailCheck = EmailCheck(emailAddress);
    if (emailCheck.input === "empty") {
      setErrdisplay(emailCheck.err_display);
    } else if (emailCheck.input === "invalid") {
      setErrdisplay(emailCheck.err_display);
    } else if (emailCheck.validition === true) {
      const userid = userId();
      let payload = {
        email_address: emailAddress,
        user_id: userid,
      };
      setErrdisplay(emailCheck.success_display);
      handleVerify(payload);
    }
  };

  const handleVerify = async (payload) => {
    setLoading(true);
    const Response = await ResetUserEmail(payload, () => {
      navigate("/");
    });
    if (Response === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success === true) {
        SuccessToast(Response.message);
        // dispatch(getForgotPswdCounter(Response.timer));
        // dispatch(getEditEmailandMobileResendCode(EmailCredentials));
        localStorage.setItem("emailTimer", JSON.stringify(Response.timer));
        localStorage.setItem("emailResendCodePayload", JSON.stringify(payload));
        navigate("/my-profile/edit-email-address/otp");
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
  return (
    <>
      {loading === true ? <Loader /> : ""}
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard backCheckout">
            <BackArrow />
          </p>
          <p className="page-maintitle">Edit Email Address</p>
          <Row>
            <Col md="4"></Col>
            <Col md="4">
              <div className="text-center mt-3">
                <Image loading="lazy" width={150} src={email}></Image>
                <p className="mt-4 redem-confirm">Change E-Mail</p>
                <Form
                  className="formmain mt-4 signin-row edit-mainform"
                  onSubmit={validateEmailAddress}
                >
                  <Form.Group
                    className="mb-1 text-left w-full"
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="form-label-custom">
                      Enter New E-Mail
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter E-mail"
                      className="custom-formcontrol edit-form"
                      onChange={handleEmailChange}
                      maxLength={70}
                    />
                  </Form.Group>
                  <div style={{ textAlign: "left", paddingBottom: "0.2rem" }}>
                    <ErrorLabel ErrorDisplay={errdisplay} />
                  </div>
                  <div className="d-flex vou-btns just-center mt-1">
                    <Button
                      variant="primary"
                      type="submit"
                      className="green-btn"
                    >
                      Send Verification code{" "}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col md="4"></Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default EditEmailAddress;
