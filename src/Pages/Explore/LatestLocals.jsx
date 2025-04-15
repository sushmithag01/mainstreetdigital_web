import React, { useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import ComponentLoader from "../../Components/ComponentLoader/ComponentLoader";
import SearchBarResults from "../../Components/Search/SearchBarResults";
import DefaultImg from "../../assets/DefaultImg.svg";
import searchGlassExplore from "../../assets/searchGlassExplore.png";

const LatestLocals = ({
  voucherCouponList,
  searchHandler,
  sortHandler,
  Loading,
  initialState,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const SearchHandler = () => {
    searchHandler(searchValue);
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
      searchHandler(search);
    }
  };

  const SortHandler = (e) => {
    let sortVal = e.target.value;
    sortHandler(sortVal);
  };

  const navigate = useNavigate();

  const ViewDetailsHandler = (flag, data) => {
    if (flag === "Voucher") {
      navigate(`/explore/voucher-detail/${data.business_id}/${data.id}`, {
        state: {
          recent_Id: data.recent_id,
        },
      });
    } else if (flag === "Coupon") {
      navigate(`/explore/coupon-detail/${data.business_id}/${data.id}`, {
        state: {
          recent_Id: data.recent_id,
        },
      });
    }
  };

  return (
    <>
      <div className="d-flex mb-4 latest_Locals">
        <p className="latestloc-text tab-hide-title">
          <span className="userline-title">Latest</span> Deals
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
            value={searchValue}
            onChange={onSearch}
            onKeyDown={onEnter}
          />
          <Button variant="outline-secondary" onClick={SearchHandler}>
            Search
          </Button>
        </InputGroup>
        <Form.Select
          value={initialState}
          onChange={SortHandler}
          aria-label="Default select example"
          className="location-select sort-select"
          style={{ cursor: "pointer" }}
        >
          <option value="0">Latest</option>
          <option value="1">Price: Low to High</option>
          <option value="2">Price: High to Low</option>
        </Form.Select>
      </div>
      <SearchBarResults SearchValue={searchValue} />

      {Loading === true ? (
        <ComponentLoader />
      ) : (
        <div>
          {Array.isArray(voucherCouponList) && voucherCouponList?.length > 0 ? (
            voucherCouponList?.map((list, index) => {
              return (
                <Row className="local-main locallatest" key={index}>
                  <Col md="2" className="local-1 latest-local-img">
                    <Image
                      loading="lazy"
                      src={list.product_image ? list.product_image : DefaultImg}
                    />
                  </Col>
                  <Col
                    className={
                      list.flag === "Voucher"
                        ? "latest-locals-details"
                        : "latest-locals-details-coupon"
                    }
                  >
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
                    <div className="latest-local-offer-price">
                      {list.flag === "Voucher" && (
                        <div className="d-flex" style={{ flexWrap: "wrap" }}>
                          <p
                            className="loc-price-1"
                            style={{
                              textDecoration: "line-through",
                              overflowWrap: "anywhere",
                              textAlign: "initial",
                            }}
                          >
                            ${list.product_actual_price}
                          </p>
                          <p
                            className="loc-price-2"
                            style={{
                              overflowWrap: "anywhere",
                              textAlign: "initial",
                            }}
                          >
                            ${list.product_offer_price}
                          </p>
                          <p className="loc-price-offer">
                            {list.offered_percent ? list.offered_percent : "0"}%
                            OFF
                          </p>
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col className="latest-local-voucher">
                    {list.flag === "Voucher" ? (
                      <a
                        style={{ cursor: "pointer" }}
                        className="view-main"
                        onClick={() =>
                          ViewDetailsHandler(list.flag, {
                            id: parseInt(list.city_product_id),
                            business_id: parseInt(list.business_id),
                            recent_id: list.recent_id,
                          })
                        }
                      >
                        <p className="view">View Details</p>
                      </a>
                    ) : (
                      <a
                        className="view-main"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          ViewDetailsHandler(list.flag, {
                            id: parseInt(list.city_product_id),
                            business_id: parseInt(list.business_id),
                            recent_id: list.recent_id,
                          })
                        }
                      >
                        <p className="view">View Details</p>
                      </a>
                    )}
                  </Col>
                  <div className="tag-main">
                    <p className="ribben">{list.flag}</p>
                  </div>
                </Row>
              );
            })
          ) : (
            <div className="d-flex justify-content-center pt-1 pb-4">
              <h6 className="NoDataAvailable" style={{ color: "black" }}>
                No latest deals available!
              </h6>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LatestLocals;
