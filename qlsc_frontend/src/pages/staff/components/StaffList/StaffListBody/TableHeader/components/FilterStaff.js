import React from "react";
import { connect } from "react-redux";
import "../styles/filterStaff.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";

function FilterMainCard(props) {
  const { handleInputOnchange, search } = props;
  return (
    <div id="staff-collations-wrapper">
      <div id="staff-collations-by-tab-wrapper">
        <ul id="staff-collations-by-tab">
          <li className="staff-collations-tab active">Tất cả nhân viên</li>
        </ul>
      </div>
      <div id="staff-collations-option-wrapper">
        <div id="staff-collations-search">
          <div id="staff-collations-search-icon">
            <Icons.Search />
          </div>
          <input
            id="staff-collations-search-input"
            placeholder="Tìm kiếm nhân viên theo mã nhân viên"
            value={search}
            onChange={(e) => handleInputOnchange(e)}
          />
        </div>
      </div>
    </div>
  );
}

FilterMainCard.defaultProps = {};

export default connect(null, null)(FilterMainCard);
