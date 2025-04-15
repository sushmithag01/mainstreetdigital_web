import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrow from "../../../Components/BackButton/BackArrow";
import Loader from "../../../Components/Loader/Loader";
import Navigation from "../../../Components/Navigation/Navigation";
import { userId } from "../../../Utils/Auth/LocalStorage";
import { ErrorToast } from "../../../Utils/Messages/Toasters";
import { CouponsApi } from "./../../../Services/Api/CouponsApi";
import ActiveCoupons from "./CouponsTabs/ActiveCoupons";
import ExpiredCoupons from "./CouponsTabs/ExpiredCoupons";
import RedeemedCoupons from "./CouponsTabs/RedeemedCoupons";

const tabData = [
  {
    eventKey: "available",
    title: "Available Coupons",
    Component: ActiveCoupons,
  },
  {
    eventKey: "redeemed",
    title: "Redeemed Coupons",
    Component: RedeemedCoupons,
  },
  {
    eventKey: "expired",
    title: "Expired Coupons",
    Component: ExpiredCoupons,
  },
];

const MyCoupons = () => {
  const UserId = userId();
  const navigate = useNavigate();
  const location = useLocation();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("available");

  useEffect(() => {
    const tabFromURL = new URLSearchParams(location.search).get("tab");
    setActiveTab(tabFromURL || "available");
    getMyVoucherList();
  }, [location.search]);

  const getMyVoucherList = async () => {
    const data = { user_id: parseInt(UserId) };
    setLoading(true);
    const response = await CouponsApi(data, () => navigate("/"));
    setLoading(false);

    if (response.status == 200) {
      setCoupons(response.coupons_list);
    } else if (response.status === 429) {
      ErrorToast(response.message);
    }
  };

  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`?tab=${tabKey}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="gray-bg">
          <div className="navbar-section p-0">
            <Navigation />
          </div>
          <div className="main-content pt-4 pr-3 pb-4">
            <p className="page-text dashboard">
              <BackArrow />
            </p>
            <p className="page-maintitle">My Coupons</p>
            <Tabs
              activeKey={activeTab}
              onSelect={handleTabSelect}
              id="coupons-tab-example"
              className="mb-4 vou-tab mt-4"
            >
              {tabData.map(({ eventKey, title, Component }) => (
                <Tab key={eventKey} eventKey={eventKey} title={title}>
                  <Component coupons={coupons} />
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCoupons;
