import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  render() {
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
                    {this.isRender()
                      ? this.props.data.info.code.toUpperCase()
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Ngày tạo phiếu : </td>
                  <td>
                    {this.isRender()
                      ? formatDate(this.props.data.createdDate)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Ngày trả xe : </td>
                  <td>
                    {this.isRender()
                      ? formatDate(this.props.data.info.returnDate)
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
                    {this.isRender() ? this.props.data.customerItem.name : ""}
                  </td>
                </tr>
                <tr>
                  <td>Số điện thoại : </td>
                  <td style={{ paddingLeft: 10 }}>
                    {this.isRender()
                      ? this.props.data.customerItem.phoneNumber
                      : ""}
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
                  <td style={{ paddingLeft: 10 }}>
                    {this.isRender()
                      ? formatPlate(this.props.data.info.platesNumber)
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Loại xe : </td>
                  <td style={{ paddingLeft: 10 }}>
                    {this.isRender() ? this.props.data.info.model : ""}
                  </td>
                </tr>
                <tr>
                  <td>Màu xe : </td>
                  <td style={{ paddingLeft: 10 }}>
                    {this.isRender() ? this.props.data.info.color : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        {/* end info customer*/}
        {/* product */}
        <Row style={{ marginTop: 50 }}>
          <Col span={24}>
            <h2>Sản phẩm</h2>
            <table width="100%" border="1">
              <thead>
                <tr>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Mã sản phẩm
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Tên sản phẩm
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Số lượng
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Giá
                  </td>
                  <td style={{ textAlign: "center", fontWeight: "bold" }}>
                    Thành tiền
                  </td>
                </tr>
              </thead>
              <tbody>
                {this.isRender()
                  ? this.props.data.products.map((product, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>
                          {product.code.toUpperCase()}
                        </td>
                        <td style={{ textAlign: "center" }}>{product.name}</td>
                        <td style={{ textAlign: "center" }}>
                          {product.amount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {formatMonney(product.pricePerUnit)} đ
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {formatMonney(product.pricePerUnit * product.amount)}{" "}
                          đ
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
            <div style={{ textAlign: "right", marginTop: 10 }}>
              Tổng tiền :{" "}
              {this.isRender()
                ? formatMonney(this.props.data.price) + " đ"
                : "1.000.000.000 đ"}
            </div>
          </Col>
        </Row>
        {/* end product */}
        {/* info staff */}
        <Row style={{ marginTop: 50 }}>
          <Col span={24}>
            <h2>Thông tin nhân viên</h2>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Nhân viên sửa chữa : </td>
                  <td>
                    {this.isRender() &&
                    this.props.data.repairman !== null &&
                    this.props.data.repairman !== undefined
                      ? this.props.data.repairman.fullName
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Nhân viên điều phối : </td>
                  <td>
                    {this.isRender()
                      ? this.props.data.coordinator.fullName
                      : ""}
                  </td>
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
            <div>
              Hà Nội, ngày 22, tháng 05, năm 2021
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <b>Người tạo phiếu</b>
          </Col>
          <Col span={12}>
            <b>Chủ xe</b>
          </Col>
        </Row>
        {/* end information */}
      </div>
    );
  }
}

export default ExportMaintenanceCard;
