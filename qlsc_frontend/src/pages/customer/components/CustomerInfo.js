import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCustomerById } from "../actions/customerAction";
import pushstate from "utils/pushstate";
import Guard from "components/loading/Guard";
import "../styles/customerInfo.scss";

function CustomerInfo(props) {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    if (props.match.params.id) {
      const id = props.match.params.id;
      setLoading(true);
      props.onGetCustomer(id).then((json) => {
        if (json) {
          setLoading(false);
          setCustomer(json);
        }
      });
    }
  }, []);
  const onRedirectCustomers = () => {
    pushstate(props.history, "/customer");
  };

  const onRedirectUpdateCustomer = (id) => {
    pushstate(props.history, `/customer/${id}/edit`);
  };
  const header = () => {
    return (
      <div className="ui-title-bar-container">
        <div className="ui-title-bar">
          <div
            className="ui-title-bar__navigation"
            onClick={() => onRedirectCustomers()}
          >
            Danh sách khách hàng
          </div>
          <div className="ui-title-bar__main-group">
            <h1 className="ui-title-bar__title">
              {(customer && customer.name) || "Khách hàng"}
            </h1>
          </div>
        </div>
      </div>
    );
  };

  const item = (type, content) => {
    return (
      <div className="line-info d-flex">
        <label>{type}</label>
        <div className="content">: {content}</div>
      </div>
    );
  };

  const content = () => {
    if (loading) return <Guard />;
    return (
      <React.Fragment>
        <div className="customer-info">
          <div className="customer-info-title">
            Thông tin các nhân
            <div
              className="customer-sources"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Thao tác khác
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li
                className="dropdown-item"
                onClick={() => onRedirectUpdateCustomer(props.match.params.id)}
              >
                <a href="#"> Cập nhật thông tin</a>
              </li>
              <li className="dropdown-item" href="#">
                <a href="#">Xóa khách hàng</a>
              </li>
            </ul>
          </div>
          <div className="customer-info-body">
            <div className="page-info-body--sub d-flex pb-0">
              <div className="col-4 p-0">
                {item("Mã khách hàng", (customer && customer.code) || "--")}
                {item("Tên khách hàng", (customer && customer.name) || "--")}
                {item(
                  "Số điện thoại",
                  (customer && customer.phone) || "--"
                )}
                {item("Email", (customer && customer.email) || "--")}
              </div>
              <div className="col-4 p-0">
                {item("Mã khách hàng", (customer && customer.code) || "--")}
                {item("Tên khách hàng", (customer && customer.name) || "--")}
                {item(
                  "Số điện thoại",
                  (customer && customer.phone) || "--"
                )}
                {item("Email", (customer && customer.email) || "--")}
              </div>
              <div className="col-4 p-0">
                {item("Mã khách hàng", (customer && customer.code) || "--")}
                {item("Tên khách hàng", (customer && customer.name) || "--")}
                {item(
                  "Số điện thoại",
                  (customer && customer.phone) || "--"
                )}
                {item("Email", (customer && customer.email) || "--")}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="wrapper-customer-info">
      {header()}
      <div className="customer-container container">{content()}</div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onGetCustomer: (id) => dispatch(getCustomerById(id)),
});

export default connect(null, mapDispatchToProps)(CustomerInfo);
