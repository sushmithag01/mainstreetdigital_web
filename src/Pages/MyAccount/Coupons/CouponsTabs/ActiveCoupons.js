import copy from "copy-to-clipboard";
import React, { useState } from "react";
import { Button, Col, Image, Popover, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdCall, MdOutlineContentCopy, MdShare } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import ShowCodeModal from "../../../../Components/ShowCodeModal/ShowCodeModal";
import { ShowCodeCountApi } from "../../../../Services/Api/ShowCodeCountApi";
import { userId } from "../../../../Utils/Auth/LocalStorage";
import { SuccessToast } from "../../../../Utils/Messages/Toasters";
import Warning from "../../../../assets/Warning.svg";
import voucher1 from "../../../../assets/vou-3.png";
import "../MyCoupons.css";

const ActiveCoupons = ({ coupons }) => {
  const userID = userId();
  const [showcode, setShowcode] = useState(false);
  const [ItemIndex, setItemIndex] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState({
    CityId: "",
    RecentID: "",
  });

  const ShowCodeHandler = async (i, Cid, recentID) => {
    if (i === parseInt(ItemIndex)) {
      const data = {
        user_id: parseInt(userID),
        coupon_id: Cid,
        recent_id: recentID,
      };
      setBtnLoading(true);
      const ShowCodeCount = await ShowCodeCountApi(data, () => {
        navigate("/");
      });

      if (ShowCodeCount === false) {
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
        setShowcode(false);
        setBtnLoading(false);
      } else {
        if (ShowCodeCount.success === true) {
          toast.success(ShowCodeCount.message, {
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
          setShowcode(true);
          setModalShow(false);
          setBtnLoading(false);
        } else if (ShowCodeCount.status === 429) {
          setShowcode(true);
          setModalShow(false);
          setBtnLoading(false);
          toast.error(ShowCodeCount.message, {
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
        } else {
          toast.error(ShowCodeCount.message, {
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
          setShowcode(false);
          setBtnLoading(false);
        }
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
  const navigate = useNavigate();

  const ViewDetailsHandler = (data) => {
    navigate(
      `/my-account/my-coupons/coupon-detail/${data.business_id}/${data.id}`,
      {
        state: {
          recent_Id: data.recent_id,
        },
      }
    );
  };

  return (
    <>
      <div>
        {coupons?.length > 0 ? (
          coupons?.filter(
            (item) => item.product_redeem_status === 0 && item.expire_days >= 0
          ).length > 0 ? (
            coupons
              .filter(
                (item) =>
                  item.product_redeem_status === 0 && item.expire_days >= 0
              )
              .map((item, index) => {
                return (
                  <Row className="local-main" key={index}>
                    <Col md="2" className="local-1">
                      <Image
                        style={{ width: "202px", borderRadius: "10px" }}
                        src={item.product_image ? item.product_image : voucher1}
                      />
                    </Col>
                    <Col className="active-coupon-detail">
                      <p className="vou-1 text-limit-1">{item.business_name}</p>
                      <p className="vou-2 text-limit-1">{item.category_name}</p>
                      <p className="vou-3 text-limit-2">{item.product_name}</p>
                      <p className="vou-4">
                        Downloaded date: <span>{item.purchase_date}</span>
                      </p>
                      <div className="mt-3 d-flex vou-btns">
                        {ItemIndex === index && showcode === true ? (
                          <Button
                            variant="primary"
                            type="submit"
                            className="view-btn text-left imgwidth-100 py-2"
                            onClick={() => setShowcode(true)}
                          >
                            {item.product_code}
                            <Button
                              className="copy-btn"
                              onClick={() => {
                                copyHandler(item?.product_code);
                              }}
                            >
                              <MdOutlineContentCopy />
                            </Button>
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            type="submit"
                            className="green-btn show-code"
                            onClick={() => {
                              setModalShow(true);
                              setItemIndex(index);
                              setShowCredentials((ps) => {
                                return {
                                  ...ps,
                                  CityId: item.city_product_id,
                                  RecentID: item.recent_id,
                                };
                              });
                            }}
                          >
                            Show code {""}
                          </Button>
                        )}

                        <a
                          variant="primary"
                          type="submit"
                          className="view-btn show-code"
                          onClick={() =>
                            ViewDetailsHandler({
                              id: parseInt(item.end_user_product_id),
                              business_id: parseInt(item.business_id),
                              recent_id: item.recent_id,
                            })
                          }
                        >
                          View Coupon
                        </a>
                        <OverlayTrigger
                          // show={true}
                          trigger="click"
                          placement="top"
                          rootClose
                          overlay={
                            <Popover
                              id="popover-positioned-top"
                              title="Share to:"
                              className="popover"
                            >
                              <FacebookShareButton
                                url={item.coupon_share_url}
                                quote={"Title or jo bhi aapko likhna ho"}
                                hashtag={"#portfolio..."}
                              >
                                <FacebookIcon size={40} round={true} />
                              </FacebookShareButton>

                              <WhatsappShareButton
                                url={item.coupon_share_url}
                                quote={"Title or jo bhi aapko likhna ho"}
                                hashtag={"#portfolio..."}
                              >
                                <WhatsappIcon size={40} round={true} />
                              </WhatsappShareButton>
                            </Popover>
                          }
                        >
                          <button
                            style={{ border: "none", background: "none" }}
                          >
                            <MdShare
                              className="share-btn activeVou"
                              style={{ fill: "#E66100", fontSize: "25px" }}
                            />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </Col>
                    <Col>
                      <Link
                        className="view-main"
                        to={`/my-account/my-coupons/contact-seller/${item.business_id.toString()}/${item.end_user_product_id.toString()}`}
                      >
                        <p className="contact-seller coupon_voucher_Seller">
                          <MdCall className="seller-icon" />
                          Contact Seller
                        </p>
                      </Link>
                    </Col>
                    {item.expire_days < 0 ? null : item.expire_days === 0 ? (
                      <p className="ribben expires-ribben">Expires today!</p>
                    ) : (
                      <p className="ribben expires-ribben">
                        Expires in {item.expire_days}{" "}
                        {item.expire_days > 1 ? "days" : "day"}
                      </p>
                    )}
                  </Row>
                );
              })
          ) : (
            <div className="d-flex justify-content-center">
              <p className="NoDataAvailable" style={{ color: "black" }}>
                No available coupons!
              </p>
            </div>
          )
        ) : (
          <div className="d-flex justify-content-center">
            <p className="NoDataAvailable" style={{ color: "black" }}>
              No available coupons!
            </p>
          </div>
        )}
      </div>
      <ShowCodeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        image={Warning}
        index={ItemIndex}
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
export default ActiveCoupons;
