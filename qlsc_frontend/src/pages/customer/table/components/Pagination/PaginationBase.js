import React from "react";
import * as Icons from "../../Icons/Icons";
import "./paginationBase.scss";

function PaginationBase(props) {
  const { customer } = props;
  const renderListPage = () => {
    let listPage = [];
    for (let i = 0; i <= 6; i++) {
      listPage.push(i);
    }
    return listPage;
  }
  const page = customer.currentPage;
  const size = customer.customers.length;
  const total = customer.totalPages;
  const listPage = renderListPage(total);
  const maxPage = Math.ceil(total / size);
  return (
    <div id="wrapper-pagination">
      <div id="pagination-count">
        {`Hiển thị kết quả từ ${(page - 1) * size + 1} - ${
          (page * size)
        } trên tổng ${customer.totalItems}`}
      </div>
      {total > 20 ? (
        <div id="pagination-size">
          <div className="pagination-size-text">Hiển thị</div>
          <div className="pagination-size-option">
            <button
              type="button"
              className="dropdown-toggle pagination-size-button"
              data-toggle="dropdown"
            >
              {size}
              <Icons.Arrow />
            </button>
            <div className="dropdown-menu pagination-size-menu">
              <a
                className="dropdown-item pagination-size-item"
                onClick={() => this.selectSize(20)}
              >
                20
              </a>
              <a
                className="dropdown-item pagination-size-item"
                onClick={() => this.selectSize(50)}
              >
                50
              </a>
              <a
                className="dropdown-item pagination-size-item"
                onClick={() => this.selectSize(100)}
              >
                100
              </a>
            </div>
          </div>
          <div className="pagination-size-text">kết quả</div>
        </div>
      ) : null}
      {total > size ? (
        <div id="pagination-page">
          <ul className="ul-pagination">
            {listPage.map((index) => {
              switch (index) {
                case 0:
                  return (
                    <li
                      key={index}
                      className={page === 1 ? "disabled" : ""}
                      onClick={() => this.selectPage(1)}
                    >
                      <a href="#">
                        <span aria-hidden="true">&larr;</span> Trang đầu
                      </a>
                    </li>
                  );
                case listPage.length - 1:
                  return (
                    <li
                      key={index}
                      className={page === maxPage ? "disabled" : ""}
                      onClick={() => this.selectPage(maxPage)}
                    >
                      <a>
                        Trang cuối <span aria-hidden="false">&rarr;</span>
                      </a>
                    </li>
                  );
                default:
                  return (
                    <li
                      key={index}
                      className={index === page ? "active" : ""}
                      onClick={() => this.selectPage(index)}
                    >
                      <a>{index}</a>
                    </li>
                  );
              }
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default PaginationBase;
