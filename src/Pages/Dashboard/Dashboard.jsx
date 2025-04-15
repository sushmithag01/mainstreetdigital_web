import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import arrowRight from "../../assets/arrow-right.png";
import CoupenPic from "../../assets/coupens.svg";
import Savings from "../../assets/savings.svg";
import VouchurePic from "../../assets/vouchure.svg";
import BackArrow from "../../Components/BackButton/BackArrow";
import Loader from "../../Components/Loader/Loader";
import Navigation from "../../Components/Navigation/Navigation";
import RecentActivities from "../../Components/RecentActivities/RecentActivities";
import { dashboardApi } from "../../Services/Api/Dashboard";
import { CityId, userId } from "../../Utils/Auth/LocalStorage";
import "../Dashboard/Dashboard.css";

const Dashboard = () => {
  const [topSectiondata, setTopSectionData] = useState([]);
  const [headersData, setHeadersData] = useState([]);
  const [recentActivityData, setRecentActivityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const id = userId();
  const cityid = CityId();

  const DashboardApiHandler = async () => {
    const data = {
      user_id: parseInt(id),
      city_id: cityid,
    };
    setLoading(true);
    const dashboardData = await dashboardApi(data, () => {
      navigate("/");
    });
    setLoading(false);
    if (dashboardData === false) {
      toast.error("Internal server error!", {
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
      navigate("/explore");
    } else {
      if (dashboardData.success === false) {
        toast.error(dashboardData.message, {
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
        navigate("/explore");
      } else if (dashboardData.status === 429) {
        setLoading(true);
        toast.error(dashboardData.message, {
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
        setTopSectionData(dashboardData["top_section"]);
        setHeadersData(dashboardData["headers"]);
        setRecentActivityData(dashboardData["recent_activity"]);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    DashboardApiHandler();
    // const colors = {
    //   redeemed: "green",
    //   downloaded: "blue",
    //   purchased: "yellow",
    // };
    // setGetColor(colors[i]);
  }, []);

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
            {/* <Link to="/explore">
              <MdKeyboardArrowLeft className="arrow-left" />
              Back
            </Link> */}
          </p>
          <p className="page-maintitle dashboard">Dashboard</p>
          <Row className="dashboard-card mt-4 ">
            <Col md="4">
              <div className="card">
                <div className="dash-img-main">
                  <div className="dash-img">
                    <Image loading="lazy" src={VouchurePic}></Image>
                  </div>
                </div>
                <div className="dash-content">
                  <p className="dash-text1 pt-4">Available Vouchers</p>
                  <p className="dash-text2">
                    {topSectiondata.available_voucher_count}
                  </p>
                  <p className="text-right">
                    <Link to={"/my-account/my-vouchers"}>
                      <img
                        loading="lazy"
                        src={arrowRight}
                        className="availableVouchersArrowRight"
                      />
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="card">
                <div className="dash-img-main">
                  <div className="dash-img">
                    <Image loading="lazy" src={CoupenPic} height="23px"></Image>
                  </div>
                </div>
                <div className="dash-content">
                  <p className="dash-text1 pt-4">Available Coupons</p>
                  <p className="dash-text2">
                    {topSectiondata.available_coupon_count}
                  </p>
                  <p className="text-right">
                    <Link to={"/my-account/my-coupons"}>
                      <img
                        loading="lazy"
                        src={arrowRight}
                        className="availableVouchersArrowRight"
                      />
                    </Link>
                  </p>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="card green-card">
                <div className="dash-img-main">
                  <div className="dash-img">
                    <Image loading="lazy" src={Savings} height="18px"></Image>
                  </div>
                </div>
                <div className="dash-content">
                  <p className="dash-text1 pt-4">Total Savings</p>
                  {/* <span className="dash-text2">
                      {topSectiondata.total_saving ? "$" : ""}
                    </span> */}
                  <p className="dash-text2">
                    {"$"}
                    {topSectiondata.total_saving}
                  </p>
                  <p className="text-right pb-4"></p>
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-5">
            <RecentActivities
              headers={headersData}
              recentActivity={recentActivityData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
