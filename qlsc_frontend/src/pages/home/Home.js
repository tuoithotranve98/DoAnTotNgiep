import React, { useEffect, useState } from "react";
import * as Icons from "pages/home/commons/Icons";
import "./styles.scss";
import home1 from "images/Home1.png";
import home2 from "images/Home2.png";
import home3 from "images/home3.png";
import home4 from "images/home4.png";
import home5 from "images/home5.png";
import Guard from 'components/Guard/Guard';
import { connect } from "react-redux";
import { getDataForReport } from "../report/actions/reportAction";
import ReportLeft from "./ReportLeft/ReportLeft";
import { moneyFormat } from "../../utils/moneyFormat";
import moment from "moment";
var randomColor = require("randomcolor"); // import the script
const listAction = [
  {
    id: 1,
    color: "#0088FF",
    icon: <Icons.Product />,
    title: "Bước 1. Thêm linh kiện",
    subtitle: "Tạo mới và quản lý linh kiện của bạn",
    txtButton: "Thêm linh kiện",
    background: "#F2F9FF",
  },
  {
    id: 2,
    color: "#ffbe38",
    icon: <Icons.Customer />,
    title: "Bước 2. Thêm khách hàng",
    subtitle: "Tạo mới và quản lý khách hàng của bạn",
    txtButton: "Thêm khách hàng",
    background: "#FFFBF2",
  },
  {
    id: 3,
    color: "#3fda9e",
    icon: <Icons.MainCard />,
    title: "Bước 3. Thêm phiếu",
    subtitle: "Tạo mới và quản lý phiếu sửa chữa của bạn",
    txtButton: "Thêm phiếu",
    background: "#F3FCF9",
  },
];
const data2 = [
  {
    id: 1,
    img: home3,
    title: "Cách tính vòng quay hàng tồn kho chính xác",
    subtitle: "Quản lý kho",
    link: "",
  },
  {
    id: 2,
    img: home4,
    title: "Cách vẽ sơ đồ kho hàng và mẫu sơ đồ kho đơn giản",
    subtitle: "Quản lý kho",
    link: "",
  },
  {
    id: 3,
    img: home5,
    title: "Tổng hợp các loại giấy in hóa đơn bán lẻ tốt nhất",
    subtitle: "Thiết bị bán hàng",
    link: "",
  },
];

const data1 = [
  {
    id: 1,
    icon: <Icons.IconSetting />,
    title: "Cập nhật",
    subtitle: "Những tính năng HOT...",
    link: "",
  },
  {
    id: 2,
    icon: <Icons.IconNews />,
    title: "Tin tức",
    subtitle: "Thất thoát tiền hàng, quên...",
    link: "",
  },
  {
    id: 3,
    icon: <Icons.IconSale />,
    title: "Khuyến mãi",
    subtitle: "Đồng giá chỉ 23k giao hàng...",
    link: "",
  },
];

const convertUnixToDate = (unix) => {
  return moment.unix(unix).format("DD/MM/YYYY");
};

function Home(props) {
  const { onGetDataForReport } = props;
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const s = convertUnixToDate(moment().subtract(6, "days").unix());
    const e = convertUnixToDate(moment().unix());
    onGetDataByFilter(s, e);
  }, []);

  useEffect(() => {
    if (data) setShow(true);
  }, [data])

  const onGetDataByFilter = (from, to) => {
    onGetDataForReport(from, to).then((json) => {
      if (json) setData(json);
    });
  };
  

  const getMoney = () => {
    const businessToday = data.businessToday;
    if (businessToday) {
      return `${moneyFormat(businessToday.totalMoney)} đ`;
    }
    return `0 đ`;
  };

  const getMaintenanceCard = () => {
    const businessToday = data.businessToday;
    return businessToday.totalMaintenanceCard || 0;
  };

  const getMaintenanceCardRepair = () => {
    const businessToday = data.businessToday;
    return businessToday.totalMaintenanceCardRepair || 0;
  };

  const getMaintenanceCardFinish = () => {
    const businessToday = data.businessToday;
    return businessToday.totalMaintenanceCardSuccess || 0;
  };

  return (
    <React.Fragment>
      <div className="home-container">
        {!show ? (
          <div className="icon-back" onClick={() => setShow(true)}>
            <Icons.IconBack />
            <span>Bỏ qua trang giới thiệu</span>
          </div>
        ) : (
          ""
        )}
        <div
          className="d-flex"
          style={{ marginTop: `${!show ? "0px" : "45px"}` }}
        >
          <div className="col-md-8-left">
            {show ? (
              <React.Fragment>
                <div className="card content-03">
                  <div className="header">Kết quả kinh doanh trong ngày</div>
                  <div className="d-flex content">
                    <div className="d-flex item">
                      <div className="icon">
                        <Icons.IconTotal />
                      </div>
                      <div className="sub-content">
                        <div className="title">Doanh thu</div>
                        <div className="sub-title" style={{ color: "#0088FF" }}>
                          {getMoney()}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex item">
                      <div className="icon">
                        <Icons.IconMainCard1 />
                      </div>
                      <div className="sub-content">
                        <div className="title">Phiếu sửa mới</div>
                        <div className="sub-title" style={{ color: "#0FD186" }}>
                          {getMaintenanceCard()} phiếu
                        </div>
                      </div>
                    </div>
                    <div className="d-flex item">
                      <div className="icon">
                        <Icons.IconMainCard2 />
                      </div>
                      <div className="sub-content">
                        <div className="title">Phiếu đang sửa</div>
                        <div className="sub-title" style={{ color: "#FFAE06" }}>
                          {getMaintenanceCardRepair()} phiếu
                        </div>
                      </div>
                    </div>
                    <div className="d-flex item">
                      <div className="icon">
                        <Icons.IconMainCard3 />
                      </div>
                      <div className="sub-content">
                        <div className="title">Phiếu hoàn thành</div>
                        <div className="sub-title" style={{ color: "#4D5FFF" }}>
                          {getMaintenanceCardFinish()} phiếu
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" content-05">
                  <div className="content">
                    <ReportLeft data={data}></ReportLeft>
                  </div>
                </div>
                <div className="d-flex content-04">
                  <div className="card content-04-left">
                    <div className="header">Top linh kiện</div>
                    <div className="content">
                      {data.topAccessories &&
                        data.topAccessories.length &&
                        data.topAccessories.map((item, index) => {
                          return (
                            <div className="d-flex item" key={index}>
                              <div
                                className="icon"
                                style={{ background: randomColor() }}
                              >
                                <span className="icon-index">{`0${
                                  index + 1
                                }`}</span>
                              </div>
                              <div className="d-flex sub-content">
                                <div className="left">
                                  <div className="title">{item.name || ""}</div>
                                  <div className="sub-title">
                                    {item.code.toUpperCase() || ""}
                                  </div>
                                </div>
                                <div className="right">
                                  <div className="total">
                                    {item.money ? moneyFormat(item.money) : 0} đ
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="card content-04-right">
                    <div className="header">Nhân viên nổi bật</div>
                    <div className="content">
                      {data.topStaffs &&
                        data.topStaffs.length &&
                        data.topStaffs.map((item, index) => {
                          return (
                            <div className="d-flex item" key={index}>
                              <div className="sub-content">
                                <div className="title">{item.name || ""}</div>
                                <div className="sub-title">
                                  {item.money ? moneyFormat(item.money) : 0} đ
                                </div>
                              </div>
                              {index === 0 ? (
                                <div className="d-flex star">
                                  <Icons.Star />
                                  <Icons.Star />
                                  <Icons.Star />
                                </div>
                              ) : index === 2 ? (
                                <div className="d-flex star">
                                  <Icons.Star />
                                  <Icons.Star />
                                </div>
                              ) : (
                                <div className="d-flex star">
                                  <Icons.Star />
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Guard />
                {/* <div className="card content-01">
                  <div className="header">
                    <div className="title">
                      Chào mừng Nguyễn Thu Hà, bắt đầu sử dụng phần mềm Kiomo
                      ngay nào!
                    </div>
                    <div className="sub-title">
                      Hãy dành ít phút thực hiện các bước sau đây để làm quen
                      bạn nhé.
                    </div>
                  </div>
                  <div className="d-flex content">
                    {listAction.map((item, index) => {
                      return (
                        <div
                          className="list-action"
                          style={{ backgroundColor: `${item.background}` }}
                        >
                          <div className="icon">{item.icon}</div>
                          <div className="title">{item.title}</div>
                          <div className="sub-title">{item.subtitle}</div>
                          <div className="d-flex dlv-button-save">
                            <div className="icon-button">
                              <svg
                                width="14"
                                height="15"
                                viewBox="0 0 14 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14 8.27246H8V14.2725H6V8.27246H0V6.27246H6V0.272461H8V6.27246H14V8.27246Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                            <div className="separate">
                              <svg
                                width="2"
                                height="20"
                                viewBox="0 0 2 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.228516"
                                  width="1"
                                  height="20"
                                  fill="#0088FF"
                                />
                              </svg>
                            </div>
                            <span>{item.txtButton}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="card content-02">
                  <div className="header">Có thể bạn quan tâm</div>
                  <div className="content">
                    {data2.map((item, index) => {
                      return (
                        <React.Fragment>
                          <div className="d-flex item" key={index}>
                            <div className="img">
                              <img src={item.img} alt=""></img>
                            </div>
                            <div className="content">
                              <p className="title">{item.title}</p>
                              <p className="sub-title">{item.subtitle}</p>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div> */}
              </React.Fragment>
            )}
          </div>
          <div className="col-md-4-right">
            <div className="image">
              <div>
                <img src={home1} alt=""></img>
              </div>
              <div>
                <img src={home2} alt=""></img>
              </div>
            </div>
            <div className="card noti">
              <div className="header">Thông báo</div>
              <div className="content">
                {data1.map((item, index) => {
                  return (
                    <React.Fragment>
                      <div className="d-flex item" key={index}>
                        <div className="icon">{item.icon}</div>
                        <div className="content">
                          <p className="title">{item.title}</p>
                          <p className="sub-title">{item.subtitle}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            {/* <div className="card content-02">
              <div className="header">Có thể bạn quan tâm</div>
              <div className="content">
                {data2.map((item, index) => {
                  return (
                    <React.Fragment>
                      <div className="d-flex item" key={index}>
                        <div className="img">
                          <img src={item.img} alt=""></img>
                        </div>
                        <div className="content">
                          <p className="title">{item.title}</p>
                          <p className="sub-title">{item.subtitle}</p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
const mapDispatchToProps = (dispatch) => ({
  onGetDataForReport: (from, to) => dispatch(getDataForReport(from, to)),
});
export default connect(null, mapDispatchToProps)(Home);
