import React, { useEffect, useState } from "react";
import { Col, Image, Popover, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdCall, MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import defaultImage from "../../../assets/Cover Default Image.png";
import "../../../assets/css/style.css";
import DefaultImg from "../../../assets/DefaultImg.svg";
import inactive from "../../../assets/inactive_End_User.svg";
import thumbsup1 from "../../../assets/thumbs-up1.png";
import BackArrow from "../../../Components/BackButton/BackArrow";
import BusinessHours from "../../../Components/BusinessHours";
import CarousalList from "../../../Components/CarousalCard/CarousalList";
import FroalaCustomViewer from "../../../Components/FroalaCustomViewer";
import Loader from "../../../Components/Loader/Loader";
import Navigation from "../../../Components/Navigation/Navigation";
import { OtherDealsApi } from "../../../Services/Api/OtherDealsApi";
import { RelatedDealsApi } from "../../../Services/Api/RelatedDealsApi";
import { VoucherDetailsApi } from "../../../Services/Api/VoucherDetailsApi";
import { userId } from "../../../Utils/Auth/LocalStorage";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../../Utils/Messages/Toasters";
import { getAddressString } from "../../../Utils/Validations/AddressFormatter";
import DateFormatter from "../../../Utils/Validations/DateFormatter";

const VoucherDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const parameter = useParams();
  const userid = userId();

  const voucherId = parseInt(parameter.id);
  const businessId = parseInt(parameter.business_id);
  const [mmsCityId, setMmsCityId] = useState(0);
  const [windowHistory, setWindowHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const [voucherDetail, setVoucherdetail] = useState([]);
  const [otherDealsList, setOtherDealsList] = useState([]);
  const [relatedDealsList, setRelatedDealsList] = useState([]);
  const [btnStatus, setBtnStatus] = useState("");

  const shareUrl = voucherDetail?.voucher_share_url
    ? voucherDetail?.voucher_share_url
    : "";

  useEffect(() => {
    const cityID = localStorage.getItem("city_id");
    const defaultMarketplaceObj = localStorage.getItem("user");
    const redirectHistory = localStorage.getItem("path");
    const defaultMarketplace = JSON.parse(defaultMarketplaceObj);
    setWindowHistory(redirectHistory);
    if (!cityID) {
      setMmsCityId(defaultMarketplace.user_city_id);
    } else {
      setMmsCityId(cityID);
    }
  }, []);

  useEffect(() => {
    if (mmsCityId !== 0) {
      getVoucherDetails();
      getOtherDealsDetails();
      getRelatedDealsDetails();
    }
  }, [mmsCityId, voucherId]);

  const getVoucherDetails = async () => {
    setLoading(true);
    const RecentId = location?.state?.recent_Id || null;

    const path = window.location.href;
    const endPath = path.split("/");

    const payload_inital = {
      eu_id: userid.toString(),
      voucherId: voucherId,
    };
    const payload_redeem = {
      eu_id: userid.toString(),
      voucherId: voucherId,
      recent_id: RecentId,
    };

    const Response = await VoucherDetailsApi(
      !RecentId ? payload_inital : payload_redeem,
      payload_inital,
      () => {
        navigate("/");
      }
    );

    if (!Response) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success == true) {
        setVoucherdetail(Response.res[0]);

        if (endPath[3] == "explore") {
          if (Response.res[0].expire_days < 0) {
            setBtnStatus("expired");
          } else {
            setBtnStatus("buy-now");
          }
        } else if (endPath[3] == "my-account") {
          if (Response.res[0].expire_days < 0) {
            setBtnStatus("expired");
          } else {
            setBtnStatus(Response.res[0].redeem_status);
          }
        }

        window.scrollTo(0, 0);
        setLoading(false);
      } else if (Response.status == 429) {
        ErrorToast(Response.message);
        setLoading(true);
      } else {
        ErrorToast(Response.message);
        setLoading(false);
      }
    }
  };

  const getOtherDealsDetails = async () => {
    setLoading(true);
    const payload = {
      eu_id: userid.toString(),
      business_id: businessId,
      city_id: mmsCityId,
    };
    const Response = await OtherDealsApi(payload, () => {
      navigate("/");
    });
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.success == true) {
        setOtherDealsList(Response.data);
        setLoading(false);
      } else if (Response.status == 429) {
        ErrorToast(Response.message);
        setLoading(true);
      } else {
        setLoading(false);
      }
    }
  };

  const getRelatedDealsDetails = async () => {
    setLoading(true);
    const payload = {
      eu_id: userid.toString(),
      business_id: businessId,
      city_id: mmsCityId,
      product_id: voucherId,
      product_flag: "Voucher",
    };
    const Response = await RelatedDealsApi(payload, () => {
      navigate("/");
    });
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response) {
        setRelatedDealsList(Response);
        setLoading(false);
      } else if (Response.status == 429) {
        ErrorToast(Response.message);
        setLoading(true);
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="gray-bg Vou-Cou-detail">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4 details">
          {windowHistory == "undefined" ? (
            <BackArrow />
          ) : (
            <p className="back-btn-bold" onClick={() => navigate("/explore")}>
              <MdKeyboardArrowLeft className="arrow-left" />
              Back
            </p>
          )}
          <p
            className="voucher_Coupon-banner-title"
            title={voucherDetail.business_name}
          >
            {voucherDetail.business_name}
          </p>
          <div className="my-3 inner-banner">
            <img
              src={
                voucherDetail.bup_banner
                  ? voucherDetail.bup_banner
                  : defaultImage
              }
              alt="Business store image"
            />
          </div>
          <Row className="pt-2">
            <Col md="6" className="vou-content">
              <Image
                loading="lazy"
                src={
                  voucherDetail.voucher_image
                    ? voucherDetail.voucher_image
                    : DefaultImg
                }
                width="100%"
                className="border-rad10"
              ></Image>
              <div className="tag-main">
                {/* ask */}
                <p className="ribben">{voucherDetail.flag}</p>
              </div>
              <Row className="voucher_Coupon_Details">
                <div className="vou-about mt-4 mt-3" style={{ color: "black" }}>
                  <span className="vou-about-title">
                    About {voucherDetail.business_name} :{" "}
                  </span>{" "}
                  {voucherDetail?.about_business === "" ? (
                    <>-</>
                  ) : (
                    <FroalaCustomViewer
                      content={voucherDetail?.about_business}
                      section="business"
                    />
                  )}
                </div>

                <p
                  className="vou-about mb-2 mt-2 bus_Hours"
                  style={{ color: "black" }}
                >
                  <span className="vou-about-title">Business Hours : </span>
                  <div className="business_Days">
                    <div className="business_Inner_Days">
                      <div className="showDays">
                        {voucherDetail.business_hours?.length > 0 ? (
                          <BusinessHours
                            business_hours={voucherDetail?.business_hours}
                            appointment_status={
                              voucherDetail?.appointment_status
                            }
                          />
                        ) : (
                          <p
                            style={{
                              color: "Black",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            No data available!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </p>
                <p className="vou-about mb-2" style={{ color: "black" }}>
                  <span className="vou-about-title">Address :</span>{" "}
                  <span style={{ fontSize: 15 }}>
                    &nbsp;{getAddressString(voucherDetail)}
                  </span>
                </p>
                <p className="vou-about mt-1 mb-2" style={{ color: "black" }}>
                  <span className="vou-about-title">Online :</span>
                  &nbsp;
                  {voucherDetail?.website_url === "None" ||
                  voucherDetail?.website_url === "" ? (
                    <p
                      className="NoDataAvailable-small"
                      style={{ color: "black" }}
                    >
                      No data available!
                    </p>
                  ) : (
                    <a
                      href={
                        voucherDetail?.website_url?.startsWith("http")
                          ? voucherDetail?.website_url
                          : `https://${voucherDetail?.website_url}`
                      }
                      target="_blank"
                    >
                      {voucherDetail?.website_url}
                    </a>
                  )}
                </p>
                <Link
                  className="contact-btn"
                  to={`/my-account/my-vouchers/contact-seller/${voucherDetail.business_id}/${voucherDetail.city_voucher_id}`}
                >
                  <p className="view">
                    <MdCall style={{ fill: "#E66100" }} /> Contact Seller
                  </p>
                </Link>
              </Row>
            </Col>
            <Col md="6 vou-details">
              <p className="vou-title mb-3">{voucherDetail.voucher_title}</p>
              <p className="available-until-text mb-2">
                Available Until :{" "}
                {voucherDetail?.voucher_avail_until_date == "" || null
                  ? ""
                  : DateFormatter(voucherDetail?.voucher_avail_until_date)}
              </p>
              <p className="vou-about mb-3">
                <span className="vou-about-title">About this deal :</span>

                {voucherDetail?.voucher_description === "" ? (
                  <>-</>
                ) : (
                  <FroalaCustomViewer
                    content={voucherDetail?.voucher_description}
                    section="product"
                  />
                )}
              </p>
              <p className="vou-about-title">Terms & Conditions : </p>
              {voucherDetail.voucher_term_condition &&
                voucherDetail.voucher_term_condition.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li style={{ color: "black" }}>{item}</li>
                    </ul>
                  );
                })}

              <div className="d-flex mb-4" style={{ flexWrap: "wrap" }}>
                <p
                  className="loc-price-1"
                  style={{
                    textDecoration: "line-through",
                    overflowWrap: "anywhere",
                    textAlign: "initial",
                  }}
                >
                  ${voucherDetail.voucher_actual_price}
                </p>
                <p
                  className="loc-price-2"
                  style={{
                    overflowWrap: "anywhere",
                    textAlign: "initial",
                  }}
                >
                  ${voucherDetail.voucher_offer_price}
                </p>
                <p className="loc-price-offer">
                  {voucherDetail.offered_percent}% off
                </p>
              </div>
              {voucherDetail.expire_days >= 0 ? (
                <>
                  <p className="vou-about-title">Expiry Date:</p>
                  <p style={{ color: "black" }}>
                    {DateFormatter(voucherDetail.voucher_end_date)}
                  </p>
                  {voucherDetail.expire_days == 0 ? (
                    <p className="not-expired" style={{ color: "black" }}>
                      Expires today
                    </p>
                  ) : (
                    <p className="not-expired" style={{ color: "black" }}>
                      Expires in {voucherDetail.expire_days}
                      &nbsp;{voucherDetail.expire_days == 1 ? "day" : "days"}
                    </p>
                  )}
                </>
              ) : (
                <p className="expired-class">Expired</p>
              )}

              {btnStatus == "buy-now" && (
                <Row className="download-buy-btn">
                  <Col md="6" className="text-center mb-2">
                    <Link to={`/explore/checkout/${businessId}/${voucherId}`}>
                      <p className="green-btn voucher-detail-redeem">Buy Now</p>
                    </Link>
                  </Col>
                  <Col md="6" className="text-center mb-2">
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover id="popover-positioned-top" title="Share to:">
                          <FacebookShareButton
                            url={`${shareUrl}`}
                            // quote={"Title or jo bhi aapko likhna ho"}
                            // hashtag={"#portfolio..."}
                          >
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>

                          <WhatsappShareButton
                            url={`${shareUrl}`}
                            // quote={"Title or jo bhi aapko likhna ho"}
                            // hashtag={"#portfolio..."}
                          >
                            <WhatsappIcon size={40} round={true} />
                          </WhatsappShareButton>
                        </Popover>
                      }
                    >
                      <button className="view-btn">Share this deal</button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              )}

              {btnStatus == "expired" && (
                <Row className="download-buy-btn">
                  <Col md="12" className="text-center mb-2">
                    <div className="inactive_Vouc_Coup">
                      <img src={inactive} />
                      <p>This voucher has expired</p>
                    </div>
                  </Col>
                </Row>
              )}
              {btnStatus == 0 && (
                <Row className="download-buy-btn">
                  <Col md="6" className="text-center mb-2">
                    <Link
                      to={`/my-account/my-vouchers/redeem-voucher/${voucherDetail.city_voucher_id?.toString()}/${
                        voucherDetail.recent_id
                      }`}
                    >
                      <p className="green-btn voucher-detail-redeem">
                        Redeem Now
                      </p>
                    </Link>
                  </Col>
                  <Col md="6" className="text-center mb-2">
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover id="popover-positioned-top" title="Share to:">
                          <FacebookShareButton
                            url={`${shareUrl}`}
                            // quote={"Title or jo bhi aapko likhna ho"}
                            // hashtag={"#portfolio..."}
                          >
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>

                          <WhatsappShareButton
                            url={`${shareUrl}`}
                            // quote={"Title or jo bhi aapko likhna ho"}
                            // hashtag={"#portfolio..."}
                          >
                            <WhatsappIcon size={40} round={true} />
                          </WhatsappShareButton>
                        </Popover>
                      }
                    >
                      <button className="view-btn">Share this deal</button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              )}

              {btnStatus == 1 && (
                <Row className="download-buy-btn">
                  <Col md="6" className="text-center mb-2">
                    <p className="view-btn redeemed">
                      <img loading="lazy" src={thumbsup1} />
                      Redeemed
                    </p>
                  </Col>
                  <Col md="6" className="text-center mb-2">
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      overlay={
                        <Popover id="popover-positioned-top" title="Share to:">
                          <FacebookShareButton
                            url={`${shareUrl}`}
                            // quote={"Title or jo bhi aapko likhna ho"}
                            // hashtag={"#portfolio..."}
                          >
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>

                          <WhatsappShareButton
                            url={`${shareUrl}`}
                            // quote={"Title or jo bhi aapko likhna ho"}
                            // hashtag={"#portfolio..."}
                          >
                            <WhatsappIcon size={40} round={true} />
                          </WhatsappShareButton>
                        </Popover>
                      }
                    >
                      <button className="view-btn">Share this deal</button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>

          {relatedDealsList.length != 0 && (
            <div className="my-5">
              <CarousalList
                heading={"Related Deals"}
                dealsList={relatedDealsList}
                count="4"
                id={voucherDetail.id}
                business_id={voucherDetail.business_id}
                status={voucherDetail.status}
                flag={voucherDetail.flag}
                setLoading={setLoading}
              />
            </div>
          )}

          {otherDealsList.length != 0 && (
            <div className="my-5 other-deals-main">
              <CarousalList
                heading={"Other Deals"}
                dealsList={otherDealsList}
                count="4"
                id={voucherDetail.id}
                business_id={voucherDetail.business_id}
                status={voucherDetail.status}
                flag={voucherDetail.flag}
                setLoading={setLoading}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VoucherDetails;
