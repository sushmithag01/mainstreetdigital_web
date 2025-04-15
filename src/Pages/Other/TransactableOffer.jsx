import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/sld-logo-black.svg";
import { toast } from "react-toastify";
import { TransactableOfferAPI } from "../../Services/Api/TransactableOffer/TransactableOffer";
//import axios from "axios";

export default function TransactableOffer() {
  useEffect(() => {
    getTransactableOffer();
  }, []);

  const getTransactableOffer = async () => {
    const data = {
      key: "",
    };
    const getTransactableOfferResponse = await TransactableOfferAPI(data);

    if (getTransactableOfferResponse.status === 200) {
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.success(getTransactableOfferResponse.message, {
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
      toast.dismiss();
      toast.clearWaitingQueue();
      toast.error(getTransactableOfferResponse.message, {
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

  return (
    <div className="container custom_sec">
      <section className="text-center trans_spac">
        <img loading="lazy" src={logo} width="140px" />
      </section>
      <section>
        <Row>
          <Col md="12" className="welcome_box">
            <h1 className="text-center welcome_sec">
              Welcome to Shop Local Digital Platform
            </h1>
            <div className="trans_para">
              <p>Thank you for purchasing the offer.</p>
              <p>
                Congratulations! You are one step closer to creating your
                hyper-local community marketplace.
              </p>
              <p>
                We will connect with you within 48 hours to schedule a call and
                plan the next steps to onboard you to create your own
                hyper-local community marketplace.
              </p>
              <p>
                In the meantime, if you would like to learn more about Shop
                Local Digital Platform you can find additional information at:
              </p>
            </div>
            <div className="transaction-buttons butt_spac">
              <Link to="https://meylah.com/shoplocaldigital/" target="_blank">
                <button className="purchase-more-button">
                  About Shop Local Digital
                </button>
              </Link>
              <Link
                to={`${process.env.REACT_APP_COMMON_URL}support`}
                target="_blank"
              >
                <button className="purchase-more-button">
                  Shop Local Digital Playbooks /Guides
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
}
