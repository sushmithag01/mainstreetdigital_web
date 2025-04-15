import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../assets/css/style.css";
import redeem from "../../../assets/redeem.png";
import BackArrow from "../../../Components/BackButton/BackArrow";
import Loader from "../../../Components/Loader/Loader";
import Navigation from "../../../Components/Navigation/Navigation";
import { RedeemVoucherApi } from "../../../Services/Api/RedeemVoucherApi";
import { userId } from "../../../Utils/Auth/LocalStorage";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../../Utils/Messages/Toasters";

const RedeemConfirmation = () => {
  const userid = userId();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const parameter = useParams();
  const VoucherId = parseInt(parameter.voucher_id);
  const recentId = parseInt(parameter.recent_id);

  const handleRedeemVoucher = async () => {
    const data = {
      user_id: parseInt(userid),
      voucher_id: VoucherId,
      recent_id: recentId,
    };
    setLoading(true);
    const Response = await RedeemVoucherApi(data, () => {
      navigate("/");
    });
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success == true) {
        SuccessToast(Response.message);
        localStorage.setItem("RedeemTimer", JSON.stringify(Response.timer));
        localStorage.setItem("RedeemResendCodePayload", JSON.stringify(data));
        navigate(
          `/my-account/my-vouchers/redeem-voucher/otp/${VoucherId.toString()}`
        );
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
      {loading ? <Loader /> : ""}
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard">
            <BackArrow />
          </p>
          <p className="page-maintitle">Redeem Voucher</p>
          <div className="text-center mt-3">
            <Image loading="lazy" src={redeem}></Image>
            <p className="mt-4 redem-confirm" style={{ color: "black" }}>
              Are you sure you want to redeem now?
            </p>
            <p style={{ color: "black" }}>
              Make sure you are at the right place, at the
              <br /> right time before redeeming.
            </p>
            <div className="d-flex vou-btns just-center mt-3 redeemable">
              <Link
                variant="primary"
                type="submit"
                className="view-btn redeem-cancel"
                to="/my-account/my-vouchers"
              >
                Cancel
              </Link>
              <Link
                variant="primary"
                type="submit"
                className="green-btn redeem-now1"
                onClick={handleRedeemVoucher}
                style={{ color: "white" }}
              >
                Redeem
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedeemConfirmation;
