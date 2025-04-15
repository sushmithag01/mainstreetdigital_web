import copy from "copy-to-clipboard";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Image, Popover, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  MdCall,
  MdKeyboardArrowLeft,
  MdOutlineContentCopy,
} from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import BackArrow from "../../../Components/BackButton/BackArrow";
import BusinessHours from "../../../Components/BusinessHours";
import CarousalList from "../../../Components/CarousalCard/CarousalList";
import FroalaCustomViewer from "../../../Components/FroalaCustomViewer";
import Loader from "../../../Components/Loader/Loader";
import Navigation from "../../../Components/Navigation/Navigation";
import ShowCodeModal from "../../../Components/ShowCodeModal/ShowCodeModal";
import { CouponDetailsApi } from "../../../Services/Api/CouponDetailsApi";
import { DownloadCouponApi } from "../../../Services/Api/DownloadCouponApi";
import { NotificatonServiceApi } from "../../../Services/Api/NotificationService";
import { OtherDealsApi } from "../../../Services/Api/OtherDealsApi";
import { RelatedDealsApi } from "../../../Services/Api/RelatedDealsApi";
import { ShowCodeCountApi } from "../../../Services/Api/ShowCodeCountApi";
import { userId } from "../../../Utils/Auth/LocalStorage";
import ErrorText from "../../../Utils/Messages/ErrorMessages";
import { ErrorToast, SuccessToast } from "../../../Utils/Messages/Toasters";
import { getAddressString } from "../../../Utils/Validations/AddressFormatter";
import DateFormatter from "../../../Utils/Validations/DateFormatter";
import defaultImage from "../../../assets/Cover Default Image.png";
import DefaultImg from "../../../assets/DefaultImg.svg";
import Warning from "../../../assets/Warning.svg";
import inactive from "../../../assets/inactive_End_User.svg";
import thumbsup1 from "../../../assets/thumbs-up1.png";

const CouponDetails = () => {
  const userid = userId();
  const navigate = useNavigate();
  const location = useLocation();
  const parameter = useParams();
  const couponId = parseInt(parameter?.id);
  const businessId = parseInt(parameter?.business_id);
  const [mmsCityId, setMmsCityId] = useState(0);
  const [windowHistory, setWindowHistory] = useState("");
  const [couponDetail, setcouponDetail] = useState([]);
  const [otherDealsList, setOtherDealsList] = useState([]);
  const [relatedDealsList, setRelatedDealsList] = useState([]);
  const [btnStatus, setBtnStatus] = useState("");

  const [showcode, setShowcode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState({
    CityId: "",
    RecentID: "",
  });

  const shareUrl = couponDetail?.coupon_share_url
    ? couponDetail?.coupon_share_url
    : "";

  useEffect(() => {
    const cityID = localStorage.getItem("city_id");
    const redirectHistory = localStorage.getItem("path");
    const defaultMarketplaceObj = localStorage.getItem("user");
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
      getCouponDetails();
      getOtherDealsDetails();
      getRelatedDealsDetails();
    }
  }, [mmsCityId, couponId]);

  const getCouponDetails = async () => {
    setLoading(true);
    const RecentId = location?.state?.recent_Id || null;

    const path = window.location.href;
    const endPath = path.split("/");

    const payload_inital = {
      eu_id: userid.toString(),
      coupon_id: couponId,
    };
    const payload_redeem = {
      eu_id: userid.toString(),
      coupon_id: couponId,
      recent_id: RecentId,
    };

    const Response = await CouponDetailsApi(
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
        setcouponDetail(Response.res[0]);

        if (endPath[3] == "explore") {
          if (Response.res[0].expire_days < 0) {
            setBtnStatus("expired");
          } else {
            setBtnStatus("download");
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

  // Show code handler fuction
  const ShowCodeHandler = async (i, Cid, recentID) => {
    const data = {
      user_id: parseInt(userid),
      coupon_id: Cid,
      recent_id: recentID,
    };
    setBtnLoading(true);
    const Response = await ShowCodeCountApi(data, () => {
      navigate("/");
    });

    if (Response === false) {
      ErrorToast(ErrorText.InternalError);
      setShowcode(false);
      setBtnLoading(false);
    } else {
      if (Response.success === true) {
        SuccessToast(Response.message);
        setShowcode(true);
        setModalShow(false);
        setBtnLoading(false);
      } else if (Response.status === 429) {
        setLoading(true);
        ErrorToast(Response.message);
      } else {
        ErrorToast(Response.message);
        setShowcode(false);
        setBtnLoading(false);
      }
    }
  };

  const copyHandler = (code) => {
    if (code !== null) {
      copy(code);
      SuccessToast(`Copied "${code}"`);
      setShowcode(true);
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
        ErrorToast(Response.message);
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
      product_id: couponId,
      product_flag: "Coupon",
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
        ErrorToast(Response.message);
        setLoading(false);
      }
    }
  };

  const handleDownloadCoupon = async (e) => {
    e.preventDefault();
    const payload = {
      user_id: parseInt(userid),
      coupon_id: couponId,
      business_id: businessId,
      city_id: mmsCityId,
    };

    const firebasedata = {
      body:
        "Your coupon from " +
        couponDetail.business_name +
        " is downloaded. Redeem before " +
        Moment(couponDetail.coupon_end_date).format(" DD-MM-YYYY") +
        ".",
      title: "Coupon from " + couponDetail.business_name,
    };

    setLoading(true);
    const downloadCoupon = await DownloadCouponApi(payload, () => {
      navigate("/");
    });

    if (downloadCoupon === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (downloadCoupon.success === true) {
        const sendnotification = await NotificatonServiceApi(
          firebasedata,
          () => {
            navigate("/");
          }
        );
        SuccessToast(downloadCoupon.message);
        navigate("/my-account/my-coupons?tab=available");
        setLoading(false);
      } else if (downloadCoupon.status === 429) {
        ErrorToast(downloadCoupon.message);
        setLoading(true);
      } else {
        ErrorToast(downloadCoupon.message);
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
        <div className="main-content pt-4 pr-3 pb-4">
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
            title={couponDetail.business_name}
          >
            {couponDetail.business_name}
          </p>
          <div className="my-3 inner-banner">
            <img
              src={
                couponDetail.bup_banner ? couponDetail.bup_banner : defaultImage
              }
              alt="Business store image"
            />
          </div>
          <Row className="pt-2">
            <Col md="6" className="vou-content">
              <Image
                loading="lazy"
                src={
                  couponDetail.coupon_image
                    ? couponDetail.coupon_image
                    : DefaultImg
                }
                width="100%"
                className="border-rad10"
              ></Image>
              <div className="tag-main">
                <p className="ribben">{couponDetail?.flag}</p>
              </div>
              <Row className="voucher_Coupon_Details">
                <div className="vou-about mt-4" style={{ color: "black" }}>
                  <span className="vou-about-title">
                    About {couponDetail?.business_name} :{" "}
                  </span>{" "}
                  {couponDetail?.about_business === "" ? (
                    <>-</>
                  ) : (
                    <FroalaCustomViewer
                      content={couponDetail?.about_business}
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
                        {couponDetail &&
                        couponDetail.business_hours?.length > 0 ? (
                          <BusinessHours
                            business_hours={couponDetail?.business_hours}
                            appointment_status={
                              couponDetail?.appointment_status
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
                  <span className="vou-about-title">Address :</span>
                  <span style={{ fontSize: 15 }}>
                    &nbsp;{getAddressString(couponDetail)}
                  </span>
                </p>

                <p className="vou-about mt-1 mb-2" style={{ color: "black" }}>
                  <span className="vou-about-title">Online :</span>
                  &nbsp;
                  {couponDetail?.website_url === "None" ||
                  couponDetail?.website_url === "" ? (
                    <p
                      className="NoDataAvailable-small"
                      style={{ color: "black" }}
                    >
                      No data available!
                    </p>
                  ) : (
                    <a
                      href={
                        couponDetail?.website_url?.startsWith("http")
                          ? couponDetail?.website_url
                          : `https://${couponDetail?.website_url}`
                      }
                      target="_blank"
                    >
                      {couponDetail?.website_url}
                    </a>
                  )}
                </p>

                <Link
                  className="contact-btn"
                  to={`/my-account/my-coupons/contact-seller/${couponDetail?.business_id}/${couponDetail?.city_coupon_id}`}
                >
                  <p className="view">
                    <MdCall /> Contact Seller
                  </p>
                </Link>
              </Row>
            </Col>
            <Col md="6">
              <p className="vou-title mb-3">{couponDetail.coupon_title}</p>
              <p className="available-until-text mb-2">
                Available Until :{" "}
                {couponDetail?.coupon_avail_until_date == "" || null
                  ? ""
                  : DateFormatter(couponDetail?.coupon_avail_until_date)}
              </p>
              <p className="vou-about mb-3">
                <span className="vou-about-title">About this deal :</span>
                {couponDetail.coupon_description === "" ? (
                  <>
                    <p>-</p>
                  </>
                ) : (
                  <FroalaCustomViewer
                    content={couponDetail.coupon_description}
                    section="product"
                  />
                )}
              </p>
              <p className="vou-about-title">Terms & Conditions : </p>
              <ul>
                {couponDetail.coupon_term_condition &&
                  couponDetail.coupon_term_condition.map((item, i) => {
                    return (
                      <ul key={i}>
                        <li style={{ color: "black" }}>{item}</li>
                      </ul>
                    );
                  })}
              </ul>
              {couponDetail.coupon_exp_date >= 0 ? (
                <>
                  <p className="vou-about-title">Expiry Date:</p>
                  <p style={{ color: "black" }}>
                    {DateFormatter(couponDetail.coupon_end_date)}
                  </p>
                  {couponDetail.coupon_exp_date == 0 ? (
                    <p className="not-expired" style={{ color: "black" }}>
                      Expires today
                    </p>
                  ) : (
                    <p className="not-expired" style={{ color: "black" }}>
                      Expires in {couponDetail.coupon_exp_date}
                      &nbsp;{couponDetail.coupon_exp_date == 1 ? "day" : "days"}
                    </p>
                  )}
                </>
              ) : (
                <p className="expired-class">Expired</p>
              )}

              {btnStatus == "download" && (
                <Row className="download-buy-btn">
                  <Col md="6" className="text-center mb-2">
                    <Link onClick={handleDownloadCoupon}>
                      <p className="green-btn voucher-detail-redeem">
                        Download
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

              {btnStatus == "expired" && (
                <Row className="download-buy-btn">
                  <Col md="12" className="text-center mb-2">
                    <div className="inactive_Vouc_Coup">
                      <img src={inactive} />
                      <p>This coupon has expired</p>
                    </div>
                  </Col>
                </Row>
              )}
              {btnStatus == 0 && (
                <Row className="download-buy-btn">
                  <Col md="6" className="text-center mb-2">
                    {!showcode ? (
                      <Button
                        type="submit"
                        className="green-btn imgwidth-100"
                        onClick={() => {
                          setModalShow(true);
                          setShowCredentials((ps) => {
                            return {
                              ...ps,
                              CityId: couponDetail.city_coupon_id,
                              RecentID: couponDetail.recent_id,
                            };
                          });
                        }}
                      >
                        Show code
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        className="view-btn text-left imgwidth-100 py-2"
                        onClick={() => setShowcode(true)}
                      >
                        {couponDetail.coupon_code} {""}
                        <Button
                          className="copy-btn"
                          onClick={() => {
                            copyHandler(couponDetail.coupon_code);
                          }}
                        >
                          <MdOutlineContentCopy />
                        </Button>
                      </Button>
                    )}
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
                          <FacebookShareButton url={`${shareUrl}`}>
                            <FacebookIcon size={40} round={true} />
                          </FacebookShareButton>

                          <WhatsappShareButton url={`${shareUrl}`}>
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

          {relatedDealsList.length > 0 && (
            <div className="my-5">
              <CarousalList
                heading={"Related Deals"}
                dealsList={relatedDealsList}
                count="4"
                id={couponDetail.id}
                business_id={couponDetail.business_id}
                status={couponDetail.status}
                flag={couponDetail.flag}
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
                id={couponDetail.id}
                business_id={couponDetail.business_id}
                status={couponDetail.status}
                flag={couponDetail.flag}
                setLoading={setLoading}
              />
            </div>
          )}
        </div>
      </div>
      <ShowCodeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        image={Warning}
        cityId={showCredentials.CityId}
        recentId={showCredentials.RecentID}
        btnloading={btnLoading}
        AcknowledgeFuc={ShowCodeHandler}
        description="Are you sure you want to redeem the coupon?"
        firstbutton="No"
        secondbutton="Yes"
      />
    </>
  );
};

export default CouponDetails;
