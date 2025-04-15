import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DefaultImg from "../../assets/DefaultImg.svg";
import { userId } from "../../Utils/Auth/LocalStorage";
import ErrorText from "../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../Utils/Messages/Toasters";
import { DownloadCouponApi } from "./../../Services/Api/DownloadCouponApi";
import { NotificatonServiceApi } from "./../../Services/Api/NotificationService";

const CarousalCard = (props) => {
  const { eachitem, id, business_id, status, flag, setLoading } = props;

  const userid = userId();
  const navigate = useNavigate();
  const [mmsCityId, setMmsCityId] = useState(null);

  useEffect(() => {
    const cityID = localStorage.getItem("city_id");
    const defaultMarketplaceObj = localStorage.getItem("user");
    const defaultMarketplace = JSON.parse(defaultMarketplaceObj);
    if (!cityID) {
      setMmsCityId(defaultMarketplace.user_city_id);
    } else {
      setMmsCityId(cityID);
    }
  }, []);

  const handlePurchaseVoucher = () => {
    navigate(
      `/explore/checkout/${eachitem.business_id}/${eachitem.city_product_id}`
    );
  };

  const handleDownloadCoupon = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: parseInt(userid),
      coupon_id: eachitem?.city_product_id,
      business_id: eachitem?.business_id,
      city_id: mmsCityId,
    };

    const firebasedata = {
      body:
        "Your coupon from " +
        eachitem.business_name +
        " is downloaded. Redeem before " +
        Moment(eachitem.coupon_end_date).format(" DD-MM-YYYY") +
        ".",
      title: "Coupon from " + eachitem.business_name,
    };
    setLoading(true);
    const Response = await DownloadCouponApi(payload, () => {
      navigate("/");
    });
    if (Response === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success === true) {
        const sendnotification = await NotificatonServiceApi(
          firebasedata,
          () => {
            navigate("/");
          }
        );
        SuccessToast("Coupon downloaded successfully");
        navigate("/my-account/my-coupons?tab=available");
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

  const viewCard = (flag, data) => {
    if (flag === "Voucher") {
      navigate(`/explore/voucher-detail/${data.business_id}/${data.id}`, {
        state: {
          recent_Id: data.recent_id,
        },
      });
    } else if (flag === "Coupon") {
      navigate(`/explore/coupon-detail/${data.business_id}/${data.id}`, {
        state: {
          recent_Id: data.recent_id,
        },
      });
    }
  };

  return (
    <Col className="m-2 popularDealsCards inner_Other_Deals_Cards">
      <div className="card p-3">
        <div
          onClick={() =>
            viewCard(eachitem.flag, {
              id: parseInt(eachitem.city_product_id),
              business_id: parseInt(eachitem.business_id),
              status: status,
              flag: eachitem.flag === "Voucher" ? "Voucher" : "Coupons",
              page: "explore",
              eachitem: eachitem,
            })
          }
          style={{ cursor: "pointer" }}
        >
          <div className="other_Deals_Image">
            <img
              loading="lazy"
              className="d-block w-100 border-rad10"
              src={eachitem.product_image ? eachitem.product_image : DefaultImg}
              alt="First slide"
            />
          </div>
          <div className="tag">
            <p
              className="loc-detail-1 mt-3 text-limit-1"
              title={eachitem.category}
            >
              {eachitem.category}
            </p>
            <div className="tag-main">
              <p className="ribben">{eachitem.flag}</p>
            </div>
          </div>
          <p
            className="loc-detail-2 text-limit-2"
            title={eachitem.product_name}
          >
            {eachitem.product_name}{" "}
          </p>
          <p
            className="loc-detail-3 text-limit-2"
            title={eachitem.business_name}
          >
            by {eachitem.business_name}
          </p>
          {eachitem.flag === "Voucher" && (
            <div className="d-flex">
              <p
                className="loc-price-1"
                style={{ textDecoration: "line-through" }}
              >
                ${eachitem.product_actual_price}
              </p>
              <p className="loc-price-2">${eachitem.product_offer_price}</p>
              <p className="loc-price-offer">
                {eachitem.offered_percent ? eachitem.offered_percent : "0"}% OFF
              </p>
            </div>
          )}
        </div>
        {eachitem.flag === "Voucher" ? (
          <a
            onClick={() => handlePurchaseVoucher()}
            className="mt-3 text-center green-btn"
            style={{ color: "white", cursor: "pointer" }}
          >
            Buy Now
          </a>
        ) : (
          <Link
            style={{ color: "white" }}
            className="mt-3 text-center green-btn"
            onClick={(e) => handleDownloadCoupon(e)}
          >
            Download
          </Link>
        )}
      </div>
    </Col>
  );
};

export default CarousalCard;
