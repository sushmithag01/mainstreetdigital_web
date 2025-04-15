import React from "react";
import { Col, Image, Popover, Row } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdShare } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import thumbsup1 from "../../../../assets/thumbs-up1.png";
import voucher from "../../../../assets/vou-1.png";

const RedeemedVouchers = (props) => {
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
      {vouchers?.length > 0 ? (
        vouchers.filter((item) => item.product_redeem_status === 1).length >
        0 ? (
          vouchers
            .filter((item) => item.product_redeem_status === 1)
            .map((item) => {
              return (
                <div>
                  {item.expires_date ? (
                    <p className="redeemed-date">{item.expires_date}</p>
                  ) : null}
                  <Row key={item.product_id} className="local-main">
                    <Col md="2" className="local-1">
                      <Image
                        style={{ width: "202px", borderRadius: "10px" }}
                        src={item.product_image ? item.product_image : voucher}
                      />
                    </Col>
                    <Col className="redeemed-voucher-detail">
                      <p className="vou-1 redeemed-name text-limit-1">
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
                      <div className="mt-2 d-flex vou-btns">
                        <a
                          variant="primary"
                          type="submit"
                          className="green-btn redeemed-view-voucher"
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
                  </Row>
                </div>
              );
            })
        ) : (
          <div className="d-flex justify-content-center">
            <p className="NoDataAvailable" style={{ color: "black" }}>
              No redeemed vouchers!
            </p>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center">
          <p className="NoDataAvailable" style={{ color: "black" }}>
            No redeemed vouchers!
          </p>
        </div>
      )}
    </>
  );
};

export default RedeemedVouchers;
