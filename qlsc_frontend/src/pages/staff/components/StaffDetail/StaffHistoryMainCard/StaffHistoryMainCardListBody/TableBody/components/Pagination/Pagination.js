import React from 'react';

function Pagination(props) {
  const selectPageNumber = (pageNum) => {
    const { page, onClick } = props;
    if (page !== pageNum) {
      onClick(pageNum);
    }
  };

  const { size, page } = props;
  const total = 100;
  if (total === 0) return null;
  const totalPage = (total % size === 0) ? total / size : Math.floor(total / size) + 1;
  const listPaginations = [];
  if (totalPage > 1) {
    listPaginations.push({ page_num: 0 });
    for (let i = 1; i <= totalPage; i++) {
      if (page + 1 - i <= 2 && page + 1 - i >= -2) {
        listPaginations.push({ page_num: i });
      }
    }
    listPaginations.push({ page_num: totalPage + 1 });
  }
  let pageElm = null;
  if (listPaginations.length > 3) {
    pageElm = listPaginations.map((pageInfo, index) => {
      if (index === 0) {
        const className = page === 1 ? 'page-item disabled' : 'page-item';
        return (
          <li
            role="presentation"
            className={className}
            key={index}
            onClick={() => this.selectPageNumber(0)}
          >
            <a className="page-link">
              <span aria-hidden="true">&larr;</span>
                Trang đầu
            </a>
          </li>
        );
      }
      if (index === listPaginations.length - 1) {
        const className = page + 1 === pageInfo.page_num ? 'page-item disabled' : 'page-item';
        return (
          <li
            key={index}
            className={className}
            onClick={() => selectPageNumber(pageInfo.page_num - 2)}
          >
            <a className="page-link">
                Trang cuối
              {' '}
              <span aria-hidden="false">&rarr;</span>
            </a>
          </li>
        );
      }
      return (
        <li
          key={index}
          className={pageInfo.page_num === page ? 'page-item active' : 'page-item'}
          onClick={() => selectPageNumber(pageInfo.page_num)}
        >
          <a className="page-link">{pageInfo.page_num}</a>
        </li>
      );
    });
  }
  return (
    <div className="page-number-control">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageElm}
        </ul>
      </nav>
    </div>
  );
}


export default Pagination;
