import React from "react";
import { connect } from "react-redux";
import pushstate from "utils/pushstate";
import "./styles.scss";


function StaffInfo () {

  // const onSaveCustomer = () => {
  //   const { name, code, phone, email, address, city, ward } = this.state;
  //   const customer = { name, code, phone, email, address, city, ward };
  //   this.props.onSaveCustomer(customer).then((json) => {
  //     if (json && json.success) {
  //       this.setState({ initialState });
  //       this.props.onClearWards();
  //       pushstate(this.props.history, "/customer");
  //     }
  //   });
  // }

  // const onCancel = () => {
  //   this.setState({ initialState });
  //   this.onRedirectCustomers();
  //   this.props.onClearWards();
  // }

  // const onRedirectCustomers = () => {
  //   pushstate(this.props.history, "/customer");
  // }

  // const onChangeName = (e) => {
  //   if (e && e.length > 80) {
  //     console.log("Tên khách hàng không quá 80 kí tự");
  //   } else {
  //     this.setState({ name: e });
  //   }
  // }

  // const onChangeCode = (code) => {
  //   if (code && code.length > 20) {
  //     console.log("Mã khách hàng không quá 20 kí tự");
  //   } else {
  //     this.setState({ code: code });
  //   }
  // }

  // const onChangePhone = (phone) => {
  //   if (phone && phone.length > 11) {
  //     console.log("Số điện thoại không quá 11 kí tự");
  //   } else {
  //     this.setState({ phone: phone });
  //   }
  // }

  // const onChangeEmail = (email) =>{
  //   if (email && email.length > 40) {
  //     console.log("Số điện thoại không quá 40 kí tự");
  //   } else {
  //     this.setState({ email: email });
  //   }
  // }

  // const onChangeAddress = (address) => {
  //   if (address && address.length > 80) {
  //     console.log("Số điện thoại không quá 80 kí tự");
  //   } else {
  //     this.setState({ address: address });
  //   }
  // }

  // const onChangeSelectDistrict = (id) => {
  //   const { cities } = this.props;
  //   if (id) {
  //     const district = Object.values(cities).find(
  //       (item) => item.id === parseInt(id)
  //     );
  //     if (district) {
  //       this.props.onGetWard(district.code);
  //       this.setState({ city: district });
  //     }
  //   }
  // }

  // const onChangeSelectWard = (id) => {
  //   const { wards } = this.props;
  //   if (id) {
  //     const ward = Object.values(wards).find(
  //       (item) => item.id === parseInt(id)
  //     );
  //     if (ward) this.setState({ ward: ward });
  //   }
  // }

  const customerMainInfo = () =>{
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
                // onChange={(e) => this.onChangeName(e.target.value)}
              />
            </div>
            {/* customer-code */}
            <div className="col-6 field pl-0">
              <div className="label mb-2">Mã khách hàng</div>
              <input
                className="customer-name"
                type="text"
                name="code"
                // onChange={(e) => this.onChangeCode(e.target.value)}
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
                // onChange={(e) => this.onChangePhone(e.target.value)}
              />
            </div>
            {/* customer-email */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Email</div>
              <input
                className="customer-name"
                type="text"
                name="email"
                // onChange={(e) => this.onChangeEmail(e.target.value)}
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
                // onChange={(e) => this.onChangeAddress(e.target.value)}
              />
            </div>
            {/* customer-cityDistrict */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Khu vực</div>
              <div
                id="editting-customer-address-district"
                // ref={(e) => {
                //   this.selectDistrict = e;
                // }}
                // className="customer-name"
              >
                {/* <SelectDistricts
                  city={this.state.city}
                  onSelect={(e) => this.onChangeSelectDistrict(e.target.value)}
                  ref={this.setCityRef}
                /> */}
              </div>
            </div>
            {/*  */}
            <div className="col-6 field pl-0" />
            {/* customer-ward */}
            <div className="col-6 field pr-0">
              <div className="label mb-2">Phường xã</div>
              <div
                id="editting-customer-address-ward"
                // ref={(el) => {
                //   this.selectWard = el;
                // }}
              >
                {/* <SelectWards
                  city={this.state.city}
                  ward={this.state.ward}
                  onSelect={(e) => this.onChangeSelectWard(e.target.value)}
                  ref={this.setWardRef}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const createLeftElm = customerMainInfo();
  return (
    <div className="wrapper-add-customer">
      <div className="customer-container container">
        {createLeftElm}
      </div>
    </div>
  );
}



export default React.memo(connect(null, null)(StaffInfo));
