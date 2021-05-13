import React from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import "./stylesStaff.scss";

class SelectStaff extends React.Component {
  // componentDidMount() {
  //   const { staffs, getWard } = this.props;
  //   const cities = Object.values(listAddress);
  //   if (city) {
  //     const defaultValue = cities.find(
  //       (item) =>
  //       item.id === city.id
  //     );
  //     if (defaultValue && defaultValue.code) {
  //       getWard(defaultValue.code);
  //     }
  //   }
  // }

  render() {
    const { staffs } = this.props;
    // const cities = Object.values(listAddress);
  //   const arrNew = [];
  //  array.forEach(element => {

  //  });
    return (
      <Select2
        // defaultValue={city ? city.id : ""}
        data={staffs}
        // onSelect={this.props.onSelect}
        options={{
          placeholder: "Tỉnh/Thành phố - Quận/Huyện",
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    staff: { staffs },
  } = state;
  return {
    staffs
  };
};

export default connect(mapStateToProps, null, null, { withRef: true })(
  SelectStaff
);
