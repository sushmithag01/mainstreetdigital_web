import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import BackArrow from "../../Components/BackButton/BackArrow";
import ErrorLabel from "../../Components/ErrorLabel/ErrorLabel";
import Loader from "../../Components/Loader/Loader";
import { db } from "../../Firebase";
import { CouponDetailsApi } from "../../Services/Api/CouponDetailsApi";
import { InsertChatApi } from "../../Services/Api/InsertChat";
import { VoucherDetailsApi } from "../../Services/Api/VoucherDetailsApi";
import Navigation from "../../Components/Navigation/Navigation";
import { userId, userName } from "../../Utils/Auth/LocalStorage";

const ContactSeller = () => {
  const get_uuid = uuidv4();
  const parameter = useParams();
  const id = parseInt(parameter.id);
  const flag = parameter.pageName;
  const bu_id = parameter.business_id;
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [NeedHelpVal, setNeedHelp] = useState("");
  const [MessageVal, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const user_id = userId();
  const user_name = userName();

  var community_id = "msd_" + user_id + "_" + flag + "_" + id;
  var com_id = community_id;

  const handleApi = () => {
    if (flag === "my-vouchers") {
      const data = {
        voucherId: id,
        eu_id: user_id,
      };
      VoucherHandler(data);
    } else {
      const data = {
        coupon_id: id,
        eu_id: user_id,
      };
      CouponsHandler(data);
    }
  };
  const VoucherHandler = async (data) => {
    setLoading(true);
    const activeData = await VoucherDetailsApi(data, () => {
      navigate("/");
    });
    setLoading(false);
    if (activeData.status === 200) {
      setApiData(activeData.res[0]);
    } else if (activeData.status === 429) {
      setLoading(true);
      toast.error(activeData.message, {
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
    }
  };
  const CouponsHandler = async (data) => {
    setLoading(true);
    const activecoupons = await CouponDetailsApi(data, () => {
      navigate("/");
    });
    setLoading(false);
    if (activecoupons.status === 200) {
      setApiData(activecoupons.res[0]);
    } else if (activecoupons.status === 429) {
      setLoading(true);
      toast.error(activecoupons.message, {
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
    }
  };
  useEffect(() => {
    handleApi();
  }, []);

  const sendMessage = async () => {
    if (!MessageVal) {
      setErrorMessage("Please Enter Some Message!");
    } else {
      try {
        if (user_id) {
          await addDoc(collection(db, com_id), {
            _id: get_uuid,
            text: MessageVal,
            createdAt: new Date(),
            user: {
              _id: user_id,
              name: user_name,
            },
          });
        }
        if (flag === "my-vouchers") {
          const data_product_type = 1;
          let messageData = {
            bu_id: bu_id,
            channel_id: com_id,
            product_id: id,
            help_reason: MessageVal,
            product_type: data_product_type,
          };
          InsertChattoDB(messageData);
        } else {
          const data_product_type = 2;
          let messageData = {
            bu_id: bu_id,
            channel_id: com_id,
            product_id: id,
            help_reason: MessageVal,
            product_type: data_product_type,
          };
          InsertChattoDB(messageData);
        }

        // navigate(`/messages/${com_id.toString()}`)
        // navigate(`/messages`);
      } catch (error) {
        console.log("chat", error);
      }
      setMessage("");
    }
  };
  const InsertChattoDB = async (messageData) => {
    setLoading(true);
    const MessageData = await InsertChatApi(messageData, () => {
      navigate("/");
    });

    if (MessageData.status == 200) {
      navigate(`/messages/${com_id.toString()}`, {
        state: {
          productName: apiData.product_name,
          businessName: apiData.business_name,
          product_id: id,
          bu_id: bu_id,
          pageName: parameter.pageName,
          productImage: apiData.voucher_image
            ? apiData.voucher_image
            : apiData.coupon_image,
        },
      });
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="gray-bg">
        <div className="navbar-section p-0">
          <Navigation />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard">
            <BackArrow />
          </p>
          <p className="page-maintitle">Contact Seller</p>
          <div className="white-bg mt-4 py-5 ContactSeller">
            <Row>
              <Col md="2"></Col>
              <Col md="8">
                <p className="mb-3" style={{ color: "black" }}>
                  Contact Seller : <b>{apiData.business_name}</b>
                </p>
                <p className="" style={{ color: "black" }}>
                  {apiData.flag} :{" "}
                  <b>
                    {apiData.flag === "voucher"
                      ? apiData.voucher_title
                      : apiData.coupon_title}
                  </b>
                </p>
                <div className="formmain mt-5 signin-row">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="form-label-custom">
                      Your Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      className="custom-textarea"
                      value={MessageVal}
                      onChange={(e) => setMessage(e.currentTarget.value)}
                      placeholder="Type here..."
                    />
                  </Form.Group>
                  <ErrorLabel ErrorDisplay={errorMessage} />
                  <div className="text-center small-btns d-flex contact_Buttons">
                    <Link to={-1}>
                      <p className="view">Cancel</p>
                    </Link>
                    {/* <Link
                      variant="primary"
                      type="submit"
                      className="green-btn mt-3"
                      to={`/messages/${id.toString()}/${flag}`}
                    >
                      Save
                    </Link> */}
                    <Button
                      variant="primary"
                      type="submit"
                      className="green-btn mt-3"
                      onClick={() => sendMessage()}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md="2"></Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSeller;
