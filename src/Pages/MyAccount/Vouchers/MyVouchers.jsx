import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BackArrow from "../../../Components/BackButton/BackArrow";
import Loader from "../../../Components/Loader/Loader";
import Navigation from "../../../Components/Navigation/Navigation";
import { VouchersApi } from "../../../Services/Api/VouchersApi";
import { userId } from "../../../Utils/Auth/LocalStorage";
import { ErrorToast } from "../../../Utils/Messages/Toasters";
import ActiveVouchers from "./VouchersTabs/ActiveVouchers";
import ExpiredVouchers from "./VouchersTabs/ExpiredVouchers";
import RedeemedVouchers from "./VouchersTabs/RedeemedVouchers";
import "../../../assets/css/style.css";

const tabData = [
  {
    eventKey: "available",
    title: "Available Vouchers",
    Component: ActiveVouchers,
  },
  {
    eventKey: "redeemed",
    title: "Redeemed Vouchers",
    Component: RedeemedVouchers,
  },
  {
    eventKey: "expired",
    title: "Expired Vouchers",
    Component: ExpiredVouchers,
  },
];

const MyVouchers = () => {
  const UserId = userId();
  const navigate = useNavigate();
  const location = useLocation();
  const [vouchers, setVouchers] = useState([]);
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
    const response = await VouchersApi(data, () => navigate("/"));
    setLoading(false);

    if (response.status == 200) {
      setVouchers(response.vouchers_list);
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
            <p className="page-maintitle">My Vouchers</p>
            <Tabs
              activeKey={activeTab}
              onSelect={handleTabSelect}
              id="vouchers-tab-example"
              className="mb-4 vou-tab mt-4"
            >
              {tabData.map(({ eventKey, title, Component }) => (
                <Tab key={eventKey} eventKey={eventKey} title={title}>
                  <Component vouchers={vouchers} />
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default MyVouchers;
