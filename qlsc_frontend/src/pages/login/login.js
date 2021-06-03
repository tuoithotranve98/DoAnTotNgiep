import React, { useState ,useEffect} from "react";
import { connect } from "react-redux";
import { login, checkInfoUser, logout } from "./actions/loginAction";
import "./login.scss";
import logo from "../../images/KIOMO.png";
import fb from "../../images/facebook-8-1-2020.svg";
import google from "../../images/gp-btn.svg";
import pushstate from "utils/pushstate";

function LoginPage(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(() => {
    props.onLogout();
  }, [])
  const handleSubmit = () => {
    props.onLogin(user).then((res) => {
      if (res) {
        props.onCheckInfoUser(res).then((json) => {
          if (json) pushstate(props.history, "/maintenance-cards");
        });
      }
    });
  };
  return (
    <div className="root">
      <div maxWidth="lg" className="container">
        <div className="row">
          <div className="col-10 login-warpper">
            <div className="row area-login">
              <div className="col-6">
                <div className="form-login">
                  <div className="div-logo">
                    <img src={logo} alt="" className="logo"></img>
                    {/* <img src={`/images/logo-humg.png`} alt="" className="logo" /> */}
                  </div>
                  <input
                    onChange={(e) => handleChange(e)}
                    className="input"
                    name="email"
                    placeholder="Địa chỉ email"
                    type="email"
                    style={{ width: "100%", margin: "20px 0px", borderRadius: 3 }}
                  />
                  <input
                    onChange={(e) => handleChange(e)}
                    className="input"
                    placeholder="Mật khẩu"
                    type="password"
                    name="password"
                    style={{ width: "100%", margin: "20px 0px", borderRadius: 3 }}
                  />
                  <div
                    className="div-action-login"
                    onClick={() => handleSubmit()}
                  >
                    <button className="btn btn-login" type="submit">
                      Đăng nhập
                    </button>
                  </div>
                  {/* <div style={{ textAlign: "center", marginTop: 15 }}>
                    <p
                      variant="body1"
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        marginBottom: 17,
                      }}
                    >
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
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(login(data)),
  onLogout: () => dispatch(logout()),
  onCheckInfoUser: (token) => dispatch(checkInfoUser(token)),
});
export default connect(null, mapDispatchToProps)(LoginPage);
