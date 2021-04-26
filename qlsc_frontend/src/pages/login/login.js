import React, { useState } from "react";
import { connect } from "react-redux";
import './login.scss';
import logo from '../../images/logo_sapo.svg';
import fb from '../../images/facebook-8-1-2020.svg';
import google from '../../images/gp-btn.svg';
function LoginPage(props) {
  const [sateUser, setSateUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSateUser({ ...sateUser, [name]: value });
  };
  // const onSubmit = (data) => {

  //   login(data);
  // };
  return (
    <div className="root">
      <div maxWidth="lg" className="container">
        <div className="row">
          <div className="col-10 login-warpper">
            <div className="row area-login">
              <div className="col-6">
                <form
                  name="form"
                  // onSubmit={handleSubmit(onSubmit)}
                  className="form-login"
                >
                  <div className="div-logo">
                    <img src={logo} alt="" className="logo"></img>
                  </div>
                  <input
                    onChange={(e) => handleChange(e)}
                    // inputRef={register({ required: true })}
                    name="email"
                    style={{ width: "100%", margin: "20px 0px" }}
                  />
                  {/* {errors.email && "email is required."} */}
                  <input
                    onChange={(e) => handleChange(e)}
                    // inputRef={register({ required: true })}
                    type="password"
                    name="password"
                    style={{ width: "100%", margin: "20px 0px" }}
                  />
                  {/* {errors.password && "password is required."} */}
                  <div className="div-action-login">
                    <button className="btn btn-login" type="submit">
                      Đăng nhập
                    </button>
                  </div>
                  <div className="btn btn-register">
                    <p className="tit">
                      <p
                        style={{ textAlign: 'center'}}
                        className="tit-item"
                      >
                        Hoặc đăng ký
                      </p>
                    </p>
                  </div>
                  <div>
                    <p style={{ textAlign: 'center'}}>
                      Bạn chưa có tài khoản ?{" "}
                      <a style={{ cursor: "pointer" }}>Đăng ký tại đây</a>
                    </p>
                    <p align="center">
                      <a style={{ cursor: "pointer" }}>Quên mật khẩu</a>
                    </p>
                  </div>
                  <div style={{ textAlign: "center", marginTop: 20 }}>
                    <p variant="body1" style={{ marginBottom: 10 }}>
                      Hoặc đăng nhập bằng
                    </p>
                    <a className="login-more">
                      <img
                        src={fb}
                        alt=""
                        style={{ width: 125, height: 37 }}
                      ></img>
                    </a>
                    <a className="login-more">
                      <img
                        src={google}
                        style={{ width: 125, height: 37 }}
                        alt=""
                      ></img>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  // login: (data) => dispatch(loginThunk(data)),
});
export default connect(null, mapDispatchToProps)(LoginPage);
