import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginUser } from "../../../Services/Api/LoginUser";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../../Utils/Messages/Toasters";
import Regex from "../../../Utils/Regex/Regex";
import Loginimg from "../../../assets/login.png";
import newLogo from "../../../assets/newLogo.svg";
import "./SignIn.css";
import { UserProfile } from "../../../Services/Api/UserProfile";
import { SetUserSocialLoginCredentials } from "../../../Utils/Auth/LocalStorage";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [btnloading, setBtnLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // err
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // showOrHide-password
  const [passwordShow, setPasswordShow] = useState(true);
  const handleShowPassword = () => {
    setPasswordShow(!passwordShow);
  };

  // handleinput
  const handleFormField = (value, e) => {
    if (value == "email") {
      setEmail(e.target.value);
      if (Regex.EmailTest.test(e.target.value) === false) {
        setEmailErr(ErrorText.EmailValidError);
      } else {
        setEmailErr("");
      }
    }
    if (value == "password") {
      setPassword(e.target.value);
      if (Regex.PasswordTest.test(e.target.value) === false) {
        setPasswordErr(ErrorText.PasswordValidError);
      } else {
        setPasswordErr("");
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    if (email.length == 0) {
      setEmailErr(ErrorText.EmailRequiredError);
      setBtnLoading(false);
    }
    if (password.length == 0) {
      setPasswordErr(ErrorText.PasswordRequiredError);
      setBtnLoading(false);
    }
    if (
      email.length != 0 &&
      password.length != 0 &&
      emailErr.length == 0 &&
      passwordErr.length == 0
    ) {
      setEmailErr("");
      setPasswordErr("");
      const data = {
        eu_email: email,
        eu_password: password,
      };
      const Response = await LoginUser(data);
      if (!Response) {
        ErrorToast(ErrorText.InternalError);
        setBtnLoading(false);
      } else if (Response.eu_status == "Incorrect password") {
        ErrorToast(Response.eu_status);
        setBtnLoading(false);
      } else {
        localStorage.setItem("user", JSON.stringify(Response));
        if (Response.is_new_user) {
          navigate("/explore/other-marketplaces", {
            state: { isNewUser: true },
          });
          getProfileImage();
          SuccessToast("Successfully Logged In!");
          setBtnLoading(false);
        } else {
          SetUserSocialLoginCredentials(Response);
          const from = location.state?.from || "/explore";
          localStorage.setItem("path", location.state?.from?.pathname);
          navigate(from, { replace: true });
          getProfileImage();
          SuccessToast("Successfully Logged In!");
          setBtnLoading(false);
        }
      }
    }
  };

  const getProfileImage = async () => {
    const Response = await UserProfile(() => {
      navigate("/");
    });
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
    } else if (
      Response[0].profile_image != null ||
      Response[0].profile_image != undefined
    ) {
      localStorage.setItem("profileImage", Response[0].profile_image);
    }
  };
  return (
    <>
      <div className="main">
        <Container className="public_Container">
          <Row className="justify-content-md-center py-3 mobile-main">
            <Col xs lg="6" className="page-content-left hide-mobile">
              <Image
                loading="lazy"
                src={Loginimg}
                width="100%"
                className="mt-5 pt-5"
              ></Image>
              <p
                className="login-text1 mt-4 login-heading"
                style={{ color: "black" }}
              >
                Welcome and Start Saving!
              </p>
              <p
                className="login-text2 mt-2 login-sub-heading"
                style={{ color: "black" }}
              >
                Log in to your account to access deals and discounts from your
                favorite business in your community.
              </p>
              <p
                className="login-text2 mt-3 login-sub-heading"
                style={{ color: "black" }}
              >
                We also have a mobile app in IOS and Google Play. Search for
                “Shop Local Digital” and download the app. You can log in with
                the same account details and take advantage of all the deals and
                discounts on the go!
              </p>
              <p className="mt-3 note-text">
                If you need to create an account, click on “Sign Up” link below
                the “Login” button and get started.
              </p>
            </Col>
            <Col md="6" className="page-content-right">
              <div className="text-center mb-2">
                <Image
                  loading="lazy"
                  className="signLogo"
                  src={newLogo}
                ></Image>
                <h1 className="sign-second mt-4 pt-0">Customer Login</h1>
              </div>
              <Row>
                <div className="signemail py-3">
                  <Form
                    className="formmain signin-row"
                    autoComplete="off"
                    onSubmit={handleSignIn}
                  >
                    <Form.Group className="" controlId="formBasicEmail">
                      <Form.Label className="form-label-custom">
                        Email address <span className="star-required">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email address"
                        className="custom-formcontrol"
                        onChange={(e) => {
                          handleFormField("email", e);
                        }}
                        value={email}
                        maxLength={70}
                        autoComplete="off"
                      />
                      {emailErr && <span className="err-text">{emailErr}</span>}
                    </Form.Group>

                    <Form.Group
                      className="mt-4"
                      controlId="formBasicPassword"
                      style={{ position: "relative" }}
                    >
                      <Form.Label className="form-label-custom">
                        Password <span className="star-required">*</span>
                      </Form.Label>
                      <Form.Control
                        type={passwordShow ? "password" : ""}
                        placeholder="Password"
                        className="custom-formcontrol"
                        onChange={(e) => handleFormField("password", e)}
                        value={password}
                        autoComplete="off"
                      />
                      {passwordShow ? (
                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          className="edit-mainn px-2 signin"
                          onClick={() => handleShowPassword()}
                        >
                          <FaEyeSlash className="eyeIcon" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline-secondary"
                          id="button-addon2"
                          className="edit-mainn px-2 signin"
                          onClick={() => handleShowPassword()}
                        >
                          <FaEye className="eyeIcon" />
                        </Button>
                      )}
                      {passwordErr && (
                        <span className="err-text">{passwordErr}</span>
                      )}
                    </Form.Group>
                    <div className="forgot_Password mt-3">
                      <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                    <div className="text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        className="green-btn"
                      >
                        {btnloading === true ? (
                          <RotatingLines
                            strokeColor="white"
                            width={20}
                            visible={true}
                          />
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                  </Form>
                  <p className="dont-acc text-center">
                    Don’t have account?{" "}
                    <Link to="/signup" className="signup-text">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </Row>
              {/* <p className="loginwith">
                <span>Or Login with</span>
              </p> */}
              <div className="fb-google-register-now">
                {/* <SocialLogins SetLoadingFuc={setLoading} />
                <p className="login_Text">
                  You can login with Google or Facebook if you have used same
                  e-mail address to sign up. 
                </p>*/}
                <Row>
                  <div className="reg-bussiness mt-3 py-3 px-4">
                    <Row>
                      <Col md="7">
                        <p className="busitext-1">If you are business owner </p>
                        <p className="busitext-2">Register Your Business!</p>
                      </Col>
                      <Col md="5" className="reg-main">
                        <a
                          href={process.env.REACT_APP_BUSINESS_URL + "signup"}
                          target="_blank"
                        >
                          <Button variant="primary" className="green-btn mt-2">
                            Register Now
                          </Button>
                        </a>
                      </Col>
                    </Row>
                  </div>
                </Row>
                <div className="link-container">
                  <a href="https://meylah.com/privacy-policy/" target="_blank">
                    <p className="link-text text-center">Privacy Policy</p>
                  </a>
                  <span style={{ color: "#fff" }}>|</span>
                  <a href="https://meylah.com/termsofuse/" target="_blank">
                    <p className="link-text text-center">Terms & Conditions</p>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
