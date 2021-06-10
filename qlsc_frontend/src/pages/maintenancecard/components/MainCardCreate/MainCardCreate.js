import React, { useState, useEffect } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import ProductMainCard from "./ProductMainCard/ProductMainCard";
import InfoCustomer from "./InfoCustomer/InfoCustomer";
import InfoMainCard from "./InfoMainCard/InfoMainCard";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import CustomerModal from "./Modal/CustomerModal/CustomerModal";
import { toastError, toastSuccess } from "../../../../utils/toast";
import { saveCustomer } from "../../../customer/actions/customerAction";
import { receiveWard } from "../../../customer/actions/locationActions";
import ProductModal from "./Modal/ProductModal/ProductModal";
import { saveProductService } from "../../../product/actions/ProductAction";
import {
  maintenanceCardIsValid,
  clearValid,
  customerIsValid,
  serviceIsValid,
  getVehiclesByCustomerId,
} from "../../actions/mainCard";
import { saveMainCard } from "../../actions/mainCard";
import { useHistory } from "react-router";
import pushstate from "../../../../utils/pushstate";

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
  returnDate: null,
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
  const {
    onSaveCustomer,
    onClearWards,
    onSaveProductService,
    saveMainCard,
    user,
    staffByRepairMan,
    validate,
    onClearValid,
    onCustomerIsValid,
    onServiceIsValid,
    onGetVehiclesByCustomerId,
  } = props;
  const { isvalid, customerIsValid, serviceIsValid } = validate;
  const [customer, setCustomer] = useState({});
  const [mainCard, setMainCard] = useState(initialStateMainCard);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [createCustomer, setCreateCustomer] = useState(initialStateCustomer);
  const [createProduct, setCreateProduct] = useState(initialStateProduct);
  const [showFilterCustomer, setShowFilterCustomer] = useState(false);
  const [showContent, setShowContent] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    onchangeProduct("type", showContent);
  }, [showContent]);

  useEffect(() => {
    onChangeMainCard("coordinator", user);
  }, []);

  useEffect(() => {
    if (vehicles.length) {
      const vehicle = vehicles[0];
      setMainCard(() => {
        return {
          ...mainCard,
          color: vehicle.color,
          model: vehicle.model,
          platesNumber: vehicle.plateNumber,
        };
      });
    }
  }, [vehicles]);

  //customer
  const saveCustomer = () => {
    onSaveCustomer(createCustomer).then((json) => {
      if (json && json.success) {
        setCreateCustomer(initialStateCustomer);
        setCustomer(json.customer);
        onClearWards();
        setShowFilterCustomer(true);
        setShowModalCustomer(false);
        toastSuccess("Thêm khách hàng thành công");
      } else if(json && !json.success) {
        toastError(json.message);
        return;
      } else{
        toastError("Có lỗi xảy ra khi thêm mới khách hàng")
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

  const onSetCustomerState = (cus) => {
    if (cus && cus.id) {
      onGetVehiclesByCustomerId(cus.id).then((json) => {
        if (json) setVehicles(json);
      });
    }
    setCustomer(cus);
    onCustomerIsValid(true);
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
        addProduct(json.product);
        setShowModalProduct(false);
        toastSuccess("Thêm sản phẩm thành công");
      } else if(json && !json.success) {
        toastError(json.message);
        return;
      } else {
        toastError("Có lỗi xảy ra khi thêm sản phẩm");
      }
    });
  };
  //end product

  //mainCard
  const onChangeMainCard = (type, value) => {
    if (!customerIsValid && type !== "coordinator") {
      toastError("Vui lòng chọn khách hàng!");
      return;
    } else if (!serviceIsValid && type !== "coordinator") {
      toastError("Vui lòng chọn dịch vụ - linh kiện!");
      return;
    }
    setMainCard(() => {
      return {
        ...mainCard,
        [type]: value,
      };
    });
  };
  const onChangeMainCardReairMan = (type, value) => {
    const staff = staffByRepairMan.find((item) => item.id == value);
    if (staff) {
      setMainCard(() => {
        return {
          ...mainCard,
          [type]: staff,
        };
      });
    }
  };
  const totalPriceMainCard = (arr) => {
    let total = 0;
    if (arr.length > 0) {
      arr.forEach((element) => {
        total += element.price * element.quantity;
      });
    }
    return total;
  };
  const addMaintenanceCardDetailStatusHistories = (arr) => {
    const newArr = [];
    arr.forEach((tmp) => {
      const item = {};
      item.name = tmp.product.name;
      item.status = 0;
      newArr.push(item);
    });
    return newArr;
  };

  const saveMaintenanceCard = () => {
    // if (!isvalid) {
    //   toastError("Vui lòng nhập đầy đủ thông tin!");
    //   return;
    // }
    mainCard.customer = customer;
    if (!mainCard.customer.id) {
      toastError("Vui lòng nhập thông tin khách hàng!");
      return;
    }
    if (mainCard.maintenanceCardDetails.length === 0) {
      toastError("Vui lòng nhập thông tin sản phẩm!");
      return;
    }
    if (!mainCard.platesNumber) {
      toastError("Vui lòng nhập biển số xe!");
      return;
    }
    if (!mainCard.platesNumber) {
      toastError("Vui lòng nhập biển số xe!");
      return;
    }
    if (!mainCard.repairman.id) {
      toastError("Vui lòng nhập thông tin nhân viên sửa chữa!");
      return;
    }
    mainCard.customer = customer;
    mainCard.workStatus = 0;
    mainCard.payStatus = 0;
    mainCard.price = totalPriceMainCard(mainCard.maintenanceCardDetails);
    mainCard.maintenanceCardDetailStatusHistories =
      addMaintenanceCardDetailStatusHistories(mainCard.maintenanceCardDetails);

    saveMainCard(mainCard).then((json) => {
      if (json) {
        onClearValid();
        pushstate(history, `/maintenance-card/detail/${json.id}`);
        toastSuccess("Thêm phiếu sửa chữa thành công");
      } else {
        toastError("Có lỗi xảy ra khi thêm phiếu sửa chữa ");
      }
    });
  };
  //end mainCard

  const removeProduct = (id) => {
    const newArr = mainCard.maintenanceCardDetails.filter(
      (item) => item.product.id !== id
    );
    setMainCard({ ...mainCard, maintenanceCardDetails: newArr });
  };
  const addProduct = (tmp) => {
    const newArr = [...mainCard.maintenanceCardDetails];
    let check = false;
    const item = {};
    if (newArr.length === 0) {
      check = true;
      item.quantity = 1;
      item.product = tmp;
      item.status = 0;
      item.isGuarantee = 1;
      item.price = tmp.pricePerUnit;
      newArr.unshift(item);
    } else {
      newArr.forEach((element) => {
        if (element.product.id === tmp.id) {
          if (element.product.type === 1) {
            check = true;
            element.quantity += 1;
          } else {
            check = true;
            toastError("Sản phẩm đã có trong danh sách");
          }
        }
      });
    }
    if (!check) {
      item.quantity = 1;
      item.product = tmp;
      item.status = 0;
      item.isGuarantee = 1;
      item.price = tmp.pricePerUnit;
      newArr.unshift(item);
    }
    onServiceIsValid(true);
    setMainCard({ ...mainCard, maintenanceCardDetails: newArr });
  };
  return (
    <div className="main-card-create-warpper">
      <TitleAndAction saveMaintenanceCard={saveMaintenanceCard} />
      <div className="contatiner">
        <div className="d-flex content-main-card-create">
          <div className="content-left">
            <InfoCustomer
              showFilterCustomer={showFilterCustomer}
              setShowFilterCustomer={setShowFilterCustomer}
              setCustomer={(a) => onSetCustomerState(a)}
              customer={customer}
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
          <div className="content-right">
            <InfoMainCard
              onChangeMainCard={(type, value) => onChangeMainCard(type, value)}
              onChangeMainCardReairMan={(type, value) =>
                onChangeMainCardReairMan(type, value)
              }
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
  user: {},
};
const mapStateToProps = (state, ownProps) => {
  const {
    auth: { user },
    staff: { staffByRepairMan },
    mainCard: { validate },
  } = state;
  return {
    user,
    staffByRepairMan,
    validate,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSaveCustomer: (customer) => dispatch(saveCustomer(customer)),
  onClearWards: () => dispatch(receiveWard([])),
  onSaveProductService: (product) => dispatch(saveProductService(product)),
  saveMainCard: (mainCard) => dispatch(saveMainCard(mainCard)),
  onClearValid: () => dispatch(clearValid()),
  onCustomerIsValid: (status) => dispatch(customerIsValid(status)),
  onServiceIsValid: (status) => dispatch(serviceIsValid(status)),
  onGetVehiclesByCustomerId: (id) => dispatch(getVehiclesByCustomerId(id)),
});

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(MainCardCreate)
);
