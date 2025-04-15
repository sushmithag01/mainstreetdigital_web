import React, { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import { BusinessUserSupportData } from "../../Services/Api/SupportPageAPIs/BusinessUserSupportApi";
import logo from "../../assets/Black Shop local logo.svg";
import heroSection from "../../assets/hero-section-image.png";
import oval1 from "../../assets/Oval-1.png";
import oval2 from "../../assets/Oval-2.png";
import envelope from "../../assets/envelope-icon.svg";
import { Image } from "react-bootstrap";
import { CustomerSupportData } from "../../Services/Api/SupportPageAPIs/CustomerSupportApi";
import { MarketplaceSupportData } from "../../Services/Api/SupportPageAPIs/MarketplaceSupportApi";
import marketplaceBanner from "../../assets/Marketplace-Banners.png";
import businessBanner from "../../assets/business.png";
import couponVoucherGraphics from "../../assets/coupon-graphics.png";
import { Link } from "react-router-dom";

const SupportPage = () => {
  const [loading, setLoading] = useState(true);
  const [businessData, setBusinessData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [marketplaceData, setMarketplaceData] = useState([]);

  const BusinessUserDataApi = async () => {
    const BusinessUserRes = await BusinessUserSupportData();
    if (BusinessUserRes?.status) {
      setBusinessData(BusinessUserRes.data);
      setLoading(false);
    } else {
      setBusinessData([]);
      setLoading(false);
    }
  };
  const CustomerDataApi = async () => {
    const CustomerRes = await CustomerSupportData();
    if (CustomerRes?.status) {
      setCustomerData(CustomerRes.data);
      setLoading(false);
    } else {
      setCustomerData([]);
      setLoading(false);
    }
  };
  const MarketplaceDataApi = async () => {
    const MarketplaceRes = await MarketplaceSupportData();
    if (MarketplaceRes?.status) {
      setMarketplaceData(MarketplaceRes.data);
      setLoading(false);
    } else {
      setMarketplaceData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    BusinessUserDataApi();
    CustomerDataApi();
    MarketplaceDataApi();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="support-page">
      <div className="hero-section-wrapper px-2">
        <img className="oval1" src={oval1} alt="oval image" />
        <img className="oval2" src={oval2} alt="oval image" />
        <div className="max-width-container">
          <header>
            <a href="https://shoplocal.digital/">
              {" "}
              <img
                className="nav-logo"
                src={logo}
                alt="Shop Local Digital Logo"
                width={80}
                height={80}
              />
            </a>
            <a
              className="support-button"
              href="mailto:support@shoplocal.digital"
            >
              <img src={envelope} alt="envelope icon" />
              Contact Support
            </a>
          </header>
          <div className="hero-section">
            <div>
              <h1>Welcome to Shop Local Digital Support.</h1>
              <p>
                Welcome to Shop Local Digital Platform Support Page. You will
                find playbooks that will show you step by step instructions on
                managing your account and maximizing your outcomes.
              </p>
              <div className="mt-4">
                <Link
                  to="https://www.youtube.com/watch?v=h_OCp7nLrDw"
                  className="link-btns"
                  target="_blank"
                >
                  How it Works
                </Link>
              </div>
            </div>
            <div>
              <img
                src={heroSection}
                alt="Hero section image"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-width-container px-2">
        <h2>Downloadable Graphics</h2>
        <p className="mb-5">
          We have created downloadable graphics for your use to make it easy to
          create your own graphics for banners and your coupon/voucher offers.
          There are two versions, a Sample of how it could look with your
          information and a blank one that you can personalize with your brand
          and content.
        </p>
        <div className="card-wrapper-graphics">
          <div className="card-item-graphics">
            <div className="card-top">
              <Image
                className="w-full mb-3 p-2"
                src={marketplaceBanner}
                alt="marketplace-banner"
              />
              <div className="px-4 card-text-graphics">
                <h4>Marketplace Banners</h4>
              </div>
            </div>
            <div className="px-4 mb-3">
              <a
                href="https://www.mediafire.com/folder/4dbvrzfbrs7v2/Shop+Local+Digital+Marketplace+Banners"
                target="_blank"
              >
                Explore
              </a>
            </div>
          </div>
          {/* 2 */}
          <div className="card-item-graphics">
            <div className="card-top">
              <Image
                className="w-full mb-3 p-2"
                src={businessBanner}
                alt="business-banner"
              />
              <div className="px-4 card-text-graphics">
                <h4>Business Banners</h4>
              </div>
            </div>
            <div className="px-4 mb-3">
              <a
                href="https://www.mediafire.com/folder/09eulefkc51h1/Shop+Local+Digital+Business+Banners"
                target="_blank"
              >
                Explore
              </a>
            </div>
          </div>
          {/* 3 */}
          <div className="card-item-graphics">
            <div className="card-top">
              <Image
                className="w-full mb-3 p-2"
                src={couponVoucherGraphics}
                alt="coupon-voucher-graphics"
              />
              <div className="px-4 card-text-graphics">
                <h4>Coupon/Voucher Graphics</h4>
              </div>
            </div>
            <div className="px-4 mb-3">
              <a
                href="https://www.mediafire.com/folder/q8zmn2xf378fy/Shop+Local+Marketplace+Offers"
                target="_blank"
              >
                Explore
              </a>
            </div>
          </div>
          {/* --end-- */}
        </div>
      </div>

      <div className="max-width-container px-2">
        <h2>Business User Playbooks</h2>
        <p className="mb-5">
          Welcome to business user playbooks. Below you will find playbooks for
          specific functions of your account with Shop Local Digital Platform.
          As a business user, you can manage your profile, create and manage
          your coupons and vouchers and communicate with customer. You also have
          access to all transactions and data of your account. We also have an
          AI tool to help you to create content for coupons and vouchers.
          <br />
          <br />
          Click below on any playbook to open a pdf file on your browser. You
          can either review the playbook on your browser or once it opens in
          your browser, you can download it as well. Any feedback is much
          appreciated.
        </p>
        <div className="card-wrapper">
          {businessData.length > 0 ? (
            businessData.map((item) => {
              return (
                <div key={item.support_id} className="card-item">
                  <div className="card-top">
                    <Image
                      className="w-full mb-4"
                      src={item.thumbnail_image ? item.thumbnail_image : logo}
                      alt={item.label}
                    />
                    <div className="mb-4 px-4">
                      <h3>{item.label_name}</h3>
                    </div>
                  </div>
                  <div className="px-4 mb-4 user-btns">
                    <a href={item.pdf_path} target="_blank">
                      PDF
                    </a>
                    <a href={item.video_link} target="_blank">
                      Video
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-data-available">
              No business playbooks available.
            </p>
          )}
        </div>
      </div>
      <div className="max-width-container px-2">
        <h2>Customer Playbooks</h2>
        <p className="mb-5">
          Welcome to Customer playbooks. Thank you for being a customer to
          support businesses in our platform. Every $ you spend with them
          creates economic impact.
          <br />
          <br />
          Below you will find playbooks for specific functions of your account
          with Shop Local Digital Platform. You can browse offers from
          businesses, you can view your account status, communicate with
          businesses and redeem the offers from your webapp or mobile app.{" "}
          <br />
          <br />
          Click below on any playbook to open a pdf file on your browser. You
          can either review the playbook on your browser or once it opens in
          your browser, you can download it as well. Any feedback is much
          appreciated.
        </p>
        <div className="card-wrapper">
          {customerData.length > 0 ? (
            customerData.map((item) => {
              return (
                <div key={item.support_id} className="card-item">
                  <div className="card-top">
                    <Image
                      className="w-full mb-4"
                      src={item.thumbnail_image ? item.thumbnail_image : logo}
                      alt={item.label}
                    />
                    <div className="mb-4 px-4">
                      <h3>{item.label_name}</h3>
                    </div>
                  </div>
                  <div className="px-4 mb-4">
                    <a href={item.pdf_path} target="_blank">
                      View
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-data-available">
              No customer playbooks available.
            </p>
          )}
        </div>
      </div>
      <div className="max-width-container px-2">
        <h2>Marketplace Playbooks</h2>
        <p className="mb-5">
          Welcome to Marketplace playbooks. We are thrilled that you are using
          this platform to create engagement with your audience (businesses and
          community members).
          <br />
          <br /> Below you will find playbooks for specific functions of your
          account with Shop Local Digital Platform. You have access to a
          dashboard that provides you with valuable information of your
          marketplace, business management tab to curate and publish businesses
          in your marketplace, communication features to communicate with
          businesses easily and various information to easily manage your
          marketplace in minutes. <br />
          <br />
          Click below on any playbook to open a pdf file on your browser. You
          can either review the playbook on your browser or once it opens in
          your browser, you can download it as well. Any feedback is much
          appreciated
        </p>
        <div className="card-wrapper">
          {marketplaceData.length > 0 ? (
            marketplaceData.map((item) => {
              return (
                <div key={item.support_id} className="card-item">
                  <div className="card-top">
                    <Image
                      className="w-full mb-4"
                      src={item.thumbnail_image ? item.thumbnail_image : logo}
                      alt={item.label}
                    />
                    <div className="mb-4 px-4">
                      <h3>{item.label_name}</h3>
                    </div>
                  </div>
                  <div className="px-4 mb-4">
                    <a href={item.pdf_path} target="_blank">
                      View
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-data-available">
              No marketplace playbooks available.
            </p>
          )}
        </div>
      </div>

      <div className="end-footer-support">
        <div className="P-T-C">
          <h6>
            Copyright © {new Date().getFullYear()} Meylah Corporation. All
            rights reserved.
          </h6>
          <div className="sub-P-T-C">
            <a href="https://meylah.com/privacy-policy/" target="_blank">
              <p className="PrivacyPolicy">Privacy Policy</p>
            </a>
            |
            {/* <Link to="https://meylah.com/termsofuse/" target="_blank">
          <p className="TermsAndConditionsfooter">Terms & Conditions</p>
        </Link> */}
            <a href="https://meylah.com/termsofuse/" target="_blank">
              <p className="TermsAndConditionsfooter">Terms & Conditions</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
