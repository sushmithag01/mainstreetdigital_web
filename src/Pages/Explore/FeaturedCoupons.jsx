import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import DefaultImg from "../../assets/DefaultImg.svg";
import searchGlassExplore from "../../assets/searchGlassExplore.png";
import ComponentLoader from "../../Components/ComponentLoader/ComponentLoader";
import SearchBarResults from "../../Components/Search/SearchBarResults";
import "./Explore.css";

export const FeaturedCoupons = (props) => {
  const {
    SortHandlerCoupon,
    SearchhandlerCoupon,
    sortValueCoupon,
    featuredCoupon,
    searchCoupon,
    featureCouponError,
    Loading,
  } = props;

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const SearchHandler = () => {
    SearchhandlerCoupon(searchValue);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      SearchHandler();
    }
  };

  const onSearch = (e) => {
    let search = e.target.value;
    setSearchValue(search);
    if (!search) {
      SearchhandlerCoupon(search);
    }
  };

  const SortHandler = (e) => {
    let sortVal = e.target.value;
    SortHandlerCoupon(sortVal);
  };

  const ViewDetailsHandler = (data) => {
    navigate(`/explore/coupon-detail/${data.business_id}/${data.id}`, {
      state: {
        recent_Id: data.recent_id,
      },
    });
  };

  return (
    <>
      <div className="d-flex mb-4 latest_Locals">
        <p className="latestloc-text tab-hide-title">
          <span className="userline-title">Featured</span> Coupons
        </p>
        <InputGroup className="search-bar explore">
          <InputGroup.Text>
            <img
              loading="lazy"
              className="search-glass-explore"
              src={searchGlassExplore}
            />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search"
            value={searchCoupon}
            onChange={onSearch}
            onKeyDown={onEnter}
          />
          <Button variant="outline-secondary" onClick={SearchHandler}>
            Search
          </Button>
        </InputGroup>
        <Form.Select
          value={sortValueCoupon}
          onChange={SortHandler}
          aria-label="Default select example"
          className="location-select sort-select"
          style={{ cursor: "pointer", width: 50 }}
        >
          <option value="0">Latest</option>
          <option value="1">Price: Low to High</option>
          <option value="2">Price: High to Low</option>
        </Form.Select>
      </div>
      <SearchBarResults SearchValue={searchCoupon} />
      {Loading === true ? (
        <ComponentLoader />
      ) : (
        <div>
          {Array.isArray(featuredCoupon) &&
          featuredCoupon?.length > 0 &&
          !featureCouponError ? (
            featuredCoupon?.map((list, index) => {
              return (
                <Row className="local-main locallatest" key={index}>
                  <Col md="2" className="local-1 latest-local-img">
                    <Image
                      loading="lazy"
                      src={list.product_image ? list.product_image : DefaultImg}
                    />
                  </Col>
                  <Col className="latest-locals-details-coupon">
                    <p
                      className="loc-detail-1 text-limit-2"
                      title={list.category}
                    >
                      {list.category}
                    </p>
                    <p
                      className="loc-detail-2 text-limit-2"
                      title={list.product_name}
                    >
                      {list.product_name}
                    </p>
                    <p
                      className="loc-detail-3 text-limit-2"
                      title={list.business_name}
                    >
                      by {list.business_name}
                    </p>
                  </Col>
                  <Col className="latest-local-voucher">
                    <a
                      style={{ cursor: "pointer" }}
                      className="view-main"
                      onClick={() =>
                        ViewDetailsHandler({
                          id: parseInt(list.city_product_id),
                          business_id: parseInt(list.business_id),
                          recent_id: list.recent_id,
                        })
                      }
                    >
                      <p className="view">View Details</p>
                    </a>
                  </Col>
                  <div className="tag-main">
                    <p className="ribben">Coupon</p>
                  </div>
                </Row>
              );
            })
          ) : (
            <div className="d-flex justify-content-center pt-4 pb-4 mt-4">
              <h6 className="NoDataAvailable" style={{ color: "black" }}>
                No featured coupons available!
              </h6>
            </div>
          )}
        </div>
      )}
    </>
  );
};
