import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import voucher from "../../../../assets/vou-1.png";

const ExpiredVouchers = (props) => {
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
        vouchers.filter((item) => item.expire_days < 0).length > 0 ? (
          <>
            <p style={{ padding: "0 10px", marginBottom: "20px" }}>
              Although the voucher value has expired, the merchant shall honor
              the purchased price towards any purchase.
            </p>
            {vouchers
              .filter(
                (item) =>
                  item.expire_days < 0 && item.product_redeem_status === 0
              )
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
                          src={
                            item.product_image ? item.product_image : voucher
                          }
                        />
                      </Col>
                      <Col className="expired-voucher-detail">
                        <p className="vou-1 text-limit-1">
                          {item.business_name}
                        </p>
                        <div className="vou-2">
                          <p className="vou-2">
                            Voucher ID: {item.product_code}
                          </p>
                          |
                          <p className="vou-2">
                            Transaction ID : {item.transaction_id}
                          </p>
                        </div>
                        <p className="vou-3 text-limit-2">
                          {item.product_name}
                        </p>
                        <div className="flex-wrap">
                          <p className="vou-4">
                            Purchased Price : ${item.voucher_offer_price}{" "}
                            |&nbsp;
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
                            className="green-btn expired-view-voucher-btn"
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
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}
          </>
        ) : (
          <div className="d-flex justify-content-center">
            <p className="NoDataAvailable" style={{ color: "black" }}>
              No expired vouchers!
            </p>
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center">
          <p className="NoDataAvailable" style={{ color: "black" }}>
            No expired vouchers!
          </p>
        </div>
      )}
    </>
  );
};

export default ExpiredVouchers;
