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
import { toastError } from '../../../../utils/toast';

function MainCardCreate(props) {
  const [customer, setCustomer] = useState({})
  const [products, setProducts] = useState([])
  const [showModalCustomer, setShowModalCustomer] = useState(false)

  const removeProduct = (id) => {
    const arr = products.filter((item)=> item.id !== id)
    setProducts(arr);
  }
  const addProduct = (item) => {
    const newArr = [...products];
    let check = false;
    if (newArr.length === 0) {
      newArr.unshift(item);
    } else {
      newArr.forEach(element => {
        if (element.id === item.id) {
          check = true;
        }
      });
      if (check) {
        toastError('Sản phẩm đã có trong danh sách');
      }
      if (!check) {
        newArr.unshift(item);
      }
    }
    setProducts(newArr);
  };
  return (
    <div className="main-card-create-warpper">
        <TitleAndAction />
        <div className="contatiner">
            <div className="row">
                <div className="col-md-9">
                  <InfoCustomer setCustomer={(a)=>setCustomer(a)} customer={customer} setShowModalCustomer={setShowModalCustomer} />
                  <ProductMainCard
                    addProduct={addProduct}
                    products={products}
                    removeProduct={(a) => removeProduct(a)}
                  />
                </div>
                <div className="col-md-3">
                  <InfoMainCard />
                </div>
            </div>
        </div>
        <CustomerModal showModalCustomer={showModalCustomer} setShowModalCustomer={setShowModalCustomer}/>
    </div>
  );
}
MainCardCreate.defaultProps = {

};
export default React.memo(connect(null, null)(MainCardCreate));
