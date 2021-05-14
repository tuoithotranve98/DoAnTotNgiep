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
import { saveMainCard } from '../../actions/mainCard';
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
const initialStateMainCard = {
  code: null,
  platesNumber: null,
  customer: {},
  repairman: {},
  coordinator: {},
  description: null,
  returnDate: new Date(),
  price: null,
  workStatus: null,
  payStatus: null,
  model: null,
  color: null,
  expectedReturnDate: new Date(),
  maintenanceCardDetails: [],
  paymentHistories: [],
  maintenanceCardDetailStatusHistories: [],
};
function MainCardCreate(props) {
  const { onSaveCustomer, onClearWards, onSaveProductService, saveMainCard, user, staffByRepairMan } = props;
  const [customer, setCustomer] = useState({})
  const [repairman, setRepairman] = useState({})
  const [products, setProducts] = useState([])
  const [mainCard, setMainCard] = useState(initialStateMainCard)
  const [showModalCustomer, setShowModalCustomer] = useState(false)
  const [showModalProduct, setShowModalProduct] = useState(false)
  const [createCustomer, setCreateCustomer] = useState(initialStateCustomer);
  const [createProduct, setCreateProduct] = useState(initialStateProduct);
  const [showFilterCustomer,setShowFilterCustomer ] = useState(false);
  const [showContent, setShowContent] = useState(1);
  console.log("products", products);
  useEffect(() => {
    onchangeProduct("type", showContent);
  }, [showContent]);

  useEffect(() => {
    onChangeMainCard("coordinator", user);
  }, []);
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
        ...createCustomer,
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

  //mainCard

  const onChangeMainCard= (type, value) => {
    setMainCard(() => {
      return {
        ...mainCard,
        [type]: value,
      };
    });
  };
  const onChangeMainCardReairMan= (type, value) => {
    const staff = staffByRepairMan.find((item)=> item.id == value);
      if(staff) {
        setMainCard(() => {
          return {
            ...mainCard,
            [type]: staff,
          };
        });
      }
  };
  const totalPriceMainCard  = (arr) => {
    let total = 0;
    if(arr.length > 0) {
      arr.forEach(element => {
          total += element.pricePerUnit * element.quantity
      });
    }
    return total;
  }
  const addMaintenanceCardDetailStatusHistories = (arr) => {
    const newArr = [];
    arr.forEach((product)=>{
      const item = {};
      item.name= product.name
      item.status= 1
      newArr.push(item);
    })
    return newArr;
  }

  const addMaintenanceCardDetails = (arr) => {
    const newArr = [];
    arr.forEach((product)=>{
      const item = {};
      item.product= product
      item.price= product.pricePerUnit
      item.quantity= product.quantity
      item.status= 1
      newArr.push(item);
    })
    return newArr;
  }
  const saveMaintenanceCard = () => {
    mainCard.customer = customer;
    mainCard.workStatus = 1;
    mainCard.payStatus = 1;
    mainCard.price = totalPriceMainCard(products);
    mainCard.maintenanceCardDetailStatusHistories = addMaintenanceCardDetailStatusHistories(products);
    mainCard.maintenanceCardDetails = addMaintenanceCardDetails(products);
    saveMainCard(mainCard).then((json) => {
      console.log("jsonjson", json);
      if (json && json.success) {
        toastSuccess('Thêm phiếu sửa chữa thành công');
      } else {
        toastError('Có lỗi xảy ra khi thêm phiếu sửa chữa ');
      }
    });
  };
  //end mainCard
  const removeProduct = (id) => {
    const arr = products.filter((item)=> item.id !== id)
    setProducts(arr);
  }
  const addProduct = (item) => {
    const newArr = [...products];
    let check = false;
    item.quantity = 1;
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
                    totalPriceMainCard={totalPriceMainCard}
                    saveMaintenanceCard={saveMaintenanceCard}
                  />
                </div>
                <div className="col-md-3">
                  <InfoMainCard
                    onChangeMainCard={(type, value) => onChangeMainCard(type, value)}
                    onChangeMainCardReairMan={(type, value) => onChangeMainCardReairMan(type, value)}
                    mainCard={mainCard}
                  />
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
  user: {}
};
const mapStateToProps = (state, ownProps) => {
  const { auth : { user } , staff : { staffByRepairMan }} = state;
  return {
    user,
    staffByRepairMan
  }
}
const mapDispatchToProps = (dispatch) => ({
  onSaveCustomer: (customer) => dispatch(saveCustomer(customer)),
  onClearWards: () => dispatch(receiveWard([])),
  onSaveProductService: (product) => dispatch(saveProductService(product)),
  saveMainCard: (mainCard) => dispatch(saveMainCard(mainCard)),
});

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(MainCardCreate));
