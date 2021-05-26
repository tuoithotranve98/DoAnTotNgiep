/* eslint-disable no-shadow */
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
import { moneyFormat } from "utils/moneyFormat";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { formatDate } from "utils/datetimeUtil";
function PaymentMethod(props) {
  const { mainCardTotal, mainCard } = props;

  const { paymentHistories, workStatus } = mainCard;
  const showStatusHistory = () => {
    let result = [];
    if (paymentHistories !== undefined) {
      const paymentHistories1 = paymentHistories.sort(function (a, b) {
        return new Date(a.createdDate) - new Date(b.createdDate);
      });
      result = paymentHistories1.map((payment, index) => {
        return (
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                {paymentHistories1.length === index + 1 ? (
                  ""
                ) : (
                  <TimelineConnector />
                )}
              </TimelineSeparator>
              <TimelineContent>
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      Đã thanh toán : {index}
                    </span>
                    <p>{payment.paymentMethod.name}</p>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      {formatDate(payment.createdDate)}
                    </span>
                    <p>{payment.money}</p>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        );
      });
    }

    return result;
  };
  return (
    <div className="main-card-payment-method">
      <div className="card-method info-customer-right-01">
        <div
          className="d-flex list-header title"
          style={{
            border: `${
              paymentHistories && paymentHistories.length > 0
                ? "1px solid #e3e3e3 !important"
                : ""
            }`,
          }}
        >
          <div className="header-title">
            <div style={{ fontSize: "20px" }}>Thanh toán</div>
            <div className="text">
              Đã thanh toán: {moneyFormat(props.totalAfterPayment())}đ
            </div>
          </div>
          <div className="header-action">
            {workStatus === 2 && props.user.role === 3 && mainCard.payStatus === 0 ? (
              <button
                className="d-flex align-items-center justify-content-between btn btn-create"
                type="button"
                onClick={() => props.setShowModalPayment(true)}
              >
                <span
                  className="d-flex align-items-center justify-content-center"
                  style={{ marginLeft: 10 }}
                >
                  <Icons.Create />
                </span>
                Thanh toán
              </button>
            ) : (
              ""
            )}
            <div className="text">
              {mainCard.payStatus === 1 ? (
                "Hoàn tất thanh toán"
              ) : (
                <React.Fragment>
                  Còn phải trả:{" "}
                  {moneyFormat(mainCardTotal - props.totalAfterPayment())}đ
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="content">{showStatusHistory()}</div>
      </div>
    </div>
  );
}
PaymentMethod.defaultProps = {};
const mapStateToProps = (state, ownProps) => {
  const { auth : {user } } = state;
  return {
    user
  }
}
export default React.memo(connect(mapStateToProps, null)(PaymentMethod));
