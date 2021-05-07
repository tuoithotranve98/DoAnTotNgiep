import React from "react";

function Pagination(props) {
  const { totalPage, page, totalItem, size, onGetCustomer, onChangeFilter } = props;

  const onSelectPageNumber = (pageNum) => {
    onChangeFilter("page", pageNum);
  };

  if (totalPage === 0) return null;
  const listPaginations = [];
  if (totalPage > 1) {
    listPaginations.push({ page_num: 0 });
    for (let i = 1; i <= totalPage; i++) {
      if (page + 1 - i >= -1 && page + 1 - i <= 3) {
        listPaginations.push({ page_num: i });
      }
    }
    listPaginations.push({ page_num: totalPage + 1 });
  }
  let pageElm = null;
  if (listPaginations.length > 3) {
    pageElm = listPaginations.map((pageInfo, index) => {
      if (index === 0) {
        const isDisable = page === 1;
        const className = isDisable ? "page-item disabled" : "page-item";
        return (
          <li
            role="presentation"
            className={className}
            key={index}
            onClick={() => !isDisable && onSelectPageNumber(1)}
          >
            <a className="page-link">
              <span aria-hidden="true">&larr;</span>
              Trang đầu
            </a>
          </li>
        );
      }
      if (index === listPaginations.length - 1) {
        const isDisable = page + 1 === pageInfo.page_num;
        const className = isDisable ? "page-item disabled" : "page-item";
        return (
          <li
            key={index}
            className={className}
            onClick={() =>
              !isDisable && onSelectPageNumber(pageInfo.page_num - 1)
            }
          >
            <a className="page-link">
              Trang cuối <span aria-hidden="false">&rarr;</span>
            </a>
          </li>
        );
      }
      if (index < page - 2 || index > page + 2) return null;
      return (
        <li
          key={index}
          className={
            pageInfo.page_num === page ? "page-item active" : "page-item"
          }
          onClick={() => onSelectPageNumber(pageInfo.page_num)}
        >
          <a className="page-link">{pageInfo.page_num}</a>
        </li>
      );
    });
  }
  return (
    <div className="page-number-control">
      <nav aria-label="Page navigation example">
        <ul className="pagination">{pageElm}</ul>
      </nav>
    </div>
  );
}

export default Pagination;
