/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import ProductMainCard from './ProductMainCard/ProductMainCard';
import InfoCustomer from './InfoCustomer/InfoCustomer';
import InfoMainCard from './InfoMainCard/InfoMainCard';
import TitleAndAction from './TitleAndAction/TitleAndAction';
import CustomerModal from './Modal/CustomerModal/CustomerModal';

function MainCardCreate(props) {
  const [customer, setCustomer] = useState({})
  console.log("customer", customer);
  return (
    <div className="main-card-create-warpper">
        <TitleAndAction />
        <div className="contatiner">
            <div className="row">
                <div className="col-md-8">
                  <InfoCustomer setCustomer={(a)=>setCustomer(a)} customer={customer} />
                  <ProductMainCard />
                </div>
                <div className="col-md-4">
                  <InfoMainCard />
                </div>
            </div>
        </div>
        <CustomerModal />
    </div>
  );
}
MainCardCreate.defaultProps = {

};
export default React.memo(connect(null, null)(MainCardCreate));
