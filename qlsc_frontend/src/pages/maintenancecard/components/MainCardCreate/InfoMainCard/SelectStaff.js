import React from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import "./stylesStaff.scss";

class SelectStaff extends React.Component {
  render() {
    const { staffs, staff } = this.props;
    return (
      <Select2
        defaultValue={staff ? staff.name : ""}
        data={staffs}
        onSelect={this.props.onSelect}
        options={{
          placeholder: "Chọn nhân viên sửa chữa",
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    staff: { staffByRepairMan },
  } = state;
  return {
    staffs: staffByRepairMan
  };
};

export default connect(mapStateToProps, null, null, { withRef: true })(
  SelectStaff
);
