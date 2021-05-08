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

const dataFake = [
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
  {
    id: 1008,
    createdDate: 1620315195612,
    modifiedDate: 1620315195612,
    name: "Manh Bui",
    phone: "0347488811",
    code: "KH001",
    email: "manhbui@gmail.com",
    description: "abc",
    ward: {
      id: 0,
      name: "Phường Đồng Xuân",
      code: "00040",
      district: {
        id: 0,
        name: "Quận Hoàn Kiếm",
        code: "002",
        province: {
          name: null,
          code: null,
        },
        text: "Quận Hoàn Kiếm - Hà Nội",
      },
      text: "Phường Đồng Xuân",
    },
    address: "Bắc Từ Liêm - Cầu Giấy - Hà Nội",
    status: 1,
    payStatus: null,
    totalNotPay: 0,
    currentDebt: null,
  },
];
let timeOut;
function SearchCustomer(props) {
  const { getListCustomer } = props;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState(dataFake);
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
      console.log("json", json);
        if (json && json.customers) {
          const { customers, currentPage, totalItems, totalPages } = json;
          const temp= {};
          temp.page = currentPage
          temp.total = totalPages
          const newOrder = customers;
          console.log("newOrder", newOrder);
          setMetaData(temp);
          if (reset) {
            setList([...newOrder]);
          } else {
            setList(list.concat([...newOrder]));
          }
          console.log("list ", list);
      }
    });
  };

  const onScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <=
      200
    ) {
      if (metaData.page < metaData.total) {
        getListCustomerAction(search, false, metaData.page + 1);
      }
    }
  };

  const renderSearch = () => {
    return (
      <div className="position-absolute order-list-search-wrapper">
        <div className="d-flex align-items-center head">
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
              // props.addItemOrderCollation(item);
              setShow(false);
              setSearch('');
            }}
            list={list}
            fetching={fetching}
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
