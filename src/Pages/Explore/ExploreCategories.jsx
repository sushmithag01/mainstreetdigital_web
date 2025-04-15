import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import "./Explore.css";

const ExploreCategories = ({
  list,
  selectedCategory,
  setDefaultList,
  setSearchVoucher,
  setSearchCoupon,
}) => {
  const [activeClass, setActiveClass] = useState("");

  const hasFeaturedCategories = list.some(
    (item) =>
      item.category_name === "Featured Vouchers" ||
      item.category_name === "Featured Coupons"
  );

  useEffect(() => {
    if (
      (list?.length > 0 && list[0]?.category_name === "Featured Vouchers") ||
      list[0]?.category_name === "Featured Coupons"
    ) {
      setActiveClass(list[0]?.category_name);
      setDefaultList(list[0]?.category_name);
    } else if (
      list?.length > 0 &&
      list[0]?.category_name === "Deals Categories"
    ) {
      setActiveClass(list[1]?.category_name);
      setDefaultList(list[1]?.category_name);
    }
  }, [list]);

  const ActiveHandler = (selectedCategoryName) => {
    setActiveClass(selectedCategoryName);
    setDefaultList(selectedCategoryName);
    setSearchVoucher("");
    setSearchCoupon("");
  };

  return (
    <div className="explore-cat px-3 py-3">
      <div className="cat-list-not">
        {list?.length > 0 ? (
          <>
            {list
              ?.filter(
                (item) =>
                  item.category_name === "Featured Vouchers" ||
                  item.category_name === "Featured Coupons" ||
                  item.category_name === "Deals Categories"
              )
              .map((item, index) => (
                <div key={index}>
                  {item.category_name === "Deals Categories" ? (
                    <p
                      className={`cat-text mb-2 ${
                        hasFeaturedCategories ? "deal-category" : ""
                      }`}
                    >
                      {item.category_name}
                      &nbsp;&nbsp;
                      {/* <img
                        loading="lazy"
                        src={flameCategoryone}
                        className="flameimg"
                        alt="flame icon"
                      /> */}
                    </p>
                  ) : (
                    <p
                      className={
                        activeClass === item.category_name
                          ? "Cat-Active"
                          : "cat-underline text-limit-1"
                      }
                      title={item.category_name}
                      onClick={() => {
                        selectedCategory(item.category_id);
                        ActiveHandler(item.category_name);
                      }}
                    >
                      {item.category_name}
                    </p>
                  )}
                </div>
              ))}

            <div className="scrollable-cat-list">
              {list
                ?.filter(
                  (item) =>
                    item.category_name !== "Featured Vouchers" &&
                    item.category_name !== "Featured Coupons" &&
                    item.category_name !== "Deals Categories"
                )
                .map((item, index) => (
                  <div key={index}>
                    <p
                      className={
                        activeClass === item.category_name
                          ? "Cat-Active"
                          : "cat-underline text-limit-1"
                      }
                      title={item.category_name}
                      onClick={() => {
                        selectedCategory(item.category_id);
                        ActiveHandler(item.category_name);
                      }}
                    >
                      {item.category_name}
                    </p>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <p className="no-cat-available">No Categories available!</p>
        )}
      </div>
    </div>
  );
};

export default ExploreCategories;
