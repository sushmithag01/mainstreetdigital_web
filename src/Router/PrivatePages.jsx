import Dashboard from "../Pages/Dashboard/Dashboard";
import Explore from "../Pages/Explore/Explore";
import { OtherMarketplaces } from "../Pages/Explore/OtherMarketplaces";
import ContactSeller from "../Pages/Messages/ContactSeller";
import Messages from "../Pages/Messages/Messages";
import CouponDetails from "../Pages/MyAccount/Coupons/CouponDetails";
import MyCoupons from "../Pages/MyAccount/Coupons/MyCoupons";
import MyVouchers from "../Pages/MyAccount/Vouchers/MyVouchers";
import RedeemConfirmation from "../Pages/MyAccount/Vouchers/RedeemConfirmation";
import RedeemVerification from "../Pages/MyAccount/Vouchers/RedeemVerification";
import VoucherDetails from "../Pages/MyAccount/Vouchers/VoucherDetails";
import EditEmailAddress from "../Pages/MyProfile/EditEmailAddress";
import EditMobileNumber from "../Pages/MyProfile/EditMobileNumber";
import EmailOtp from "../Pages/MyProfile/EmailOtp";
import MyProfile from "../Pages/MyProfile/MyProfile";
import MyProfileResetPassword from "../Pages/MyProfile/MyProfileResetPassword";
import Notifications from "../Pages/Notifications/Notifications";
import CheckOutPage from "../Pages/Payments/CheckOutPage";
import TransactionFailed from "../Pages/Payments/TransactionFailed";
import TransactionSuccessful from "../Pages/Payments/TransactionSuccessful";
import MobileOtp from "./../Pages/MyProfile/MobileOtp";

const OG_DESCRIPTION =
  "Access hundreds of exclusive deals and discounts from your favorite local businesses. Start saving today!";

const OG_IMAGE =
  "https://customer.shoplocal.digital/static/media/Black%20Shop%20local%20logo.d47c6a53faedf2aa37b03973d3e85f40.svg";

const PrivatePages = [
  // EXPLORE
  {
    path: "/explore",
    component: Explore,
    pageTitle: "Shop Local Digital | Explore",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/explore/other-marketplaces",
    component: OtherMarketplaces,
    pageTitle: "Shop Local Digital | Explore",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/explore/coupon-detail/:business_id/:id",
    component: CouponDetails,
    pageTitle: "Shop Local Digital | Coupon Detail",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },

  {
    path: "/explore/voucher-detail/:business_id/:id",
    component: VoucherDetails,
    pageTitle: "Shop Local Digital | Voucher Detail",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/explore/checkout/:business_id/:id",
    component: CheckOutPage,
    pageTitle: "Shop Local Digital | Checkout",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/explore/checkout/transaction-successful",
    component: TransactionSuccessful,
    pageTitle: "Shop Local Digital | Transaction Successful",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/explore/checkout/transaction-failed",
    component: TransactionFailed,
    pageTitle: "Shop Local Digital | Transaction Failed",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },

  // DASHBOARD
  {
    path: "/dashboard",
    component: Dashboard,
    pageTitle: "Shop Local Digital | Dashboard",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  // MY-ACCOUNT
  {
    path: "/my-account/my-vouchers",
    component: MyVouchers,
    pageTitle: "Shop Local Digital | My Vouchers",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-account/my-coupons",
    component: MyCoupons,
    pageTitle: "Shop Local Digital | My Coupons",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-account/my-vouchers/voucher-detail/:business_id/:id",
    component: VoucherDetails,
    pageTitle: "Shop Local Digital | Voucher Details",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-account/my-coupons/coupon-detail/:business_id/:id",
    component: CouponDetails,
    pageTitle: "Shop Local Digital | Coupon Details",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-account/:pageName/contact-seller/:business_id/:id",
    component: ContactSeller,
    pageTitle: "Shop Local Digital | Contact Seller",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-account/my-vouchers/redeem-voucher/:voucher_id/:recent_id",
    component: RedeemConfirmation,
    pageTitle: "Shop Local Digital | Redeem Voucher",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-account/my-vouchers/redeem-voucher/otp/:voucher_id",
    component: RedeemVerification,
    pageTitle: "Shop Local Digital | Redeem Verification",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },

  // MY PROFILE
  {
    path: "/my-profile",
    component: MyProfile,
    pageTitle: "Shop Local Digital | My Profile",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-profile/reset-password",
    component: MyProfileResetPassword,
    pageTitle: "Shop Local Digital | My Profile Reset Password",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-profile/edit-mobile-number",
    component: EditMobileNumber,
    pageTitle: "Shop Local Digital | Edit Mobile Number",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-profile/edit-email-address",
    component: EditEmailAddress,
    pageTitle: "Shop Local Digital | Edit Email Address",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-profile/edit-email-address/otp",
    component: EmailOtp,
    pageTitle: "Shop Local Digital | Email Verification",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  {
    path: "/my-profile/edit-mobile-number/otp",
    component: MobileOtp,
    pageTitle: "Shop Local Digital | Mobile Verification",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },

  // NOTIFICATION
  {
    path: "/notifications",
    component: Notifications,
    pageTitle: "Shop Local Digital | Notifications",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
  // MESSAGES
  {
    path: "/messages/:id",
    component: Messages,
    pageTitle: "Shop Local Digital | Messages",
    pageDescription: OG_DESCRIPTION,
    pageImage: OG_IMAGE,
  },
];

export default PrivatePages;
