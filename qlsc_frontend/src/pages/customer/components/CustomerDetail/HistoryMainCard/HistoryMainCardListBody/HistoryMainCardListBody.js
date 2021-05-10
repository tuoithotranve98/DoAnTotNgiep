import React from "react";
import "./styles.scss";
import Wrapper from "./TableBody/components/Wrapper/Wrapper";
import TableHeader from "./TableHeader/TableHeader";

function HistoryMainCardListBody(props) {
  const { onGetCustomer, handleInputOnchange, search, onChangeFilter } = props;
  return (
    <div className="customer-list-body">
      <TableHeader search={search} handleInputOnchange={handleInputOnchange} />
      <div className="dashboard-body-content">
        <div className="content-container">
          <Wrapper
            onGetCustomer={onGetCustomer}
            onChangeFilter={onChangeFilter}
          />
        </div>
      </div>
    </div>
  );
}
export default HistoryMainCardListBody;
