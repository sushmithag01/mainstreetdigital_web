import React from "react";
import shopLocalLoader from "../../assets/LThree.svg";
import { ThreeDots } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-main">
      <img loading="lazy" src={shopLocalLoader} className="loader-img" />
      <ThreeDots
        style={{ position: "absolute" }}
        height="40"
        width="30"
        radius="9"
        color="#FE5A3E"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
