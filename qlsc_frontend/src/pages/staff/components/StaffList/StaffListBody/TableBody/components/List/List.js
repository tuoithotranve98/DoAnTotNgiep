import React, { forwardRef } from "react";
import "../../styles/list.scss";
import Item from "../Item/Item";

const List = forwardRef((props) => {
  const { staffs } = props;
  return (
    <div className="order-list-container">
      {staffs.map((staff) => {
        return <Item key={staff.code} index={staff.code} staff={staff} />;
      })}
    </div>
  );
});
List.defaultProps = {
  staffs: [],
};
export default List;
