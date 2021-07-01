import React, { useState } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { closeProgressBar } from "../actions/notificationAction";

function ProgressBar(props) {
  const { notifications, onCloseProgressBar } = props;
  const [load] = useState(false);
  const handleCloseModal = () => {
    onCloseProgressBar();
  };
  if (!load) return null;
  if (!notifications.length) return null;
  return (
    <div id="wrapper-progress-bar">
      <div className="progressbar_updating">
        <div className="updating1">
          <div className="headerr">
            <p className="title">Thông báo về các trạng thái phiếu sửa chữa</p>
            <button
              className="closes"
              type="button"
              onClick={() => handleCloseModal()}
            >
              <span>×</span>
            </button>
          </div>
          {notifications.map((item, index) => {
            return (
              <div className="in4-title" key={index}>
                <div className="in4-title-noti">- {item.title || ""}</div>
                <div className="in4-title-detail">{item.content || ""}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    notification: { notifications },
  } = state;
  return {
    notifications,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseProgressBar: () => dispatch(closeProgressBar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
