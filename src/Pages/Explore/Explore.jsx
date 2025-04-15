import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CarousalList from "../../Components/CarousalCard/CarousalList";
import Loader from "../../Components/Loader/Loader";
import Navigation from "../../Components/Navigation/Navigation";
import Notifications from "../../Components/Notifications/Notifications";
import Pagination from "../../Components/Pagination/Pagination";
import { CategoryList } from "../../Services/Api/CategoryList";
import { exploreApi } from "../../Services/Api/Explore";
import { ExplorePopularDealsApi } from "../../Services/Api/ExplorePopularDealsApi";
import { FeaturedCouponListAPI } from "../../Services/Api/FeaturedCoupon/FeaturedCouponList";
import { FeaturedVoucherListAPI } from "../../Services/Api/FeaturedVoucher/FeaturedVoucherList";
import { userId } from "../../Utils/Auth/LocalStorage";
import ErrorText from "../../Utils/Messages/ErrorMessages";
import { ErrorToast } from "../../Utils/Messages/Toasters";
import locationIcon from "../../assets/Images/locationIcon.svg";
import "../Explore/Explore.css";
import ExploreCategories from "./ExploreCategories";
import ExploreSlider from "./ExploreSlider";
import { FeaturedCoupons } from "./FeaturedCoupons";
import { FeaturedVouchers } from "./FeaturedVouchers";
import LatestLocals from "./LatestLocals";

const Explore = () => {
  const userid = userId();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cityId, setCityId] = useState(null);
  const [LocationName, setLocationName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [latestDealsData, setLatestDealsData] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [popularDealsList, setPopularDealsList] = useState([]);
  const [search, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState(0);
  const [componentLoading, setComponentLoading] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [defaultList, setDefaultList] = useState("");
  const [categoriesItems, setCategoriesItems] = useState([]);

  const [featuredVoucher, setFeaturedVoucher] = useState([]);
  const [featureVoucherCount, setFeatureVoucherCount] = useState(0);
  const [featureVoucherPageNumber, setFeatureVoucherPageNumber] = useState(0);
  const [featureVoucherError, setFeatureVoucherError] = useState(false);
  const [sortValueVoucher, setSortValueVoucher] = useState(0);
  const [searchVoucher, setSearchVoucher] = useState("");

  const [featuredCoupon, setFeaturedCoupon] = useState([]);
  const [featureCouponCount, setFeatureCouponCount] = useState(0);
  const [featureCouponPageNumber, setFeatureCouponPageNumber] = useState(0);
  const [featureCouponError, setFeatureCouponError] = useState(false);
  const [sortValueCoupon, setSortValueCoupon] = useState(0);
  const [searchCoupon, setSearchCoupon] = useState("");

  const limit = 4;

  const selectedCategory = (e) => {
    setSelectedCategoryId(e);
  };

  const handleStateChange = (setter) => (value) => {
    setter(value);
  };

  // Search and Sort Handlers
  const handleSearchLatestDeals = handleStateChange(setSearchValue);
  const handleSortLatestDeals = handleStateChange(setSortValue);
  const handleSearchVoucher = handleStateChange(setSearchVoucher);
  const handleSortVoucher = handleStateChange(setSortValueVoucher);
  const handleSearchCoupon = handleStateChange(setSearchCoupon);
  const handleSortCoupon = handleStateChange(setSortValueCoupon);

  useEffect(() => {
    try {
      const exploreMarketplaceObj = localStorage.getItem("explore-marketplace");
      const defaultMarketplaceObj = localStorage.getItem("user");

      if (exploreMarketplaceObj) {
        const exploreMarketplace = JSON.parse(exploreMarketplaceObj);
        if (
          exploreMarketplace?.mms_city_id &&
          exploreMarketplace?.mms_city_name
        ) {
          localStorage.setItem("city_id", exploreMarketplace.mms_city_id);
          setCityId(exploreMarketplace.mms_city_id);
          setLocationName(exploreMarketplace.mms_city_name);
        }
      } else if (defaultMarketplaceObj) {
        const defaultMarketplace = JSON.parse(defaultMarketplaceObj);
        if (
          defaultMarketplace?.user_city_id &&
          defaultMarketplace?.user_city_name
        ) {
          setCityId(defaultMarketplace.user_city_id);
          setLocationName(defaultMarketplace.user_city_name);
        }
      }
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (cityId != null) {
      getCategoriesData();
      getDealsSliderData();
    }
  }, [cityId]);

  useEffect(() => {
    const payload_explore = {
      category_id: selectedCategoryId,
      city_id: parseInt(cityId),
      search_value: search.trim(),
      sort: parseInt(sortValue),
    };
    if (cityId && selectedCategoryId !== null) {
      getLatestDeals(payload_explore);
    }
  }, [sortValue, selectedCategoryId, search]);

  useEffect(() => {
    const payload = {
      offset: pageNumber,
      limit: limit,
      category_id: selectedCategoryId,
      city_id: parseInt(cityId),
      search_value: search.trim(),
      sort: parseInt(sortValue),
    };
    if (cityId && selectedCategoryId !== null) {
      getLatestDeals(payload);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (cityId !== null) {
      setComponentLoading(true);
      getFeaturedVoucherListing()
        .catch(console.error)
        .finally(() => setComponentLoading(false));
    }
  }, [featureVoucherPageNumber, sortValueVoucher, searchVoucher]);

  useEffect(() => {
    setFeatureVoucherPageNumber(0);
  }, [searchVoucher])

  useEffect(() => {
    setFeatureCouponPageNumber(0);
  }, [searchCoupon])

  useEffect(() => {
    setPageNumber(0)
  }, [sortValue])

  useEffect(()=>{
    setFeatureCouponPageNumber(0)
  },[sortValueCoupon])
  useEffect(()=>{
    setFeatureVoucherPageNumber(0)
  },[sortValueVoucher])


  useEffect(() => {
    if (cityId !== null) {
      setComponentLoading(true);
      getFeaturedCouponListing()
        .catch(console.error)
        .finally(() => setComponentLoading(false));
    }
  }, [featureCouponPageNumber, sortValueCoupon, searchCoupon]);

  const getCategoriesData = async () => {
    const payload = {
      city_id: cityId,
      eu_id: userid,
    };
    const Response = await CategoryList(payload, () => navigate("/"));
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
    } else {
      const finalOutput = [];
      const [featuredVouchers, featuredCoupons] = await Promise.all([
        getFeaturedVoucherListing(),
        getFeaturedCouponListing(),
      ]);

      if (featuredVouchers?.length) {
        finalOutput.push({
          business_category: null,
          category_id: null,
          category_name: "Featured Vouchers",
        });
      }

      if (featuredCoupons?.length) {
        finalOutput.push({
          business_category: null,
          category_id: null,
          category_name: "Featured Coupons",
        });
      }

      const StaticHeading = {
        business_category: null,
        category_id: 0,
        category_name: "Deals Categories",
      };

      if (Response?.res?.length) {
        const StaticAll = {
          business_category: null,
          category_id: 0,
          category_name: "All Deals",
        };

        finalOutput.push(StaticHeading, StaticAll);
        Response.res.forEach((category) => finalOutput.push(category));
      }

      const othersCategory = finalOutput.filter(
        (item) => item.category_name.toLowerCase() === "others"
      );
      const remainingCategories = finalOutput.filter(
        (item) => item.category_name.toLowerCase() !== "others"
      );
      const reorderedOutput = [...remainingCategories, ...othersCategory];
      setCategoriesItems(reorderedOutput);
      setSelectedCategoryId(0);
      setBannerImages(Response.banner_image);
      setLoading(false);
    }
  };

  const getLatestDeals = async (payload) => {
    setComponentLoading(true);
    const Response = await exploreApi(payload, () => {
      navigate("/");
    });
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
      setLoading(false);
      setComponentLoading(false);
    } else if (Response.status == 429) {
      ErrorToast(Response.message);
      setLoading(true);
      setComponentLoading(false);
    } else {
      setLatestDealsData(Response.data);
      setTotalItems(Response.total_count);
      setComponentLoading(false);
      setLoading(false);
    }
  };

  const getFeaturedVoucherListing = async () => {
    const payload = {
      city_id: cityId,
      limit: limit,
      offset: featureVoucherPageNumber,
      search_value: searchVoucher.trim(),
      sort: parseInt(sortValueVoucher),
    };
    const response = await FeaturedVoucherListAPI(payload, () => {
      navigate("/");
    });

    if (response.success) {
      setFeaturedVoucher(response.data);
      setFeatureVoucherCount(response.total_count);
      setFeatureVoucherError(false);
      setComponentLoading(false);
      return response.data;
    } else if (
      response.status === 400 &&
      response.message == "No featured vouchers available!"
    ) {
      setFeatureVoucherError(true);
      setComponentLoading(false);
    } else if (response.status === 429) {
      setLoading(true);
      setComponentLoading(false);
      ErrorToast(response.message);
    }
    setLoading(false);
    setComponentLoading(false);
    return [];
  };

  const getFeaturedCouponListing = async () => {
    const payload = {
      city_id: cityId,
      limit: limit,
      offset: featureCouponPageNumber,
      search_value: searchCoupon.trim(),
      sort: parseInt(sortValueCoupon),
    };
    const response = await FeaturedCouponListAPI(payload, () => {
      navigate("/");
    });

    if (response.success) {
      setFeaturedCoupon(response.data);
      setFeatureCouponCount(response.total_count);
      setFeatureCouponError(false);
      setComponentLoading(false);
      return response.data;
    } else if (
      response.status == 400 &&
      response.message == "No featured coupons available!"
    ) {
      setFeatureCouponError(true);
      setComponentLoading(false);
    } else if (response.status === 429) {
      setLoading(true);
      setComponentLoading(false);
      ErrorToast(response.message);
    }
    setLoading(false);
    setComponentLoading(false);
    return [];
  };

  const getDealsSliderData = async () => {
    const payload = {
      city_id: cityId,
      eu_id: userid,
    };
    const Response = await ExplorePopularDealsApi(payload, () => navigate("/"));
    if (!Response) {
      ErrorToast(ErrorText.InternalError);
    } else {
      setPopularDealsList(Response.data);
    }
  };

  const OtherMarketplace = () => {
    navigate("/explore/other-marketplaces");
  };

  return (
    <>
      <Notifications />
      {loading ? (
        <Loader />
      ) : (
        <div className="gray-bg explore-page">
          <div className="navbar-section p-0">
            <Navigation setLoading={setLoading} />
          </div>
          <div className="main-content pt-4 pr-3 pb-4 explore_Page">
            <div className="d-flex mb-4 explore-main">
              <div className="explore-location-section">
                <p className="exploretext">Exploring Deals in</p>
                <img
                  loading="lazy"
                  src={locationIcon}
                  className="arrow-explore"
                />
                <p className="location-text" title={LocationName}>
                  {LocationName.length > 20
                    ? `${LocationName.substring(0, 20)}...`
                    : LocationName}
                </p>
              </div>
              <Button className="btn-default-color" onClick={OtherMarketplace}>
                Other Marketplaces
              </Button>
            </div>

            <ExploreSlider BannerImages={bannerImages} />
            <div className="mt-4 pt-4 flex latest-local-parent-div">
              <Col sm="12" lg="3" className="category-list">
                <ExploreCategories
                  list={categoriesItems}
                  selectedCategory={selectedCategory}
                  setDefaultList={setDefaultList}
                  setSearchVoucher={setSearchVoucher}
                  setSearchCoupon={setSearchCoupon}
                />
              </Col>
              <Col sm="12" lg="9" className="latest-local-container">
                <div className="latest-local pl-3">
                  {defaultList == "Featured Vouchers" && (
                    <>
                      <FeaturedVouchers
                        SortHandlerVoucher={handleSortVoucher}
                        sortValueVoucher={sortValueVoucher}
                        featuredVoucher={featuredVoucher}
                        SearchhandlerVoucher={handleSearchVoucher}
                        featureVoucherError={featureVoucherError}
                        Loading={loading === false ? componentLoading : ""}
                      />
                      {featuredVoucher?.length !== 0 &&
                        featureVoucherCount > 4 &&
                        !featureVoucherError && (
                          <Pagination
                            TotalPageCount={featureVoucherCount}
                            Limit={4}
                            SetPageNumber={setFeatureVoucherPageNumber}
                            pageNumber={featureVoucherPageNumber}
                          />
                        )}
                    </>
                  )}

                  {defaultList == "Featured Coupons" && (
                    <>
                      <FeaturedCoupons
                        SortHandlerCoupon={handleSortCoupon}
                        sortValueCoupon={sortValueCoupon}
                        featuredCoupon={featuredCoupon}
                        SearchhandlerCoupon={handleSearchCoupon}
                        featureCouponError={featureCouponError}
                        Loading={loading === false ? componentLoading : ""}
                      />
                      {featuredCoupon?.length !== 0 &&
                        featureCouponCount > 4 &&
                        !featureCouponError && (
                          <Pagination
                            TotalPageCount={featureCouponCount}
                            Limit={4}
                            SetPageNumber={setFeatureCouponPageNumber}
                            pageNumber={featureCouponPageNumber}
                          />
                        )}
                    </>
                  )}

                  {defaultList !== "Featured Coupons" &&
                    defaultList !== "Featured Vouchers" && (
                      <>
                        <LatestLocals
                          voucherCouponList={latestDealsData}
                          sortHandler={handleSortLatestDeals}
                          searchHandler={handleSearchLatestDeals}
                          Loading={loading === false ? componentLoading : ""}
                          initialState={sortValue}
                        />
                        {latestDealsData?.length !== 0 && totalItems > 4 ? (
                          <Pagination
                            TotalPageCount={totalItems}
                            Limit={4}
                            SetPageNumber={setPageNumber}
                            pageNumber={pageNumber}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                </div>
                {popularDealsList.length > 0 && (
                  <div className="popular-deals pl-3 mb-4">
                    <CarousalList
                      heading={"Deals you may like"}
                      dealsList={popularDealsList}
                      count="3"
                      setLoading={setLoading}
                    />
                  </div>
                )}
              </Col>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Explore;
