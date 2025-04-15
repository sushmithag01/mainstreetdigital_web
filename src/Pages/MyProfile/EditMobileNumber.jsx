import React, { useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import redeem1 from "../../assets/redeem-1.png";
import BackArrow from "../../Components/BackButton/BackArrow";
import ErrorLabel from "../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../Components/Loader/Loader";
import Navigation from "../../Components/Navigation/Navigation";
import { ResetUserMobile } from "../../Services/Api/ResetUserMobile";
import { userId } from "../../Utils/Auth/LocalStorage";
import { ServerError } from "../../Utils/Messages/ErrorMessages";
import {
  formatPhoneNumber,
  validatePhoneNumber,
} from "../../Utils/Validations/MobileFormatter";

const EditMobileNumber = () => {
  const navigate = useNavigate();

  const [mobileNumber, setMobileNumber] = useState("");
  const [errdisplay, setErrdisplay] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (event) => {
    let formattedValue = formatPhoneNumber(event.target.value);
    setMobileNumber(formattedValue);
    if (!validatePhoneNumber(formattedValue)) {
      setErrdisplay("* Please enter a valid mobile number!");
    } else {
      setErrdisplay("");
    }
  };

  const validateMobileNumber = (event) => {
    event.preventDefault();
    const userid = userId();
    const mobile_number = mobileNumber.replace(/-/g, "");
    let payload = {
      mobile_number: parseInt(mobile_number),
      user_id: userid,
    };
    if (mobileNumber.length === 0) {
      setErrdisplay("* Please enter mobile number!");
    } else if (errdisplay === "" && mobileNumber.length !== 0) {
      handleVerify(payload);
    } else {
      console.log("not filled");
    }
  };

  const handleVerify = async (payload) => {
    setLoading(true);
    const Response = await ResetUserMobile(payload, () => {
      navigate("/");
    });
    if (Response === false) {
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
      if (Response.success === true) {
        toast.success(Response.message, {
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
        localStorage.setItem("mobileTimer", JSON.stringify(Response.timer));
        localStorage.setItem(
          "mobileResendCodePayload",
          JSON.stringify(payload)
        );
        navigate("/my-profile/edit-mobile-number/otp");
        setLoading(false);
      } else if (Response.status === 429) {
        toast.error(Response.message, {
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
        toast.error(Response.message, {
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
                  width={150}
                  src={redeem1}
                ></Image>
                <p className="mt-4 redem-confirm changeMobile">
                  Change Mobile Number
                </p>
                <Form
                  className="formmain mt-4 signin-row edit-mainform"
                  onSubmit={validateMobileNumber}
                >
                  <Form.Group
                    className="mb-1 text-left"
                    controlId="formBasicEmail edit_Mobile"
                  >
                    <Form.Label className="form-label-custom">
                      Enter New Mobile Number{" "}
                      <span className="star-required">*</span>
                      <p className="info-text-space">
                        &#40;Numbers only. No dash (-) or dot(.) between
                        numbers&#41;
                      </p>
                    </Form.Label>

                    <div className="profile_Mobile mobile_Number_Forgot">
                      <Form.Control
                        value="+1"
                        className="custom-formcontrol edit-form plus_One_Change"
                        disabled={true}
                      />
                      <Form.Control
                        type="tel"
                        placeholder="Enter Mobile Number"
                        className="custom-formcontrol edit-form"
                        onChange={handleMobileChange}
                        value={mobileNumber}
                      />
                    </div>
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
            <Col md="3"></Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default EditMobileNumber;
