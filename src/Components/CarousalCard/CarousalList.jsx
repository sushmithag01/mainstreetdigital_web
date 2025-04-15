import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarousalCard from "../../Components/CarousalCard/CarousalCard";
import "../../Pages/Explore/Explore.css";
import "./CarousalList.css";

const CarousalList = (props) => {
  const {
    id,
    business_id,
    status,
    flag,
    setLoading,
    dealsList,
    heading,
    count,
  } = props;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: parseInt(count),
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const renderCardData = () => {
    if (dealsList?.length > 0) {
      return dealsList.map((eachitem, index) => {
        return (
          <CarousalCard
            key={index}
            eachitem={eachitem}
            id={id}
            business_id={business_id}
            status={status}
            flag={flag}
            setLoading={setLoading}
          />
        );
      });
    } else {
      return <div />;
    }
  };
  return (
    <div className="popular-deals_main_container">
      <div className=" mb-4">
        <p className="latestloc-text">
          <span className="userline-title">
            {heading.split(" ")[0]} {heading.split(" ")[1].slice(0, 2)}
          </span>
          {heading.split(" ")[1].slice(2)}{" "}
          {heading.split(" ").slice(2).join(" ")}
        </p>
      </div>

      {dealsList?.length > 0 ? (
        <Carousel
          showDots={false}
          swipeable={true}
          draggable={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          infinite={true}
          ssr={true}
          renderDotsOutside={true}
          arrows={true}
          dotListClass="carousel_dot"
          className="slide related-deals-carousel"
          responsive={responsive}
        >
          {renderCardData()}
        </Carousel>
      ) : (
        <h6 className="NoDataAvailable" style={{ color: "black" }}>
          No data available!
        </h6>
      )}
    </div>
  );
};

export default CarousalList;
