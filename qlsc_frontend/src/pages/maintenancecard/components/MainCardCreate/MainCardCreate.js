/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import ProductMainCard from './ProductMainCard/ProductMainCard';
import InfoCustomer from './InfoCustomer/InfoCustomer';
import InfoMainCard from './InfoMainCard/InfoMainCard';
import TitleAndAction from './TitleAndAction/TitleAndAction';
import CustomerModal from './Modal/CustomerModal/CustomerModal';
import { toastError, toastSuccess } from '../../../../utils/toast';
import { saveCustomer } from '../../../customer/actions/customerAction';
import { receiveWard } from '../../../customer/actions/locationActions';
import ProductModal from './Modal/ProductModal/ProductModal';
import { saveProductService } from '../../../product/actions/ProductAction';
const initialStateCustomer = {
  name: null,
  code: null,
  phone: null,
  email: null,
  address: null,
  city: null,
  ward: null,
  description: null,
};
const initialStateProduct = {
  name: null,
  code: null,
  quantity: null,
  unit: null,
  pricePerUnit: null,
  description: null,
  images: [],
  type: null,
};
function MainCardCreate(props) {
  const { onSaveCustomer, onClearWards, onSaveProductService } = props;
  const [customer, setCustomer] = useState({})
  const [products, setProducts] = useState([])
  const [showModalCustomer, setShowModalCustomer] = useState(false)
  const [showModalProduct, setShowModalProduct] = useState(false)
  const [createCustomer, setCreateCustomer] = useState(initialStateCustomer);
  const [createProduct, setCreateProduct] = useState(initialStateProduct);
  const [showFilterCustomer,setShowFilterCustomer ] = useState(false);
  const [showContent, setShowContent] = useState(1);
  useEffect(() => {
    onchangeProduct("type", showContent);
  }, [showContent]);
  console.log("createProduct", createProduct);
  //customer
  const saveCustomer = () => {
    onSaveCustomer(createCustomer).then((json) => {
      if (json && json.success) {
        setCreateCustomer(initialStateCustomer);
        setCustomer(json.customer)
        onClearWards();
        setShowFilterCustomer(true);
        setShowModalCustomer(false);
        toastSuccess('Thêm khách hàng thành công');
      } else {
        toastError('Có lỗi xảy ra khi thêm khách hàng');
      }
    });
  };
  const onChangeCustomer = (type, value) => {
    setCreateCustomer(() => {
      return {
        ...createProduct,
        [type]: value,
      };
    });
  };
  //end customer

  //product
    const onchangeProduct = (type, value) => {
      setCreateProduct({
        ...createProduct,
        [type]: value,
      });
    };

    const saveProductService = () => {
      onSaveProductService(createProduct).then((json) => {
        if (json && json.success) {
          const arr = [...products]
          setCreateProduct(initialStateProduct);
          console.log("json.product", json.product);
          arr.unshift(json.product)
          console.log("arrr", arr);
          setProducts(arr);
          setShowModalProduct(false);
          toastSuccess('Thêm sản phẩm thành công');
        }else {
          toastError('Có lỗi xảy ra khi thêm sản phẩm');
        }
      });
    };
  //end product
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
                  <InfoCustomer showFilterCustomer={showFilterCustomer} setShowFilterCustomer={setShowFilterCustomer} setCustomer={(a)=>setCustomer(a)} customer={customer} setShowModalCustomer={setShowModalCustomer} />
                  <ProductMainCard
                    addProduct={addProduct}
                    products={products}
                    removeProduct={(a) => removeProduct(a)}
                    setShowModalProduct={setShowModalProduct}
                  />
                </div>
                <div className="col-md-3">
                  <InfoMainCard />
                </div>
            </div>
        </div>
        <CustomerModal
          showModalCustomer={showModalCustomer}
          customer={createCustomer}
          saveCustomer={() => saveCustomer()}
          setShowModalCustomer={setShowModalCustomer}
          setCreateCustomer={setCreateCustomer}
          initialStateCustomer={initialStateCustomer}
          onChangeCustomer={(type, value) => onChangeCustomer(type, value)}
        />
        <ProductModal
          showModalProduct={showModalProduct}
          setShowModalProduct={setShowModalProduct}
          saveProductService={() => saveProductService()}
          product={createProduct}
          setCreateProduct={setCreateProduct}
          initialStateProduct={initialStateProduct}
          onchangeProduct={(type, value) => onchangeProduct(type, value)}
          showContent={showContent}
          setShowContent={setShowContent}
        />
    </div>
  );
}
MainCardCreate.defaultProps = {

};
const mapDispatchToProps = (dispatch) => ({
  onSaveCustomer: (customer) => dispatch(saveCustomer(customer)),
  onClearWards: () => dispatch(receiveWard([])),
  onSaveProductService: (product) => dispatch(saveProductService(product)),
});

export default React.memo(connect(null, mapDispatchToProps)(MainCardCreate));
