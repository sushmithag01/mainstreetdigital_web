import React from "react";
import { Col, Image, Popover, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdCall, MdShare } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import voucher from "../../../../assets/vou-1.png";

const ActiveVouchers = (props) => {
  const vouchers = props.vouchers;

  const navigate = useNavigate();

  const ViewDetailsHandler = (data) => {
    navigate(
      `/my-account/my-vouchers/voucher-detail/${data.business_id}/${data.id}`,
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
        {props.vouchers?.length > 0 ? (
          vouchers.filter(
            (item) => item.expire_days >= 0 && item.product_redeem_status === 0
          ).length > 0 ? (
            vouchers
              .filter(
                (item) =>
                  item.expire_days >= 0 && item.product_redeem_status === 0
              )
              .map((item) => {
                return (
                  <Row className="local-main activeVouchers" key={item.euvi_id}>
                    <Col md="2" className="local-1">
                      <Image
                        style={{ width: "250px", borderRadius: "10px" }}
                        src={item.product_image ? item.product_image : voucher}
                      />
                    </Col>
                    <Col className="active-voucher-cards">
                      <p
                        className="vou-1 text-limit-1"
                        title={item.business_name}
                      >
                        {item.business_name}
                      </p>
                      <div className="vou-2">
                        <p className="vou-2">Voucher ID: {item.product_code}</p>
                        |
                        <p className="vou-2">
                          Transaction ID : {item.transaction_id}
                        </p>
                      </div>
                      <p className="vou-3 text-limit-2">{item.product_name}</p>
                      <div className="flex-wrap">
                        <p className="vou-4">
                          Purchased Price : ${item.voucher_offer_price} |&nbsp;
                        </p>
                        <p className="vou-4">
                          Purchased Date:
                          {" " + item.purchase_date}
                        </p>
                      </div>
                      <div className="mt-3 d-flex vou-btns redeem-view">
                        <Link
                          variant="primary"
                          type="submit"
                          className="green-btn active-voucher-redeem"
                          to={`/my-account/my-vouchers/redeem-voucher/${item.city_product_id.toString()}/${
                            item.recent_id
                          }`}
                          onClick={() =>
                            localStorage.setItem(
                              "businessName",
                              item.business_name
                            )
                          }
                        >
                          Redeem Now
                        </Link>
                        <a
                          variant="primary"
                          type="submit"
                          className="view-btn"
                          onClick={() =>
                            ViewDetailsHandler({
                              id: parseInt(item.end_user_product_id),
                              business_id: parseInt(item.business_id),
                              recent_id: item.recent_id,
                            })
                          }
                        >
                          View Voucher
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
                                url={item.voucher_share_url}
                                quote={"Title or jo bhi aapko likhna ho"}
                                hashtag={"#portfolio..."}
                              >
                                <FacebookIcon size={40} round={true} />
                              </FacebookShareButton>

                              <WhatsappShareButton
                                url={item.voucher_share_url}
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
                              style={{ fill: "#E66100" }}
                            />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </Col>
                    <Col>
                      <Link
                        className="view-main"
                        to={`/my-account/my-vouchers/contact-seller/${item.business_id.toString()}/${item.end_user_product_id.toString()}`}
                        state={{
                          id: item.product_id.toString(),
                          flag: "Voucher",
                          backflag: "Myvouchers",
                        }}
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
                No active vouchers!
              </p>
            </div>
          )
        ) : (
          <div className="d-flex justify-content-center">
            <p className="NoDataAvailable" style={{ color: "black" }}>
              No active vouchers!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ActiveVouchers;
