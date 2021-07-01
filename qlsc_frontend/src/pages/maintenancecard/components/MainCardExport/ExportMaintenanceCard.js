import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { convertSecondToDateV1 } from "utils/datetimeUtil";
import { moneyFormat } from "utils/moneyFormat";
import "./styles.scss";

class ExportMaintenanceCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkbox: false,
      dropdownValue: "dog",
    };
  }

  isRender() {
    if (this.props.data !== undefined && this.props.data.info.code !== null) {
      return true;
    } else {
      return false;
    }
  }

  totalMoney() {
    const { mainCard } = this.props;
    let total = 0;
    if (
      mainCard.maintenanceCardDetails &&
      mainCard.maintenanceCardDetails.length
    ) {
      mainCard.maintenanceCardDetails.forEach((item) => {
        total += item.product.pricePerUnit * item.quantity;
      });
    }
    return `${moneyFormat(total)} đ`;
  }

  toPadZeroString(n) {
    return n >= 10 ? `${n}` : `0${n}`;
  }

  renderFinish() {
    const { mainCard } = this.props;
    return (
      <Row style={{ marginTop: 50 }}>
      <Col span={24}>
        <h2>Linh kiện - dịch vụ</h2>
        <table width="100%" border="1">
          <thead>
            <tr>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Mã</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Tên</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                Số lượng
              </td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Giá</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Bảo hành</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                Thành tiền
              </td>
            </tr>
          </thead>
          <tbody>
            {mainCard.maintenanceCardDetails.length &&
              mainCard.maintenanceCardDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {item.product.code.toUpperCase()}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.product.name}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ textAlign: "center" }}>
                      {moneyFormat(item.product.pricePerUnit)} đ
                    </td>
                    <td style={{ textAlign: "center" }}>{item.product.guarantee ? item.product.guarantee : '---'}</td>
                    <td style={{ textAlign: "center" }}>
                      {moneyFormat(item.price)} đ
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          style={{
            textAlign: "right",
            marginTop: 10,
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Tổng tiền : {this.totalMoney()}
        </div>
      </Col>
    </Row>
    );
  }

  renderUnFinish() {
    const { mainCard } = this.props;
    return (
      <Row style={{ marginTop: 50 }}>
      <Col span={24}>
        <h2>Linh kiện - dịch vụ</h2>
        <table width="100%" border="1">
          <thead>
            <tr>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Mã</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Tên</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                Số lượng
              </td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Giá</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>Hoàn thành</td>
              <td style={{ textAlign: "center", fontWeight: "bold" }}>
                Thành tiền
              </td>
            </tr>
          </thead>
          <tbody>
            {mainCard.maintenanceCardDetails.length &&
              mainCard.maintenanceCardDetails.map((item, index) => {
                return (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>
                      {item.product.code.toUpperCase()}
                    </td>
                    <td style={{ textAlign: "center" }}>{item.product.name}</td>
                    <td style={{ textAlign: "center" }}>{item.quantity}</td>
                    <td style={{ textAlign: "center" }}>
                      {moneyFormat(item.product.pricePerUnit)} đ
                    </td>
                    <td style={{ textAlign: "center" }}>{item.product.type ? '---' : ''}</td>
                    <td style={{ textAlign: "center" }}>
                      {moneyFormat(item.price)} đ
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div
          style={{
            textAlign: "right",
            marginTop: 10,
            fontWeight: 600,
            fontSize: 20,
          }}
        >
          Tổng tiền : {this.totalMoney()}
        </div>
      </Col>
    </Row>
    );
  }

  render() {
    const date = new Date();
    const { mainCard } = this.props;
    return (
      <div className="export-maintenance-card">
        <h1 className="herder">Hóa đơn sửa chữa</h1>
        {/* info maintenance*/}
        <Row style={{ marginTop: 60 }}>
          <Col span={18}>
            <h2>Thông tin phiếu sửa chữa</h2>
            <table>
              <tbody>
                <tr>
                  <td>Mã phiếu sửa chữa : </td>
                  <td>
                    {mainCard && mainCard.code && mainCard.code.toUpperCase()}
                  </td>
                </tr>
                <tr>
                  <td>Ngày tạo phiếu : </td>
                  <td>{convertSecondToDateV1(mainCard.createdDate)}</td>
                </tr>
                <tr>
                  <td>Ngày trả xe : </td>
                  <td>
                    {mainCard.returnDate
                      ? convertSecondToDateV1(mainCard.returnDate)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Bảo hành đến hết ngày :</td>
                  <td style={{ paddingLeft: "10px" }}>
                    {" "}
                    ...... / ...... / ............
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col span={3}></Col>
        </Row>
        {/* end info maintenance*/}
        {/* info customer*/}
        <Row style={{ marginTop: 50 }}>
          <Col span={12}>
            <h2>Thông tin khách hàng</h2>
            <table>
              <tbody>
                <tr>
                  <td>Họ và tên : </td>
                  <td style={{ paddingLeft: 10 }}>
                    {mainCard.customer && mainCard.customer.name}
                  </td>
                </tr>
                <tr>
                  <td>Số điện thoại : </td>
                  <td style={{ paddingLeft: 10 }}>
                    {mainCard.customer && mainCard.customer.phone}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col span={12}>
            <h2>Thông tin xe</h2>
            <table>
              <tbody>
                <tr>
                  <td>Biển số xe : </td>
                  <td style={{ paddingLeft: 10 }}>{mainCard.platesNumber}</td>
                </tr>
                <tr>
                  <td>Loại xe : </td>
                  <td style={{ paddingLeft: 10 }}>{mainCard.model}</td>
                </tr>
                <tr>
                  <td>Màu xe : </td>
                  <td style={{ paddingLeft: 10 }}>{mainCard.color}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        {/* end info customer*/}
        {/* product */}
        {this.props.finish ? this.renderFinish() : this.renderUnFinish()}
        {/* end product */}
        {/* info staff */}
        <Row style={{ marginTop: 50 }}>
          <Col span={24}>
            <h2>Thông tin nhân viên</h2>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Nhân viên sửa chữa :</td>
                  <td> {mainCard.repairman.name}</td>
                </tr>
                <tr>
                  <td>Nhân viên điều phối :</td>
                  <td> {mainCard.coordinator.name}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        {/* end info staff */}
        {/* other information */}
        <Row style={{ marginTop: 50 }}>
          <Col span={12}>
            <h2>Ký xác nhận</h2>
          </Col>
          <Col span={12}>
            <div style={{ fontSize: 16 }}>
              Hà Nội, ngày {this.toPadZeroString(date.getDay())}, tháng{" "}
              {this.toPadZeroString(date.getMonth() + 1)}, năm{" "}
              {date.getFullYear()}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <b style={{ textAlign: "center" }}>Người tạo phiếu</b>
          </Col>
          <Col span={12}>
            <b style={{ textAlign: "center" }}>Chủ xe</b>
          </Col>
        </Row>
        {/* end information */}
      </div>
    );
  }
}

export default ExportMaintenanceCard;
