import React from "react";
import { Col, Image, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { MdShare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import thumbsup1 from "../../../../assets/thumbs-up1.png";
import voucher1 from "../../../../assets/vou-3.png";
import "../MyCoupons.css";

const RedeemedCoupons = ({ coupons }) => {
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
    <div>
      {coupons?.length > 0 ? (
        coupons?.filter((item) => item.product_redeem_status === 1)?.length >
        0 ? (
          coupons
            .filter((item) => item.product_redeem_status === 1)
            .map((item, i) => {
              return (
                <Row className="local-main" key={i}>
                  <Col md="2" className="local-1">
                    <Image
                      style={{ width: "202px", borderRadius: "10px" }}
                      src={item.product_image ? item.product_image : voucher1}
                    />
                  </Col>
                  <Col className="redeemed-coupon-detail">
                    <p className="vou-1 text-limit-1">{item.business_name}</p>
                    <p className="vou-2 text-limit-1">{item.category_name}</p>
                    <p className="vou-3 text-limit-2">{item.product_name}</p>
                    <p className="vou-4">
                      Downloaded date: <span>{item.purchase_date}</span>
                    </p>
                    <div className="mt-3 d-flex vou-btns">
                      {/* <Button variant="primary" className="view-btn successfully-redeemed redeemed">
                   <img loading="lazy" src={thumbsup1} />
                      Redeemed
                  </Button> */}
                    </div>
                    <div className="usedCouponBtns">
                      <div className="ViewCoup-button">
                        <p
                          className="ViewCoupbtn"
                          onClick={() =>
                            ViewDetailsHandler({
                              id: parseInt(item.end_user_product_id),
                              business_id: parseInt(item.business_id),
                              recent_id: item.recent_id,
                            })
                          }
                        >
                          View Coupon
                        </p>
                      </div>
                      <div className="redeembtn">
                        <p className="view-btn redeemed">
                          <img loading="lazy" src={thumbsup1} />
                          Redeemed
                        </p>
                      </div>
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
                        <button style={{ border: "none", background: "none" }}>
                          <MdShare
                            className="share-btn activeVou"
                            style={{ fill: "#E66100", fontSize: "25px" }}
                          />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </Col>
                  <Col>
                    {/* <Link className="view-main" to="/contactseller">
                      <p className="contact-seller coupon_voucher_Seller">
                        <MdCall className="seller-icon" />
                        Contact Seller
                      </p>
                    </Link> */}
                  </Col>
                  {item.expiration_date ? (
                    <p className="ribben expires-ribben">
                      Expires in {item.expire_days} days
                    </p>
                  ) : null}
                </Row>
              );
            })
        ) : (
          <div className="d-flex justify-content-center">
            <p className="NoDataAvailable" style={{ color: "black" }}>
              No coupons used!
            </p>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center">
          <p className="NoDataAvailable" style={{ color: "black" }}>
            No coupons used!
          </p>
        </div>
      )}
    </div>
  );
};

export default RedeemedCoupons;
