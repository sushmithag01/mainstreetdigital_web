import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import voucher1 from "../../../../assets/vou-3.png";
import "../MyCoupons.css";

const ExpiredCoupons = ({ coupons }) => {
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
        coupons?.filter((item) => item.expire_days < 0).length > 0 ? (
          coupons
            ?.filter(
              (item) => item.expire_days < 0 && item.product_redeem_status === 0
            )
            .map((item, i) => {
              return (
                <Row className="local-main" key={i}>
                  <Col md="2" className="local-1">
                    <Image
                      style={{ width: "202px", borderRadius: "10px" }}
                      src={item.product_image ? item.product_image : voucher1}
                    />
                  </Col>
                  <Col className="expired-coupon-detail">
                    <p className="vou-1 text-limit-1">{item.business_name}</p>
                    <p className="vou-2 text-limit-1">{item.category_name}</p>
                    <p className="vou-3 text-limit-2">{item.product_name}</p>
                    <p className="vou-4">
                      Downloaded date: <span>{item.purchase_date}</span>
                    </p>
                    <div className="mt-3 d-flex vou-btns">
                      <Button
                        variant="primary"
                        className="view-btn successfully-redeemed viewCBtn"
                        onClick={() =>
                          ViewDetailsHandler({
                            id: parseInt(item.end_user_product_id),
                            business_id: parseInt(item.business_id),
                            recent_id: item.recent_id,
                          })
                        }
                      >
                        {" "}
                        View Coupon{" "}
                      </Button>
                      {/* <MdShare
                      className="share-btn"
                      style={{ fill: "#E66100" }}
                    /> */}
                    </div>
                  </Col>
                  <Col>
                    {/* <Link className="view-main" to="/contactseller">
                      <p className="contact-seller coupon_voucher_Seller exp_Seller">
                        <MdCall className="seller-icon" />
                        Contact Seller
                      </p>
                    </Link> */}
                  </Col>

                  {/* {item.expire_days <= 7 && item.expire_days >= 0 ? (
                null
              ) : <p className="ribben expires-ribben">
                  Expires in {item.expire_days} day
                </p>} */}
                </Row>
              );
            })
        ) : (
          <div className="d-flex justify-content-center">
            <p className="NoDataAvailable" style={{ color: "black" }}>
              No coupons expired!
            </p>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center">
          <p className="NoDataAvailable" style={{ color: "black" }}>
            No coupons expired!
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpiredCoupons;
