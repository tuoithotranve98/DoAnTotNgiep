import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCustomer, getCustomerById } from "../actions/customerAction";
import { getWard, receiveWard } from "../actions/locationActions";
import SelectDistricts from "./SelectAddress/SelectDistricts";
import SelectWards from "./SelectAddress/SelectWards";
import Guard from "components/loading/Guard";
import pushstate from "utils/pushstate";
import "../styles/addCustomer.scss";

const initialState = {
  name: null,
  code: null,
  phone: null,
  email: null,
  address: null,
  city: null,
  ward: null,
  description: null,
  loading: true,
};

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ loading: true });
      this.props.onGetCustomer(this.props.match.params.id).then((json) => {
        if (json) {
            if (json.ward && json.ward.district && json.ward.district.code) {
                const wardCode = json.ward && json.ward.code;
                const _city = this.props.cities.find((item) => item.code === json.ward.district.code);
                if (_city) this.setState({ city: _city });
                this.props.onGetWard(json.ward.district.code).then((json) => {
                    if (json) {
                        const _ward = json.find((item) => item.code === wardCode);
                        if (_ward) this.setState({ ward: _ward });
                    }
                });
            }
          this.setState({
            loading: false,
            name: json.name,
            phone: json.phone,
            code: json.code,
            email: json.email,
            address: json.address,
          });
        }
      });
    }
  }

  onUpdateCustomer() {
    const { name, code, phone, email, address, city, ward } = this.state;
    const customer = { name, code, phone, email, address, city, ward };
    const id = this.props.match.params.id || '';
    this.props.onUpdateCustomer(id, customer).then((json) => {
      if (json && json.success) {
        console.info('Cập nhật thông tin khách hàng thành công');
        this.setState({ initialState });
        this.props.onClearWards();
        pushstate(this.props.history, "/customer");
      }
    });
  }

  onCancel() {
    this.setState({ initialState });
    this.onRedirectCustomers();
    this.props.onClearWards();
  }

  onChangeName(name) {
    if (name && name.length > 80) {
      console.log("Tên khách hàng không quá 80 kí tự");
    } else {
      this.setState({ name: name });
    }
  }

  onChangeCode(code) {
    if (code && code.length > 20) {
      console.log("Mã khách hàng không quá 20 kí tự");
    } else {
      this.setState({ code: code });
    }
  }

  onChangePhone(phone) {
    if (phone && phone.length > 11) {
      console.log("Số điện thoại không quá 11 kí tự");
    } else {
      this.setState({ phone: phone });
    }
  }

  onChangeEmail(email) {
    if (email && email.length > 40) {
      console.log("Số điện thoại không quá 40 kí tự");
    } else {
      this.setState({ email: email });
    }
  }

  onChangeAddress(address) {
    if (address && address.length > 80) {
      console.log("Số điện thoại không quá 80 kí tự");
    } else {
      this.setState({ address: address });
    }
  }

  onChangeSelectDistrict(id) {
    const { cities } = this.props;
    if (id) {
      const district = Object.values(cities).find(
        (item) => item.id === parseInt(id)
      );
      if (district) {
        this.props.onGetWard(district.code);
        this.setState({ city: district });
      }
    }
  }

  onChangeSelectWard(id) {
    const { wards } = this.props;
    if (id) {
      const ward = Object.values(wards).find(
        (item) => item.id === parseInt(id)
      );
      if (ward) this.setState({ ward: ward });
    }
  }

  header() {
    return (
      <div className="ui-title-bar-container">
        <div className="ui-title-bar">
          <div
            className="ui-title-bar__navigation"
            onClick={() => this.onRedirectCustomers()}
          >
            Danh sách khách hàng
          </div>
          <div className="ui-title-bar__main-group">
            <h1 className="ui-title-bar__title">Cập nhật khách hàng</h1>
          </div>
        </div>
      </div>
    );
  }

  customerMainInfo() {
    const { name, phone, code, email, address } = this.state;
    return (
      <div className="customer-create-left">
        <div className="page-info">
          <div className="page-info-body">
            {/* customer-name */}
            <div className="col-12 field p-0">
              <div className="label mb-2 label-required">Tên khách hàng</div>
              <input
                className="customer-name"
                type="text"
                name="name"
                value={name || ""}
                onChange={(e) => this.onChangeName(e.target.value)}
              />
            </div>
            {/* customer-code */}
            <div className="col-6 field pl-0">
              <div className="label mb-2">Mã khách hàng</div>
              <input
                className="customer-name"
                type="text"
                name="code"
                value={code || ""}
                onChange={(e) => this.onChangeCode(e.target.value)}
              />
            </div>
            {/* customer-group */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Nhóm khách hàng</div>
              <input className="customer-name" type="text" name="group" />
            </div>
            {/* customer-phone */}
            <div className="col-6 field pl-0">
              <div className="label mb-2">Số điện thoại</div>
              <input
                className="customer-name"
                type="text"
                name="phone"
                value={phone || ""}
                onChange={(e) => this.onChangePhone(e.target.value)}
              />
            </div>
            {/* customer-email */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Email</div>
              <input
                className="customer-name"
                type="text"
                name="email"
                value={email || ""}
                onChange={(e) => this.onChangeEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="page-info">
          <div className="page-info-title">Thông tin địa chỉ</div>
          <div className="page-info-body">
            {/* customer-address */}
            <div className="col-6 field pl-0">
              <div className="label mb-2">Địa chỉ</div>
              <input
                className="customer-name"
                type="text"
                name="address"
                value={address || ""}
                onChange={(e) => this.onChangeAddress(e.target.value)}
              />
            </div>
            {/* customer-cityDistrict */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Khu vực</div>
              <div
                id="editting-customer-address-district"
                ref={(e) => {
                  this.selectDistrict = e;
                }}
                // className="customer-name"
              >
                <SelectDistricts
                  city={this.state.city}
                  onSelect={(e) => this.onChangeSelectDistrict(e.target.value)}
                  ref={this.setCityRef}
                />
              </div>
            </div>
            {/*  */}
            <div className="col-6 field pl-0" />
            {/* customer-ward */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Phường xã</div>
              <div
                id="editting-customer-address-ward"
                ref={(el) => {
                  this.selectWard = el;
                }}
              >
                <SelectWards
                  city={this.state.city}
                  ward={this.state.ward}
                  onSelect={(e) => this.onChangeSelectWard(e.target.value)}
                  ref={this.setWardRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  customerDifferentInfo() {
    return (
      <div className="customer-create-right">
        <div className="page-info">
          <div className="page-info-title">Thông tin khác</div>
          <div className="page-info-body">
            {/* choose-customer */}
            <div className="col-12 field p-0">
              <div className="label mb-2">Nhân viên phụ trách</div>
              <div className="select__wrapper " id="search-account-wrap">
                {/* <a
                      class="customer-select select--a select-suggest"
                      id="search-account"
                      href="javascript:"
                      data-original-title=""
                      title=""
                    >
                      Chọn nhân viên
                    </a> */}
                <div className="filter-body--suggest"></div>
              </div>
            </div>
            {/* customer-description */}
            <div className="page-info-item col-12 no-padding mb-4">
              <div className="page-info-item-title">Mô tả</div>
              <textarea
                bind="description"
                className="customer-textbox"
                style={{ height: "60px" }}
              ></textarea>
            </div>
            {/* customer-description */}
            <div className="page-info-item col-12 no-padding mb-4">
              <div className="page-info-item-title">TAG</div>
              <textarea
                bind="description"
                className="customer-textbox"
                style={{ height: "60px" }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  customnerBottom() {
    return (
      <div className="ui-title-bottom-bar">
        <a
          className="btn btn-default right btn-create-customer"
          onClick={() => this.onUpdateCustomer()}
        >
          Lưu
        </a>
        <a className="btn btn-blank right mr-3" onClick={() => this.onCancel()}>
          Huỷ
        </a>
      </div>
    );
  }
  render() {
    console.log("this.state", this.state);
    const headerElm = this.header();
    const createLeftElm = this.customerMainInfo();
    const createRightElm = this.customerDifferentInfo();
    const saveAndCancelElm = this.customnerBottom();
    if (this.state.loading) {
      return (
        <div className="wrapper-add-customer">
          {headerElm}
          <Guard />
        </div>
      );
    }
    return (
      <div className="wrapper-add-customer">
        {headerElm}
        <div className="customer-container container">
          {createLeftElm}
          {createRightElm}
        </div>
        {saveAndCancelElm}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    locations: { city, ward },
  } = state;
  return {
    cities: Object.values(city),
    wards: Object.values(ward),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetWard: (id) => dispatch(getWard(id)),
  onClearWards: () => dispatch(receiveWard([])),
  onGetCustomer: (id) => dispatch(getCustomerById(id)),
  onUpdateCustomer: (id, customer) => dispatch(updateCustomer(id, customer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer);
