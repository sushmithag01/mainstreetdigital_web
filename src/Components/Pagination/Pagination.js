import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

const Pagination = ({ TotalPageCount, Limit, SetPageNumber, classNames,pageNumber }) => {
  const pageCount = Math.ceil(TotalPageCount / Limit);

  const changePage = ({ selected }) => {
    SetPageNumber(selected);
  };
  return (
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      forcePage={pageNumber}
      containerClassName={
        classNames ? classNames.ContainerClassName : "paginationBttns"
      }
      previousLinkClassName={
        classNames ? classNames.PreviousLinkClassName : "previousBttn"
      }
      nextLinkClassName={classNames ? classNames.NextLinkClassName : "nextBttn"}
      disabledClassName={
        classNames ? classNames.DisabledClassName : "paginationDisabled"
      }
      activeClassName={
        classNames ? classNames.ActiveClassName : "paginationActive"
      }
    />
  );
};

export default Pagination;
