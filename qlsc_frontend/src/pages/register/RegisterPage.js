import React, { useState } from "react";
import "./styles.scss";
import * as Icons from "./Icons";
import { API_USER } from "constants/api";
import callApi from "utils/callApi";
import history from '../../utils/history';
import pushstate from "../../utils/pushstate";
import { toastError, toastSuccess } from "../../utils/toast";

function RegisterPage() {
  const [tenant, setTenant] = useState({
    email: "",
    full_name: "",
    name_tenant: "",
    phone_number: "",
    password: "",
  });
  const [messageError, setMessageError] = useState('')
  const onChangeTenant = () => {
    const { name, value } = event.target;
    setTenant({ ...tenant, [name]: value });
  };

  const onSummit = () => {
    if(!tenant.full_name) {
      toastError("Vui lòng nhập Họ và tên");
      return;
    }
    if(!tenant.email) {
      toastError("Vui lòng nhập email");
      return;
    }
    if(!tenant.name_tenant) {
      toastError("Vui lòng nhập Tên cửa hàng");
      return;
    }
    if(!tenant.phone_number) {
      toastError("Vui lòng nhập Số điện thoại");
      return;
    }
    if(!tenant.password) {
      toastError("Vui lòng nhập email");
      return;
    }
   
    const options = {
      method: "POST",
      data: tenant,
    };
    const url = API_USER + "/tenant";
    callApi(url, options)
      .then((res) => {
        if (res?.data?.success) {
          toastSuccess("Đăng ký cửa hàng thành công");
          pushstate(history, '/login')
        } else{
          setMessageError()
          toastError(res.data.message || 'Có lỗi xảy ra khi đăng ký cửa hàng');
        }
      })
      .catch((err) => {
        return err;
      });
  };
  return (
    <div className="register-wapper">
      <div className="go-back back-login">
        <span>
          <svg
            style={{ width: 10, height: 12, marginTop: 6 }}
            width="12"
            height="23"
            viewBox="0 0 12 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1985 1.98609L9.49041 0L0 11.1087L9.5 22.2173L11.1985 20.2312L3.39697 11.1087L11.1985 1.98609Z"
              fill="#212B35"
            />
          </svg>
        </span>
        <div style={{ marginTop: 4 }}>
          <span onClick={() => history.push("/login")}>Quay lại Đăng nhập&nbsp;</span>
        </div>
      </div>
      <div className="content-wapper">
        <div className="logo">
          <Icons.IconLogo />
        </div>
        <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="field form-group">
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="full_name"
                    // style={isInvalidName ? { border: "1px solid red" } : {}}
                    // onBlur={() => onBlurName()}
                    value={tenant.full_name}
                    onChange={(e) => onChangeTenant(e)}
                    placeholder="Họ tên của bạn"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="field form-group">
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="email"
                        // style={isInvalidName ? { border: "1px solid red" } : {}}
                        // onBlur={() => onBlurName()}
                        value={tenant.email}
                        onChange={(e) => onChangeTenant(e)}
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="field form-group">
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="phone_number"
                        // style={isInvalidName ? { border: "1px solid red" } : {}}
                        // onBlur={() => onBlurName()}
                        value={tenant.phone_number}
                        onChange={(e) => onChangeTenant(e)}
                        placeholder="Nhập số điện thoại của bạn"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="field form-group">
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="name_tenant"
                        // style={isInvalidName ? { border: "1px solid red" } : {}}
                        // onBlur={() => onBlurName()}
                        value={tenant.name_tenant}
                        onChange={(e) => onChangeTenant(e)}
                        placeholder="Tên cửa hàng của bạn"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="field form-group">
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="password"
                        type="password"
                        // style={isInvalidName ? { border: "1px solid red" } : {}}
                        // onBlur={() => onBlurName()}
                        value={tenant.password}
                        onChange={(e) => onChangeTenant(e)}
                        placeholder="Mật khẩu của bạn"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row btn-btn">
                <div className="btn-register-tenant" onClick={onSummit}>
                  <div className="text">Đăng ký tài khoản</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <Icons.backgoundRegister />
      </div>
    </div>
  );
}
export default RegisterPage;
