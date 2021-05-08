/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
import React, { useState, useRef, useEffect } from 'react';
import Input from 'components/input/Input';
import debounce from 'utils/debounce';
import './styles.scss';
import { connect } from 'react-redux';


let timeOut;
function Search(props) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [textSearch, setTextSearch] = useState('');
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
  }, 200);

  const onSearch = (value) => {
    setFetching(true);
    setList([]);
    setMetaData({});
    setSearch(value);
    debounceSearch(value, true, 1);
  };

  const onFocus = () => {
    setFetching(true);
    // getOrderCollation(search || '', undefined, 1);
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
    getOrderCollation(value, reset, p);
  }, 400);

  const getOrderCollation = (s, reset, p) => {
    const { filterInfo, locationId, store } = props;
    const selectedStore = [];
    const selectedLocation = [];

    selectedLocation.push(locationId);
    filterInfo.filterText = s;
    filterInfo.selectedStore = selectedStore;
    filterInfo.selectedLocation = selectedLocation;
    // props.fetchFilterOrderCollation(filterInfo, p).then(json => {
    //   setFetching(false);
    //   if (json && json.channel_order_collation && json.metadata) {
    //     const newOrder = json.channel_order_collation;
    //     setMetaData(json.metadata);
    //     if (reset) {
    //       setList([...newOrder]);
    //     } else {
    //       setList(list.concat([...newOrder]));
    //     }
    //   }
    // });
  };

  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <= 200) {
      if (metaData.page < metaData.total) {
        getOrderCollation(search, false, metaData.page + 1);
      }
    }
  };

  const renderSearch = () => {
    return (
      <div className="position-absolute order-list-search-wrapper">
        <div className="d-flex align-items-center head">
          <div className="order-code">
          Mã đơn hàng
          </div>
          <div className="tracking-code">
          Mã vận đơn
          </div>
          <div className="tenant">
          Gian hàng
          </div>
          <div className="order-total-amount">
          Giá trị đơn hàng
          </div>
          <div className="order-ship-fee">
          Phí đơn hàng
          </div>
        </div>
        <div className="list-item-search"
          onScroll={e => {
            e.persist();
            e.stopPropagation();
            debounceScroll(e);
          }}
        >
          <OrderListSearch
            onClick={(item) => {
              // props.addItemOrderCollation(item);
              setShow(false);
              setTextSearch('');
            }}
            list={list}
            fetching={fetching}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex align-items-center justify-content-between position-relative search-order-container">
      <div className="position-relative search-wrapper">
        <Input
          onChange={(e) => onChangeText(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeHolder="Tìm kiếm đơn hàng cần đối soát theo mã đơn hàng, mã vận đơn"
        />
      </div>
      {
        focus ? (
          renderSearch()
        ) : null
      }
    </div>
  );
}


export default connect(null, null)(Search);
