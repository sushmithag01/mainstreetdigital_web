import React from "react";
import Carousel from "react-bootstrap/Carousel";
import banner from "../../assets/Cover Default Image.png";
import "./Explore.css";

const ExploreSlider = ({ BannerImages }) => {
  return (
    <>
      <Carousel interval={5000} controls={false} className="banner-slider">
        {BannerImages?.length > 0 ? (
          BannerImages?.map((img, i) => {
            return (
              <Carousel.Item key={i}>
                <img
                  className="d-block w-100"
                  style={{ borderRadius: "15px" }}
                  src={img ? img : banner}
                  alt="First slide"
                />
              </Carousel.Item>
            );
          })
        ) : (
          <Carousel.Item>
            <img
              // loading="lazy"
              className="d-block w-100"
              src={banner}
              alt="Second slide"
            />
          </Carousel.Item>
        )}
      </Carousel>
    </>
  );
};

export default ExploreSlider;
