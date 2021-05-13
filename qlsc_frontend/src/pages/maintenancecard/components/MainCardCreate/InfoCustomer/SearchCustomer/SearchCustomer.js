/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
import React, { useState, useRef, useEffect } from "react";
import Input from "components/input/Input";
import debounce from "utils/debounce";
import "./styles.scss";
import { connect } from "react-redux";
import OrderListSearch from "./OrderListSearch/OrderListSearch";
import { IconIsEmptyOrder } from "../../../../../product/commons/Icons";
import * as Icons from 'pages/maintenancecard/commons/Icons'
import { getFilterCustomers } from "../../../../../customer/actions/customerAction";

let timeOut;
function SearchCustomer(props) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [metaData, setMetaData] = useState({});
  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const onChangeText = (e) => {
    e.persist();
    setSearch(e.target.value);
    onSearch(e.target.value);
  };
  const inputRef = useRef();

  const debounceScroll = debounce((e) => {
    onScroll(e, false);
  }, 500);

  const onSearch = (value) => {
    setFetching(true);
    setList([]);
    setMetaData({});
    setSearch(value);
    debounceSearch(value, true, 1);
  };

  const onFocus = () => {
    setFetching(true);
    getListCustomerAction(search || '', undefined, 1);
    setFocus(true);
  };

  const onBlur = () => {
    setTimeout(() => {
      setList([]);
      setMetaData({});
      setFocus(false);
      setFetching(true);
    }, 0);
  };

  const debounceSearch = debounce((value, reset, p) => {
    getListCustomerAction(value, reset, p);
  }, 400);

  const getListCustomerAction = (s, reset, p) => {
    const option={};
    option.page=p;
    props.getFilterCustomers(search, option).then(json => {
      setFetching(false);
        if (json && json.customers) {
          const { customers, currentPage, totalItems, totalPages } = json;
          const temp= {};
          temp.page = currentPage
          temp.total = totalPages
          const newOrder = customers;
          setMetaData(temp);
          if (reset) {
            setList([...newOrder]);
          } else {
            setList(list.concat([...newOrder]));
          }
      }
    });
  };

  const onScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <=
      500
    ) {
      if (metaData.page < metaData.total) {
        getListCustomerAction(search, false, metaData.page + 1);
      }
    }
  };

  const renderSearch = () => {
    return (
      <div className="position-absolute list-customer-main-card-search-wrapper">
        <div onMouseDown={(e)=>{
         props.setShowModalCustomer(true)
        }} className="d-flex align-items-center head" style={{ borderBottom: `${list.length > 0 ? 'none' : '1px solid #e3e3e3'}`}}>
          <div className="image-create">
            <Icons.IconCustomerIsEmpty />
          </div>
          <div className="text" style={{ marginLeft: 10 }}>Thêm mới khách hàng</div>
        </div>
        <div
          className="list-item-search"
          onScroll={(e) => {
            e.persist();
            e.stopPropagation();
            debounceScroll(e);
          }}
        >
          <OrderListSearch
            onClick={(item) => {
              props.setCustomer(item);
              setShow(false);
              setSearch('');
            }}
            list={list}
            fetching={fetching}
            setShowFilterCustomer={(a)=>props.setShowFilterCustomer(a)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between position-relative search-maintenancecard-container">
      <div className="position-relative search-wrapper">
        <Input
          onChange={(e) => onChangeText(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeHolder="Tìm kiếm khách hàng theo tên khách hàng, số điện thoại"
        />
      </div>
      {focus ? renderSearch() : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getFilterCustomers: (search, page) => dispatch(getFilterCustomers(search, page)),
})
export default connect(null, mapDispatchToProps)(SearchCustomer);
