import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import pinned from "../../assets/Images/pinned.svg";
import unpinned from "../../assets/Images/unpinned.svg";
import searchGlassExplore from "../../assets/searchGlassExplore.png";
import BackArrow from "../../Components/BackButton/BackArrow";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Components/Pagination/Pagination";
import { userId } from "../../Utils/Auth/LocalStorage";
import { CountryList } from "../../Services/Api/CountryList";
import { PinnedMarketplaceAPI } from "../../Services/Api/PinnedMarketplace";
import { ErrorToast, SuccessToast } from "../../Utils/Messages/Toasters";
import Navigation from "../../Components/Navigation/Navigation";
import WelcomePopup from "./WelcomePopup";

export const OtherMarketplaces = () => {
  const user_id = userId();
  const navigate = useNavigate();
  const location = useLocation();
  const limit = 9;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [search, setSearch] = useState("");

  const [showWelcomePopup, setShowWelcomePopup] = useState(
    location.state?.isNewUser || false
  );

  const handlePopupClose = () => {
    setShowWelcomePopup(false);
    navigate(".", {
      state: { ...location.state, isNewUser: false },
      replace: true,
    });
  };

  useEffect(() => {
    getMartketplaceList();
  }, [pageNumber]);

  const getMartketplaceList = async () => {
    setLoading(true);
    const payload = {
      limit: limit,
      offset: pageNumber,
      search_value: search.trim(),
      user_id: parseInt(user_id),
    };
    try {
      const Response = await CountryList(payload, () => {
        navigate("/");
      });
      const res = Response.res;
      if (res.status != 200) {
        ErrorToast(res.message);
        setList([]);
      } else {
        setList(res.data);
        setCount(res.total_count);
        setPageNumber(res.page);
        const exploreMarketplaceObj = localStorage.getItem(
          "explore-marketplace"
        );
        if (!exploreMarketplaceObj) {
          localStorage.setItem(
            "explore-marketplace",
            JSON.stringify(res.data[0])
          );
        }
      }
    } catch (error) {
      console.log(error, "API error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.length == 0) {
      setSearch("");
      getMartketplaceList();
    }
  }, [search]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      if (search.trim()) {
        getMartketplaceList();
      } else {
        setSearch("");
        getMartketplaceList();
      }
    }
  };

  const ExploreMarketplace = (item) => {
    localStorage.setItem("explore-marketplace", JSON.stringify(item));
    navigate("/explore");
  };

  const handleSetPinned = async (cityId) => {
    const payload = {
      city_id: cityId,
      user_id: parseInt(user_id),
    };
    try {
      const Response = await PinnedMarketplaceAPI(payload, () => {
        navigate("/");
      });
      if (Response.status != 200) {
        ErrorToast(Response.message);
        setList([]);
      } else {
        SuccessToast(Response.message);
        getMartketplaceList();
      }
    } catch (error) {
      console.log(error, "API error");
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="gray-bg explore-page">
        <div className="navbar-section p-0">
          <Navigation setLoading={setLoading} />
        </div>
        <div className="main-content pt-4 pr-3 pb-4">
          <p className="page-text dashboard">
            <BackArrow />
          </p>
          <div className="explore-list-main mb-4 d-flex latest_Locals">
            <div className="explore-heading">
              <p className="latestloc-text mt-2">
                <span className="userline-title">Mark</span>
                etplace&nbsp;&nbsp;Lists
              </p>
              <p className="mt-2">
                Select <b>"Explore"</b> to browse deals from other marketplaces.
                <br />
                Use the <b>pin icon</b> to select your favorite marketplace.
              </p>
            </div>
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
                value={search}
                onChange={handleSearch}
                onKeyDown={onEnter}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  if (search.trim()) {
                    getMartketplaceList();
                  } else {
                    console.error("Search query is empty!");
                  }
                }}
              >
                Search
              </Button>
            </InputGroup>
          </div>
          <div>
            {list && list.length != 0 ? (
              <div className="card-list-container">
                <div className="grid-container">
                  {list.map((item) => {
                    return (
                      <div
                        className={`grid-square card-list ${
                          item.is_default === 1 ? "default" : ""
                        }`}
                      >
                        <img
                          src={item.is_default === 1 ? pinned : unpinned}
                          className="favorite-marketplace-img"
                          onClick={() => handleSetPinned(item.mms_city_id)}
                        />
                        <Card
                          className="image-container"
                          style={{ transition: "transform 0.2s ease" }}
                        >
                          <Card.Img
                            variant="top"
                            src={item.logo_image}
                            onClick={() => ExploreMarketplace(item)}
                          />
                        </Card>
                        <Card.Body style={{ padding: "16px 0px 0px 0px" }}>
                          <Card.Title
                            className="card-listing-text"
                            data-fullname={item.mms_city_name}
                            title={item.mms_city_name}
                            onClick={() => ExploreMarketplace(item)}
                          >
                            {item.mms_city_name}
                          </Card.Title>
                          <Button
                            className={
                              item.is_default === 1
                                ? "btn-default-color-marketplace"
                                : "btn-explore-color-marketplace"
                            }
                            onClick={() => ExploreMarketplace(item)}
                          >
                            Explore
                          </Button>
                        </Card.Body>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <span className="marketplace-error">
                No Marketplace available!
              </span>
            )}
          </div>
          {list && list.length > 9 && (
            <Pagination
              TotalPageCount={count}
              Limit={limit}
              SetPageNumber={setPageNumber}
            />
          )}
        </div>
      </div>
      {showWelcomePopup && (
        <WelcomePopup
          show={showWelcomePopup}
          onHide={handlePopupClose}
          setShowWelcomePopup={setShowWelcomePopup}
          state={location.state}
        />
      )}
    </div>
  );
};
