import { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorLabel from "../../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../../Components/Loader/Loader";
import { SignUP } from "../../../Services/Api/SignUP";
import { ServerError } from "../../../Utils/Messages/ErrorMessages";
import {
  ConfirmPasswordCheck,
  CreatePasswordCheck,
  EmailCheck,
  FirstNameCheck,
  LastNameCheck,
} from "../../../Utils/Validations/ConditionChecks";
import Logo from "../../../assets/newLogo.svg";
import signupimg from "../../../assets/signup.png";
import "../SignIn/SignIn.css";
import {
  formatPhoneNumber,
  validatePhoneNumber,
} from "../../../Utils/Validations/MobileFormatter";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validationfirstName, setValidationFirstName] = useState("");
  const [validationlastName, setValidationLastName] = useState("");
  const [validationemail, setValidationEmail] = useState("");
  const [validationmobileNumber, setValidationMobileNumber] = useState("");
  const [validationcreatePassword, setValidationCreatePassword] = useState("");
  const [validationconfirmPassword, setValidationConfirmPassword] =
    useState("");
  const [validationTcCheck, setValidationTcCheck] = useState("");
  const [visibleOldPassword, setVisibleOldPassword] = useState(true);
  const [visibleOldPassword2, setVisibleOldPassword2] = useState(true);

  const [capthaErr_Display, setCapthaErr_Display] = useState("");
  const [verfied, setVerifed] = useState(false);
  const [check, setCheck] = useState(false);

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

  const onFirstName = (event) => {
    setFirstName(event.target.value);
    setValidationFirstName("");
  };

  const onLastName = (event) => {
    setLastName(event.target.value);
    setValidationLastName("");
  };

  const onEmail = (event) => {
    setEmail(event.target.value);
    setValidationEmail("");
  };

  const onMobileNumber = (event) => {
    let formattedValue = formatPhoneNumber(event.target.value);
    setMobileNumber(formattedValue);
    if (!validatePhoneNumber(formattedValue)) {
      setValidationMobileNumber("Please enter a valid mobile number!");
    } else {
      setValidationMobileNumber("");
    }
  };

  const onCreatePassword = (event) => {
    setCreatePassword(
      event.target.value.replace(/\s/g, "").replace(/(<([^>]+)>)/gi, "")
    );
    setValidationCreatePassword("");
  };

  const onConfirmPassword = (event) => {
    setConfirmPassword(
      event.target.value.replace(/\s/g, "").replace(/(<([^>]+)>)/gi, "")
    );
    setValidationConfirmPassword("");
  };

  const onCheck = (e) => {
    setCheck(e.target.checked);
    setValidationTcCheck("");
  };

  const SignUpHandler = async (SignUpCredentials) => {
    setLoading(true);
    const SignUpStatus = await SignUP(SignUpCredentials, () => {
      navigate("/");
    });

    if (SignUpStatus === false) {
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
      if (SignUpStatus.success === true) {
        toast.success(SignUpStatus.eu_status, {
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
        localStorage.setItem("otpTimer", SignUpStatus.timer * 60);
        localStorage.setItem(
          "ResendCodeData",
          JSON.stringify(SignUpCredentials)
        );
        navigate("/signup/otp");
        setLoading(false);
      } else {
        toast.error(SignUpStatus.eu_status, {
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

  const SubmitHandler = (event) => {
    event.preventDefault();
    let formcheck = true;

    const FirstNameValidation = FirstNameCheck(firstName);
    const LastNameValidation = LastNameCheck(lastName);
    const EmailValidation = EmailCheck(email);
    const CreatePasswordValidation = CreatePasswordCheck(createPassword);
    const ConfirmPasswordValidation = ConfirmPasswordCheck(
      createPassword,
      confirmPassword
    );

    if (FirstNameValidation.input === "empty") {
      formcheck = false;
      setValidationFirstName(FirstNameValidation.err_display);
    } else if (FirstNameValidation.input === "invalid") {
      formcheck = false;
      setValidationFirstName(FirstNameValidation.err_display);
    }

    if (LastNameValidation.input === "empty") {
      formcheck = false;
      setValidationLastName(LastNameValidation.err_display);
    } else if (LastNameValidation.input === "invalid") {
      formcheck = false;
      setValidationLastName("Enter the valid Last Name!");
    }

    if (EmailValidation.input === "empty") {
      formcheck = false;
      setValidationEmail(EmailValidation.err_display);
    } else if (EmailValidation.input === "invalid") {
      formcheck = false;
      setValidationEmail(EmailValidation.err_display);
    }

    // if (MobileNumberValidation.input === "empty") {
    //   formcheck = false;
    //   setValidationMobileNumber(MobileNumberValidation.err_display);
    // } else if (MobileNumberValidation.input === "invalid") {
    //   formcheck = false;
    //   setValidationMobileNumber(MobileNumberValidation.err_display);
    // }
    if (mobileNumber.length === 0) {
      setValidationMobileNumber("Mobile number is required!");
      formcheck = false;
    }

    if (CreatePasswordValidation.input === "empty") {
      formcheck = false;
      setValidationCreatePassword(CreatePasswordValidation.err_display);
    } else if (CreatePasswordValidation.input === "lesscharacters") {
      formcheck = false;
      setValidationCreatePassword(CreatePasswordValidation.err_display);
    } else if (CreatePasswordValidation.input === "invalid") {
      formcheck = false;
      setValidationCreatePassword(CreatePasswordValidation.err_display);
    }

    if (ConfirmPasswordValidation.input === "empty") {
      formcheck = false;
      setValidationConfirmPassword("Confirm the Password!");
    } else if (ConfirmPasswordValidation.input === "deosnotmatch") {
      formcheck = false;
      setValidationConfirmPassword("Password did not match!");
    }

    if (check) {
      formcheck = true;
      setValidationTcCheck("");
    } else {
      formcheck = false;
      setValidationTcCheck(
        "Please agree to the privacy policy and terms & conditions"
      );
    }
    const windowLocation = window.location.href;
    const is_dev = windowLocation.split("/");
    if (verfied === false && process.env.NODE_ENV === "development") {
      setVerifed(true);
      setCapthaErr_Display("");
    } else {
      setCapthaErr_Display("Please check the captcha");
    }

    if (
      formcheck === true &&
      verfied === true &&
      validationmobileNumber === ""
    ) {
      const mobile_number = mobileNumber.replace(/-/g, "");
      let SignUpDetails = {
        eu_first_name: firstName.trim(),
        eu_last_name: lastName.trim(),
        eu_email: email.trim(),
        eu_contact_number: parseInt(mobile_number),
        eu_password: confirmPassword.trim(),
        type: 1,
      };
      SignUpHandler(SignUpDetails);
    }
  };
  function onChange(value) {
    setCapthaErr_Display("");
    if (!value) {
      setVerifed(false);
    } else {
      setVerifed(true);
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <Container>
            <Row className="justify-content-md-center py-3">
              <Col xs lg="6" className="page-content-left">
                <Image
                  loading="lazy"
                  src={signupimg}
                  width="100%"
                  className="mt-5 pt-5"
                ></Image>
                <p className="login-text1 mt-4" style={{ color: "black" }}>
                  Welcome!
                </p>
                <p className="login-text2 mt-2" style={{ color: "black" }}>
                  You are here to create a customer account on Shop Local
                  Digital Platform.
                </p>
                <p className="login-text2 mt-2" style={{ color: "black" }}>
                  With your account, you will be able to browse through deals
                  and discounts from your favorite community marketplace,
                  download them and redeem them all in one place.
                </p>
                <p className="mt-3 note-text">
                  Please create your account and explore all the offers and
                  save.
                </p>
              </Col>
              <Col md="6" className="page-content-right">
                <div className="text-center mb-2">
                  <Image loading="lazy" className="signLogo" src={Logo}></Image>
                  <h1 className="sign-second mt-4 pt-0">Customer Sign Up</h1>
                </div>
                <Row>
                  <div className="signemail py-3" autoComplete="off">
                    <Form
                      onSubmit={SubmitHandler}
                      className="formmain signin-row"
                      autoComplete="off"
                    >
                      <Form.Group className="" controlId="formBasicFirstName">
                        <Form.Label className="form-label-custom">
                          First Name <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          type="input"
                          placeholder="Enter First Name"
                          className="custom-formcontrol"
                          onChange={onFirstName}
                          value={firstName}
                          maxLength={50}
                          autoComplete="off"
                        />
                        <ErrorLabel ErrorDisplay={validationfirstName} />
                      </Form.Group>
                      <Form.Group className="" controlId="formBasicLastName">
                        <Form.Label className="form-label-custom">
                          Last Name <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          type="input"
                          placeholder="Enter Last Name"
                          className="custom-formcontrol"
                          onChange={onLastName}
                          value={lastName}
                          maxLength={50}
                          autoComplete="off"
                        />
                        <ErrorLabel ErrorDisplay={validationlastName} />
                      </Form.Group>
                      <Form.Group className="" controlId="formBasicEmail">
                        <Form.Label className="form-label-custom">
                          Email Address <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Your Email Address"
                          className="custom-formcontrol"
                          onChange={onEmail}
                          value={email}
                          maxLength={70}
                          autoComplete="off"
                        />
                        <ErrorLabel ErrorDisplay={validationemail} />
                      </Form.Group>
                      <Form.Group
                        className="mobile_Number"
                        controlId="formBasicNumber"
                      >
                        <Form.Label className="form-label-custom">
                          Mobile Number <span className="star-required">*</span>
                        </Form.Label>
                        <span className="sub-text1">
                          &#40;Numbers only. No dash (-) or dot(.) between
                          numbers and We protect your information,
                          <a
                            href="https://meylah.com/privacy-policy/"
                            target="_blank"
                            className="info-text"
                          >
                            our Privacy Policy
                          </a>
                          &#41;
                        </span>

                        <div>
                          <Form.Control
                            className="custom-formcontrol form-control plus_One_SignUp"
                            value="+1"
                            disabled
                          />
                          <Form.Control
                            type="input"
                            placeholder="Enter Mobile Number"
                            className="custom-formcontrol"
                            onChange={onMobileNumber}
                            value={mobileNumber}
                            autoComplete="new-number"
                          />
                        </div>
                        <ErrorLabel ErrorDisplay={validationmobileNumber} />
                      </Form.Group>
                      <Form.Group
                        className=""
                        controlId="formBasicPassword"
                        style={{ position: "relative" }}
                      >
                        <Form.Label className="form-label-custom">
                          Create Password{" "}
                          <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          type={
                            visibleOldPassword === true ? "password" : "text"
                          }
                          placeholder="Type a new password "
                          className="custom-formcontrol"
                          onChange={onCreatePassword}
                          value={createPassword}
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
                        <ErrorLabel ErrorDisplay={validationcreatePassword} />
                      </Form.Group>
                      <Form.Group
                        className=""
                        controlId="formBasicConfirmPassword"
                        style={{ position: "relative" }}
                      >
                        <Form.Label className="form-label-custom">
                          Confirm Password{" "}
                          <span className="star-required">*</span>
                        </Form.Label>
                        <Form.Control
                          type={
                            visibleOldPassword2 === true ? "password" : "text"
                          }
                          placeholder="Confirm Your Password "
                          className="custom-formcontrol"
                          onChange={onConfirmPassword}
                          value={confirmPassword}
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
                        <ErrorLabel ErrorDisplay={validationconfirmPassword} />
                      </Form.Group>
                      <Form.Group
                        style={{ margin: "20px auto" }}
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          onChange={onCheck}
                          type="checkbox"
                          className="SignUpTC"
                          label={
                            <>
                              <p>
                                I agree to the&nbsp;
                                <a
                                  href="https://meylah.com/privacy-policy/"
                                  target="_blank"
                                >
                                  Privacy Policy
                                </a>
                                <span style={{ color: "#fff" }}>
                                  &nbsp;and&nbsp;
                                </span>
                                <a
                                  href="https://meylah.com/termsofuse/"
                                  target="_blank"
                                >
                                  Terms & Conditions
                                </a>
                              </p>
                            </>
                          }
                        />
                        <ErrorLabel ErrorDisplay={validationTcCheck} />
                      </Form.Group>
                      <div className="reCAPTCHA_Div">
                        <ReCAPTCHA
                          sitekey="6Lf1ntInAAAAAI77P7jBWgjdS03JlaBTuV_V2xLt"
                          // sitekey="6LcOrPApAAAAALx4D8u07JnDfZjJ0qxedwJ-2GCu"
                          onChange={onChange}
                          className="captcha"
                          required
                        />
                        <ErrorLabel ErrorDisplay={capthaErr_Display} />
                      </div>
                      <div className="text-center signup_Button_Orange">
                        <Button
                          variant="primary"
                          type="submit"
                          className="green-btn mt-2"
                        >
                          Sign Up
                        </Button>
                        <p className="dont-acc">
                          Already have an account?{" "}
                          <Link to="/" className="signup-text">
                            Login
                          </Link>
                        </p>
                        <Link to="/" className="backSignup">
                          <MdArrowBack />
                          Back
                        </Link>
                      </div>
                    </Form>
                  </div>
                </Row>
                {/* <p className="loginwith">
                <span>Or Login with</span>
              </p> */}
                {/* <Row className="p-0">
                <Col md="6" className="social-main social-main1">
                  <button className="signin-social px-3">
                    <Image loading="lazy"
                      src={Facebook}
                      width="35px"
                      className="social-icons"
                    ></Image>
                  </button>
                </Col>
                <Col md="6" className="social-main">
                  <button className="signin-social px-3">
                    <Image loading="lazy"
                      src={Gmail}
                      width="35px"
                      className="social-icons"
                    ></Image>
                  </button>
                </Col>
              </Row> */}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default SignUp;
