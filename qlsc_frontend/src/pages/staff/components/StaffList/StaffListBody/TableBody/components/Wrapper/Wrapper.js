import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/staff/commons/Icons";

function Wrapper(props) {
  const { staff, onChangeFilter, filter } = props;
  const { staffs } = staff;
  const [selectedIds, setSelectedIds] = useState([]);
  const listRef = React.useRef();

  const onClick = () => {
    listRef && listRef.current.onCheckAll();
  };

  useEffect(() => {
    if (staff.fetching) setSelectedIds([]);
  }, [staff.fetching])

  const onCheckBoxClick = (id) => {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter(it => it !== id) : selectedIds.concat(id));
  };

  const resetSelected = () => {
    setSelectedIds([]);
  };

  const onCheckBoxListClick = (ids) => {
    setSelectedIds(ids);
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
  const isEmpty = staff.isEmpty
  const fetching = staff.fetching
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

  return (
    <React.Fragment>
      <div className="staff-list-wrapper">
        <Header
          onClick={onClick}
          checked={selectedIds.length && selectedIds.length === staffs.length}
          minus={selectedIds.length && selectedIds.length < staffs.length}
          child={child}
          selectedIds={selectedIds}
        />
        <List
          staffs={staffs}
          ref={listRef}
          fetching={fetching}
          isEmpty={isEmpty}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          onCheckBoxListClick={onCheckBoxListClick}
        />
        <Footer
          size={filter.size}
          onChangeFilter={onChangeFilter}
          staff={staff}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          fetching={fetching}
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
