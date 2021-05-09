import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getCustomerById } from '../../actions/customerAction';
import CustomerDetailInfo from './CustomerDetailInfo/CustomerDetailInfo';
import HistoryMainCard from './HistoryMainCard/HistoryMainCard';
import { useParams } from "react-router-dom";
import './styles.scss';
import TitleAndAction from './TitleAndAction/TitleAndAction';
function CustomerDetail(props) {
  const { id } = useParams();
  const { customer, onGetCustomerById } = props;
  useEffect(() => {
    if (id) {
      onGetCustomerById(id);
    }
  }, []);
  return (
    <div className="customer-screen-wrapper-detail">
        <TitleAndAction  customer={customer}/>
        <CustomerDetailInfo customer={customer} />
        {/* <HistoryMainCard /> */}
    </div>
  );
}
CustomerDetail.defaultProps = {

};
const mapStateToProps = (state) => {
  const {
    customer: { customer }
  } = state
  return {
    customer,
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetCustomerById: (id) => dispatch(getCustomerById(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerDetail));
