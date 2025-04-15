import React, { useState } from "react";
// import "./app.css";
// import { User } from "./User"; // component display user (see detail on /example directory)
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

// CUSTOMIZE ANY UI BUTTON
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { toast } from "react-toastify";
import { getExploreDealMarketplace } from "../../Redux/ExploreDealsSlice";
import { SocialLoginApi } from "../../Services/Api/SocialLoginApi";
import { SetUserSocialLoginCredentials } from "../../Utils/Auth/LocalStorage";
import ComponentLoader from "../ComponentLoader/ComponentLoader";
import "./SocialLogin.css";
// import { ReactComponent as PinterestLogo } from "./assets/pinterest.svg";
// import { ReactComponent as TiktokLogo } from "./assets/tiktok.svg";

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;

const SocialLogins = ({ SetLoadingFuc, color }) => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  console.log("profile", profile);
  console.log("clientId", process.env.REACT_APP_GG_APP_ID);
  const [fbloading, setFbLoading] = useState(false);
  const [Gloading, setGLoading] = useState(false);

  const dispatch = useDispatch();

  // Redux Persisted data
  const ReduxPersistedData = useSelector(
    (state) => state.BusinessDetailsIdPersist
  );

  // voucher flag
  const LandingPageVoucherFlag =
    ReduxPersistedData.LandingPageVoucherDetails.LandingPageVoucherFlag;

  // coupon flag
  const LandingPageCouponFlag =
    ReduxPersistedData.LandingPageCouponDetails.LandingPageCouponFlag;

  const onFacebookLoginStart = () => {
    setFbLoading(true);
  };

  const onGoogleLoginStart = () => {
    setGLoading(true);
    setTimeout(() => {
      setGLoading(false);
    }, 1000);
  };

  // const onLogoutSuccess = useCallback(() => {
  //   setProfile(null);
  //   setProvider("");
  // }, []);

  const navigate = useNavigate();

  const SocialLoginApiHandler = async () => {
    console.log("SocialLoginApiHandler profile", profile);
    const Data = {
      email: profile ? profile.email : "",
    };
    console.log("SocialLoginApiHandler payload Data", Data);
    SetLoadingFuc(true);
    const SocialLoginRes = await SocialLoginApi(Data, () => {
      navigate("/");
    });
    if (SocialLoginRes === false) {
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
      setFbLoading(false);
      setGLoading(false);
      SetLoadingFuc(false);
    } else {
      if (SocialLoginRes.success === true) {
        toast.success(SocialLoginRes.message, {
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
        dispatch(getExploreDealMarketplace(SocialLoginRes.user_city_id));
        SetUserSocialLoginCredentials(SocialLoginRes);
        SetLoadingFuc(false);
        setFbLoading(false);
        setGLoading(false);
        setTimeout(() => {
          if (!LandingPageVoucherFlag && !LandingPageCouponFlag) {
            navigate("/explore");
          } else {
            if (!LandingPageVoucherFlag) {
              navigate(LandingPageCouponFlag);
            } else {
              navigate(LandingPageVoucherFlag);
            }
          }
        }, 1000);
      } else {
        toast.error(SocialLoginRes.message, {
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
        SetLoadingFuc(false);
        setGLoading(false);
        setFbLoading(false);
      }
    }
  };

  useEffect(() => {
    if (profile) {
      SocialLoginApiHandler();
    }
  }, [profile]);

  return (
    <>
      <div className="App" id="socialLogin">
        {Gloading === false ? (
          <LoginSocialGoogle
            className="SocialLoginGoogleButton"
            client_id={process.env.REACT_APP_GG_APP_ID || ""}
            scope="openid profile email "
            onLoginStart={onGoogleLoginStart}
            // access_type={"offline"}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log("triggered!");
              setGLoading(false);
              console.log(err);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        ) : (
          <Button className="FakebtnGoogle">
            <ComponentLoader color={"black"} width={40} height={40} />
          </Button>
        )}
        {fbloading === false ? (
          <LoginSocialFacebook
            className="SocialLoginFacebookButton"
            access_type={"offline"}
            appId={process.env.REACT_APP_FB_APP_ID || ""}
            onLoginStart={onFacebookLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              setFbLoading(false);
              console.log(err);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        ) : (
          <Button className="FakebtnFacebook">
            <ComponentLoader color={"white"} width={40} height={40} />
          </Button>
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default SocialLogins;
