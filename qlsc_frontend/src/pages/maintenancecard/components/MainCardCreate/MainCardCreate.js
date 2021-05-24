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
import { array } from 'prop-types';
import { useHistory } from 'react-router';
import pushstate from '../../../../utils/pushstate';
import * as Icons from "pages/maintenancecard/commons/Icons";

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
  returnDate: null ,
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
  const history = useHistory();
  const { onSaveCustomer, onClearWards, onSaveProductService, saveMainCard, user, staffByRepairMan } = props;
  const [customer, setCustomer] = useState({})
  const [mainCard, setMainCard] = useState(initialStateMainCard)
  const [showModalCustomer, setShowModalCustomer] = useState(false)
  const [showModalProduct, setShowModalProduct] = useState(false)
  const [createCustomer, setCreateCustomer] = useState(initialStateCustomer);
  const [createProduct, setCreateProduct] = useState(initialStateProduct);
  const [showFilterCustomer,setShowFilterCustomer ] = useState(false);
  const [showContent, setShowContent] = useState(1);
  const onBack = () => {
    pushstate(history, '/maintenance-cards');
  };
  useEffect(() => {
    onchangeProduct("type", showContent);
  }, [showContent]);

  useEffect(() => {
    onChangeMainCard("coordinator", user);
  }, []);

  //customer
  const saveCustomer = () => {
    onSaveCustomer(createCustomer).then((json) => {
      if (json ) {
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
        if (json ) {
          const newArr = [...mainCard.maintenanceCardDetails]
          newArr.unshift(json.product)
          setMainCard({...mainCard, maintenanceCardDetails: newArr})
          setCreateProduct(initialStateProduct);
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
          total += element.price * element.quantity
      });
    }
    return total;
  }
  const addMaintenanceCardDetailStatusHistories = (arr) => {
    const newArr = [];
    arr.forEach((tmp)=>{
      const item = {};
      item.name= tmp.product.name
      item.status= 0
      newArr.push(item);
    })
    return newArr;
  }

  const saveMaintenanceCard = () => {
    mainCard.customer = customer;
    mainCard.workStatus = 0;
    mainCard.payStatus = 0;
    mainCard.price = totalPriceMainCard(mainCard.maintenanceCardDetails);
    mainCard.maintenanceCardDetailStatusHistories = addMaintenanceCardDetailStatusHistories(mainCard.maintenanceCardDetails);
    saveMainCard(mainCard).then((json) => {
      console.log("json", json);
      if (json) {
        pushstate(history, `/maintenance-card/detail/${json.id}`);
        toastSuccess('Thêm phiếu sửa chữa thành công');
      } else {
        toastError('Có lỗi xảy ra khi thêm phiếu sửa chữa ');
      }
    });
  };
  //end mainCard
  const removeProduct = (id) => {
    const newArr = mainCard.maintenanceCardDetails.filter((item)=> item.product.id !== id)
    setMainCard({...mainCard, maintenanceCardDetails: newArr})
  }
  const addProduct = (tmp) => {
    const newArr = [...mainCard.maintenanceCardDetails];
    let check = false;
    const item = {};
    if (newArr.length === 0) {
      check = true
      item.quantity = 1;
      item.product = tmp;
      item.status = 0;
      item.price = tmp.pricePerUnit
      newArr.unshift(item);
    } else {
      newArr.forEach(element => {
        if (element.product.id === tmp.id) {
          if(element.product.type === 1){
            check = true
            element.quantity += 1;
          }else {
            check = true
            toastError('Sản phẩm đã có trong danh sách');
          }
        }
      });
    }
    if(!check){
      item.quantity = 1;
      item.product = tmp;
      item.status = 0;
      item.price = tmp.pricePerUnit
      newArr.unshift(item);
    }
   setMainCard({...mainCard, maintenanceCardDetails: newArr})
  };
  return (
    <div className="main-card-create-warpper">

        <TitleAndAction saveMaintenanceCard={saveMaintenanceCard} />
        <div className="contatiner">
            <div className="row">
                <div className="col-md-9">
                  <InfoCustomer
                    showFilterCustomer={showFilterCustomer}
                    setShowFilterCustomer={setShowFilterCustomer}
                    setCustomer={(a)=>setCustomer(a)} customer={customer}
                    setShowModalCustomer={setShowModalCustomer}

                  />
                  <ProductMainCard
                    addProduct={addProduct}
                    maintenanceCardDetails={mainCard.maintenanceCardDetails}
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
