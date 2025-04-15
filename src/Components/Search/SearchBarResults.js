import React from "react";

const SearchBarResults = ({ SearchValue }) => {
  return (
    <div className="ResultBar">
      {SearchValue ? (
        <p className="searchBarResult">
          <span className="searchResults">Search results for </span> "
          {SearchValue?.length > 50
            ? SearchValue?.substring(0, 50) + "..."
            : SearchValue}
          "
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBarResults;
