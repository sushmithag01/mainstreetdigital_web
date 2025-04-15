import CreateNewPassword from "../Pages/Authentication/CreateNewPassword/CreateNewPassword";
import ForgotPassword from "../Pages/Authentication/ForgotPassword/ForgotPassword";
import ForgotPasswordOtp from "../Pages/Authentication/ForgotPassword/ForgotPasswordOTP";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import SignupOtp from "../Pages/Authentication/SignUp/SignupOtp";
import PrivacyPolicy from "../Pages/Other/PrivacyPolicy";
import SupportPage from "../Pages/Other/SupportPage";
import TermsAndConditions from "../Pages/Other/TermsAndConditions";
import TransactableOffer from "../Pages/Other/TransactableOffer";

const OG_DESCRIPTION =
  "Access hundreds of exclusive deals and discounts from your favorite local businesses. Start saving today!";

const OG_DESCRIPTION_RESOURCES =
  "How to use guide, Free Resources, shop local, buy local, hyper local marketplace, community marketplace";

const OG_IMAGE =
  "https://customer.shoplocal.digital/static/media/Black%20Shop%20local%20logo.d47c6a53faedf2aa37b03973d3e85f40.svg";

const PublicPages = [
  {
    path: "/",
    component: SignIn,
    pageTitle: "Shop Local Digital | Customer Login",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/signin",
    component: SignIn,
    pageTitle: "Shop Local Digital | Customer Login",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/signup",
    component: SignUp,
    pageTitle: "Shop Local Digital | Customer Sign Up",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/signup/otp",
    component: SignupOtp,
    pageTitle: "Shop Local Digital | Verify OTP",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    pageTitle: "Shop Local Digital | Forgot Password",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/forgot-password/otp",
    component: ForgotPasswordOtp,
    pageTitle: "Shop Local Digital | Forgot Password OTP",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/create-new-password",
    component: CreateNewPassword,
    pageTitle: "Shop Local Digital | Create New Password",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/marketplace-offer",
    component: TransactableOffer,
    pageTitle: "Shop Local Digital | Marketplace Offer",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/support",
    component: SupportPage,
    pageTitle: "Shop Local Digital | Resources",
    pageDescription: OG_DESCRIPTION_RESOURCES,
    pageImage: OG_IMAGE,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
    pageTitle: "Shop Local Digital | Privacy Policy",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/terms-and-conditions",
    component: TermsAndConditions,
    pageTitle: "Shop Local Digital | Terms and Conditions",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
];

export default PublicPages;
