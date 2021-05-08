import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";

function Wrapper(props) {
  const { staff, onChangeFilter } = props;
  const { staffs } = staff;
  const [selectedIds, setSelectedIds] = useState([]);
  const listRef = React.useRef();

  const resetSelected = () => {
    setSelectedIds([]);
  };

  const onClick = () => {
    listRef && listRef.current.onCheckAll();
  };

  const renderCheckInfo = () => {
    return (
      <div className="count-check">
        <span className="details">
          Đã chọn ({selectedIds.length} nhân viên)
        </span>
      </div>
    );
  };

  const child = renderCheckInfo();
  const isEmpty = staff && !staff.totalItem;
  if (isEmpty) {
    return (
      <div className="staff-list-wrapper">
        <div id="staff-filter-empty-wrapper">
          <div id="staff-filter-empty-text">Không có nhân viên</div>
          <div id="staff-filter-empty-icon">
            <Icons.OrderCollationFilterEmpty />
          </div>
        </div>
      </div>
    );
  }
  console.log('staffs', staffs);
  return (
    <React.Fragment>
      <div className="staff-list-wrapper">
        <Header onClick={onClick} checked={false} minus={false} child={child} />
        <List staffs={staffs} />
        <Footer
          onChangeFilter={onChangeFilter}
          staff={staff}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  staff: {},
};
const mapStateToProps = (state) => {
  const { staff } = state;
  return {
    staff,
  };
};

export default withRouter(connect(mapStateToProps, null)(Wrapper));
