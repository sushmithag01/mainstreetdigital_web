import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, useParams } from "react-router-dom";
import DefaultImg from "../../assets/DefaultImg.svg";
import flags from "../../assets/vou flag.png";
import BackArrow from "../../Components/BackButton/BackArrow";
import Loader from "../../Components/Loader/Loader";
import Navigation from "../../Components/Navigation/Navigation";
import StripeModal from "../../Components/StripeModal/StripeModal";
import { CheckoutOverviewApi } from "../../Services/Api/CheckoutOverviewApi";
import { userId } from "../../Utils/Auth/LocalStorage";
import ErrorText from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import "./CheckOutPage.css";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const parameter = useParams();
  const UserId = userId();

  const voucherId = parseInt(parameter.id);

  const [mmsCityId, setMmsCityId] = useState(null);
  const [voucherDetail, setVoucherDetail] = useState([]);
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

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

  useEffect(() => {
    if (mmsCityId !== null) {
      getVoucherDetails();
    }
  }, [mmsCityId]);

  const getVoucherDetails = async () => {
    const data = {
      voucher_id: voucherId,
      mms_city_id: mmsCityId,
      user_id: UserId,
    };
    setLoading(true);
    const Response = await CheckoutOverviewApi(data, () => {
      navigate("/");
    });
    if (Response === false) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
    } else {
      if (Response.stauts == 200) {
        setVoucherDetail(Response.data[0]);
        setLoading(false);
      } else if (Response.status === 429) {
        setLoading(true);
        ErrorToast(Response.message);
      } else {
        ErrorToast(Response.message);
        setLoading(false);
      }
    }
  };

  function handleCheckboxChange(e) {
    let val = e.target.checked;
    setTermsChecked(val);
  }

  const checkoutHandler = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <>
      {loading === true ? <Loader /> : ""}
      <div className="CheckOutPage">
        <div className="checkoutNav">
          <div className="navbar-section p-0">
            <Navigation />
          </div>
        </div>
        <div className="checkoutDetails">
          <div className="checkout-sub">
            <p className="page-text dashboard backCheckout">
              <BackArrow />
            </p>
            <div className="Checkoutpagedetails mt-4">
              <div className="checkoutOne">
                <h2>Checkout (1 Item)</h2>
                <p>
                  Please accept the Terms & Conditions before placing the order.
                </p>
              </div>
              <div className="methods-summary">
                <div className="order-summary-main">
                  <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-voucher">
                      <img loading="lazy" className="vou-flag" src={flags} />
                      <img
                        loading="lazy"
                        src={
                          voucherDetail?.voucher_image
                            ? voucherDetail?.voucher_image
                            : DefaultImg
                        }
                        className="checkoutImage"
                      />
                      <div className="summary-vou-details">
                        <p>
                          {voucherDetail?.category_id
                            ? voucherDetail?.category_id
                            : ""}
                        </p>
                        <h3>
                          {voucherDetail?.voucher_name
                            ? voucherDetail?.voucher_name
                            : ""}
                        </h3>
                        <h5>
                          by{" "}
                          {voucherDetail?.business_name
                            ? voucherDetail?.business_name
                            : ""}
                        </h5>
                        <div className="summary-money">
                          <p>
                            $
                            {voucherDetail?.voucher_actual_price
                              ? voucherDetail?.voucher_actual_price
                              : 0}
                          </p>
                          <h3>
                            $
                            {voucherDetail?.voucher_offer_price
                              ? voucherDetail?.voucher_offer_price
                              : 0}
                          </h3>
                          <h5>
                            You save $
                            {voucherDetail?.voucher_discount
                              ? voucherDetail?.voucher_discount
                              : 0}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-summary-amount">
                    <div className="total-checkout">
                      <p>Order Total :</p>
                      <h3>
                        ${voucherDetail.subtotal ? voucherDetail.subtotal : ""}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="checkout-TC">
                <div className="TC-box-checkout">
                  <Form.Check
                    className="TC-checkbox checkout"
                    onChange={handleCheckboxChange}
                    checked={termsChecked}
                    type="checkbox"
                    label={
                      <>
                        I accept the{" "}
                        <a href="" className="T-C-checkout">
                          Terms & Conditions
                        </a>
                      </>
                    }
                  />
                  {/* <p className={termsChecked === true ? "nonalertTerms" : "alertTerms" }>Please accept the Terms & Conditions</p> */}
                  {/* <p className="nonalert">{err_Display}</p> */}
                </div>
                <div className="checkout-TC-details">
                  <h3>Terms & Conditions: </h3>
                  <ul>
                    {voucherDetail?.voucher_term_condition?.length > 0 ? (
                      voucherDetail.voucher_term_condition.map((tc, i) => {
                        return <li key={i}>{tc}</li>;
                      })
                    ) : (
                      <li>No data Available!</li>
                    )}
                  </ul>
                </div>
              </div>
              <form>
                <div className="text-center small-btns d-flex cancel-placeOrder">
                  <Link to={-1}>
                    <p className="view cancel-checkout">Cancel</p>
                  </Link>
                  <button
                    className={
                      termsChecked === true ? "pay_Checkout" : "not_Checked_TC"
                    }
                    onClick={(e) =>
                      termsChecked === true
                        ? checkoutHandler(e)
                        : e.preventDefault()
                    }
                  >
                    Proceed to pay
                  </button>
                  {/* <button
                  type="submit"
                  // disabled={!termsChecked}
                  variant="primary"
                  className="checkout-place-order"
                >
                  Place Order
                </button> */}
                  {/* <AuthorizePayment
                  checkflag={termsChecked}
                  amount={voucherDetail.subtotal ? voucherDetail.subtotal : ""}
                  productId={
                    voucherDetail.city_voucher_id
                      ? voucherDetail.city_voucher_id
                      : ""
                  }
                  cityId={
                    voucherDetail.mms_city_id ? voucherDetail.mms_city_id : ""
                  }
                  buId={
                    voucherDetail.business_id ? voucherDetail.business_id : ""
                  }
                  userId={UserId ? UserId : ""}
                  email={Email ? Email : ""}
                  SetLoading={setLoading}
                /> */}
                </div>
              </form>
            </div>
            <StripeModal
              SetLoading={setLoading}
              show={modalShow}
              setModalShow={setModalShow}
              onHide={() => setModalShow(false)}
              voucherDetail={voucherDetail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
