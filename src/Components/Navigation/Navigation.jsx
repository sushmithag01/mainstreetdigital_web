import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlineForum,
  MdOutlineKeyboardArrowDown,
  MdOutlineNotificationsNone,
  MdOutlinePayments,
  MdOutlineSmartScreen,
  MdSearch,
} from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoNav from "../../assets/newNavLogo.svg";
import userManual from "../../assets/User-Manual_Icon.svg";
import {
  GetSlUserName,
  getUser,
  getUserName,
} from "../../Utils/Auth/LocalStorage";
import EmailLink from "../EmailLink/EmailLink";
import "./Navigation.css";
import DefaultImg from "../../assets/user profile.svg";

const Navigation = () => {
  const navigate = useNavigate();
  const [activeStyle, setActiveStyle] = useState("");
  const [show, setShow] = useState(false);
  const [userImg, setUserImg] = useState("");

  const UserDetails = getUser();
  const UpdatedUserName = getUserName();
  const SlUserName = GetSlUserName();
  const UserName = UserDetails ? UserDetails.first_name : "";

  useEffect(() => {
    const UserImage = localStorage.getItem("profileImage");
    if (UserImage) {
      setUserImg(UserImage);
    } else {
      setUserImg(DefaultImg);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "profileImage") {
        const updatedImage = event.newValue;
        setUserImg(updatedImage || DefaultImg);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const path = window.location.href;
    const endPath = path.split("/");
    if (endPath[3] === "explore") {
      setActiveStyle("explore");
    }
    if (endPath[3] === "dashboard") {
      setActiveStyle("dashboard");
    }
    if (endPath[3] === "my-account") {
      setActiveStyle("my-account");
    }
    if (endPath[3] === "messages") {
      setActiveStyle("messages");
    }
    if (endPath[3] === "notifications") {
      setActiveStyle("notifications");
    }
    if (endPath[4] === "my-vouchers") {
      setActiveStyle("my-vouchers");
    }
    if (endPath[4] === "my-coupons") {
      setActiveStyle("my-coupons");
    }
  }, []);

  const NavbarHandler = (index) => {
    if (index == 2) {
      setActiveStyle("explore");
    }
    if (index == 3) {
      setActiveStyle("dashboard");
    }
    if (index == 4) {
      setActiveStyle("my-vouchers");
    }
    if (index == 5) {
      setActiveStyle("my-coupons");
    }
    if (index == 6) {
      setActiveStyle("notifications");
    }
    if (index == 7) {
      setActiveStyle("messages");
    }
  };

  const LogoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  const onMyVoucher = () => {
    if (activeStyle === "my-vouchers") {
      setShow(true);
    }
  };

  const splitUsername = (str) => {
    let result = [];

    if (/^[^\s]+$/.test(str) || /\b\w{17,}\b/.test(str)) {
      for (let i = 0; i < str?.length; i += 16) {
        let segment = str.slice(i, i + 16);
        if (segment.length === 16 && i + 16 < str.length) {
          segment += "-";
        }
        result.push(segment);
      }
    } else {
      result.push(str);
    }

    return result;
  };

  const formattedUsernames = splitUsername(
    UpdatedUserName ? UpdatedUserName : UserName ? UserName : SlUserName
  );

  return (
    <div>
      <Navbar expand="lg" className="custom-nav-main mt-3 endUserNav">
        <div className="d-flex justify-content-left center_Div">
          <NavLink to={"/explore"}>
            <Image loading="lazy" src={LogoNav} className="mx-3" />
          </NavLink>
        </div>
        <div className="d-flex justify-content-left mobile-profile userImage center_Div">
          <Link className="business_User_Block" to="/my-profile">
            <div className="profileImage">
              <Image loading="lazy" src={userImg} alt="profile-image"></Image>
            </div>
            <div to="/my-profile" className="user_Name">
              <p>
                {formattedUsernames.map((segment, index) => (
                  <div className="user_Name_Block" key={index}>
                    <p className="hyphenated">{index > 0 && "-"}</p>
                    <p className="hyphenated">{segment}</p>
                  </div>
                ))}
              </p>
            </div>
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="custom-nav mt-1 exploreNavbar"
        >
          <Nav className="me-auto">
            <Link
              onClick={() => {
                NavbarHandler(2);
              }}
              to="/explore"
              className={
                activeStyle === "explore" ? "nav-link nav-active" : "nav-link "
              }
            >
              <MdSearch className="nav-icon" />
              Explore
            </Link>

            <Link
              onClick={() => {
                NavbarHandler(3);
              }}
              to="/dashboard"
              className={
                activeStyle === "dashboard"
                  ? "nav-link nav-active"
                  : "nav-link mt-0"
              }
            >
              <MdOutlineDashboard className="nav-icon" />
              Dashboard
            </Link>
            <NavDropdown
              show={
                show === true
                  ? true
                  : activeStyle === "my-vouchers" ||
                    activeStyle === "my-coupons"
                  ? true
                  : false
              }
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              title={
                <p>
                  <MdOutlineAccountCircle className="nav-icon" /> My Account{" "}
                  <MdOutlineKeyboardArrowDown className="nav-arrow" />
                </p>
              }
              //  id="basic-nav-dropdown"
            >
              <Link
                style={{ marginBottom: "5px" }}
                onClick={() => {
                  NavbarHandler(4);
                  onMyVoucher();
                }}
                to="/my-account/my-vouchers"
                className={
                  activeStyle === "my-vouchers"
                    ? "nav-link nav-active"
                    : "nav-link mt-0"
                }
              >
                <MdOutlineSmartScreen className="nav-icon" /> My Vouchers
              </Link>
              <Link
                onClick={() => {
                  NavbarHandler(5);
                }}
                to="/my-account/my-coupons"
                className={
                  activeStyle === "my-coupons"
                    ? "nav-link nav-active"
                    : "nav-link mt-0"
                }
              >
                <MdOutlinePayments className="nav-icon" /> My Coupons
              </Link>
            </NavDropdown>
            <Link
              onClick={() => {
                NavbarHandler(6);
              }}
              to="/notifications"
              className={
                activeStyle === "notifications"
                  ? "nav-link nav-active"
                  : "nav-link mt-0"
              }
            >
              <MdOutlineNotificationsNone className="nav-icon" /> Notifications
            </Link>
            <Link
              onClick={() => {
                NavbarHandler(7);
              }}
              to="/messages/:order-related=true"
              state={{
                productName: "Main Street Digital",
                businessName: "Main Street Digital",
              }}
              className={
                activeStyle === "messages"
                  ? "nav-link nav-active "
                  : "nav-link mt-0"
              }
            >
              <MdOutlineForum className="nav-icon" /> Messages
            </Link>
            <a
              className="nav-button nav-link-992px"
              target="_blank"
              href={`${process.env.REACT_APP_COMMON_URL}support`}
            >
              <img src={userManual} className="nav-icon" /> User Manual
            </a>
            <EmailLink
              className="nav-link-992px support_Mail"
              email="support@shoplocal.digital"
              subject=""
              body=""
            />
            <Link className="nav-link-992px" onClick={LogoutHandler}>
              <MdLogout className="nav-icon" /> Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <a
        className="nav-link nav-logout user-manual hide-mobile hide-tab"
        target="_blank"
        href={`${process.env.REACT_APP_COMMON_URL}support`}
      >
        <img src={userManual} className="nav-icon" /> User Manual
      </a>
      <EmailLink
        className="nav-link nav-logout hide-mobile hide-tab logouttab support_Mail"
        email="support@shoplocal.digital"
        subject=""
        body=""
      />
      <Link
        className="nav-link nav-logout hide-mobile hide-tab logouttab"
        onClick={LogoutHandler}
      >
        <MdLogout className="nav-icon" /> Logout
      </Link>
    </div>
  );
};

export default Navigation;
