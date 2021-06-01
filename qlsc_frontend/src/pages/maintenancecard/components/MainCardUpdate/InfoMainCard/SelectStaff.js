import React from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import "./stylesStaff.scss";
import { getStaffsByRepairman } from "../../../../../actions/commons";

class SelectStaff extends React.Component {

  componentDidMount() {
    this.props.getStaffsByRepairman();
  }
  
  render() {
    const { staffs, staff } = this.props;
    return (
      <Select2
        defaultValue={staff ? staff.id : ""}
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
const mapDispatchToProps = (dispatch) => ({
  getStaffsByRepairman: () => dispatch(getStaffsByRepairman()),
});
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(
  SelectStaff
);
