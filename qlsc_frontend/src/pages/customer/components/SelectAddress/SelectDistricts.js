import React from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";
import { getWard } from "../../actions/locationActions";
import "../../styles/select2.scss";

class SelectDistricts extends React.Component {
  componentDidMount() {
    const { city, listAddress, getWard } = this.props;
    const cities = Object.values(listAddress);
    if (city) {
      const defaultValue = cities.find(
        (item) =>
        item.id === city.id 
      );
      if (defaultValue && defaultValue.code) {
        getWard(defaultValue.code);
      }
    }
  }

  getCityDistrict() {
    const { listAddress } = this.props;
    return Object.values(listAddress);
  }

  render() {
    const { city, listAddress } = this.props;
    const cities = Object.values(listAddress);
    return (
      <Select2
        defaultValue={city ? city.id : ""}
        data={cities}
        onSelect={this.props.onSelect}
        options={{
          placeholder: "Tỉnh/Thành phố - Quận/Huyện",
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    locations: { city },
  } = state;
  return {
    listAddress: city,
  };
};

export default connect(mapStateToProps, { getWard }, null, { withRef: true })(
  SelectDistricts
);
