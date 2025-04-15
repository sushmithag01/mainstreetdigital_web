import React from "react";
import "./error404.css";
import { Link } from "react-router-dom";
import fourzerofour from "../../assets/404.png";
import fouronefourleft from "../../assets/404left.png";
import fouronefourright from "../../assets/404right.png";

const ErrorPage = () => {
  return (
    <>
      <img
        loading="lazy"
        className="fourzerofour-left"
        src={fouronefourleft}
      ></img>
      <img
        loading="lazy"
        className="fourzerofour-right"
        src={fouronefourright}
      ></img>
      <div className="container-error">
        <img loading="lazy" className="404" src={fourzerofour} />
        <h3 style={{ color: "black" }}>WHOOPS..!</h3>
        <p style={{ color: "black" }}>
          Looks like this page went to other universe
        </p>
        <Link to="/explore" className="error-homepage">
          <button className="err-btn">GO TO HOME PAGE</button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
