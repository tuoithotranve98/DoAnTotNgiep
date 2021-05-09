import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import InfoCustomerLeft from "./InfoCustomerLeft/InfoCustomerLeft";
import InfoCustomerRight from "./InfoCustomerRight/InfoCustomerRight";
import InfoCustomerFooter from './InfoCustomerFooter/InfoCustomerFooter';
import { saveCustomer, getCustomerById } from "../../actions/customerAction";
import { receiveWard } from "../../actions/locationActions";
import pushstate from "utils/pushstate";
import "./styles.scss";
import TitleAndAction from "./TitleAndAction/TitleAndAction";

const initialState = {
  name: null,
  code: null,
  phone: null,
  email: null,
  address: null,
  city: null,
  ward: null,
  description: null,
};
function CustomerCreate(props) {
  const { onClearWards, onSaveCustomer, positionCallApi } = props;
  const [customer, setCustomer] = useState(initialState);

  useEffect(() => {
    if (positionCallApi) setCustomer({ ...customer, ward: null });
  }, [positionCallApi]);

  const onChangeCustomer = (type, value) => {
    setCustomer(() => {
      return {
        ...customer,
        [type]: value,
      };
    });
  };

  const saveCustomer = () => {
    onSaveCustomer(customer).then((json) => {
      if (json && json.success) {
        setCustomer(initialState);
        onClearWards();
        pushstate(props.history, "/customer");
      }
    });
  };
  
  const cancel = () => {
    setUser(initialState);
    pushstate(props.history, "/customer");
  };

  return (
    <div className="customer-screen-wrapper-create">
      <TitleAndAction />
      <div className="row">
        <div className="col-md-8">
          <InfoCustomerLeft onChangeCustomer={onChangeCustomer} customer={customer} />
        </div>
        <div className="col-md-4">
          <InfoCustomerRight onChangeCustomer={onChangeCustomer} customer={customer} />
        </div>
        <InfoCustomerFooter saveCustomer={saveCustomer} cancel={cancel} />
      </div>
    </div>
  );
}
CustomerCreate.defaultProps = {};

const mapStateToProps = (state) => {
  const {
    locations: { positionCallApi },
  } = state;
  return {
    positionCallApi,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSaveCustomer: (customer) => dispatch(saveCustomer(customer)),
  onClearWards: () => dispatch(receiveWard([])),
  onGetCustomerById: (id) => dispatch(getCustomerById(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerCreate));
