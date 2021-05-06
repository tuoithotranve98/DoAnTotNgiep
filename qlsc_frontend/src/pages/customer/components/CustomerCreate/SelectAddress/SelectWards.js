import React from "react";
import { connect } from "react-redux";
import Select2 from "react-select2-wrapper";

class SelectWards extends React.Component {
  findListWard() {
    const { wards } = this.props;
    const listAddress = Object.values(wards);
    if (listAddress && !listAddress.length) {
      return [
        {
          id: "0",
          text: "Phường/Xã",
        },
      ];
    }
    return listAddress;
  }

  render() {
    const { ward } = this.props;
    const listWard = this.findListWard();
    const defaultValue = listWard
      ? listWard.find((wardElm) => wardElm.id === (ward && ward.id))
      : {};
    return (
      <Select2
        defaultValue={defaultValue ? defaultValue.id : ""}
        data={listWard}
        onSelect={this.props.onSelect}
        options={{ placeholder: "Phường/Xã " }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    locations: { ward },
  } = state;
  return {
    wards: ward,
  };
};

export default connect(mapStateToProps, null, null, { withRef: true })(
  SelectWards
);
