import React, { useState, useEffect } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import ProductMainCard from "./ProductMainCard/ProductMainCard";
import InfoCustomer from "./InfoCustomer/InfoCustomer";
import InfoMainCard from "./InfoMainCard/InfoMainCard";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import { toastError, toastSuccess } from "../../../../utils/toast";
import { saveCustomer } from "../../../customer/actions/customerAction";
import { receiveWard } from "../../../customer/actions/locationActions";
import ProductModal from "./Modal/ProductModal/ProductModal";
import { saveProductService } from "../../../product/actions/ProductAction";
import {
  getMainCardById,
  mainCardPaymentHistory,
  saveMainCard,
  updateMainCard,
  updateStatusMaintenanceCardDetail,
  updateStatusMCDetails,
} from "../../actions/mainCard";
import { useHistory, useParams, withRouter } from "react-router-dom";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import HistoryAction from "./HistoryAction/HistoryAction";
import Payment from "./Modal/Payment/Payment";
import Guarantee from "./Guarantee/Guarantee";

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
const payments = [
  {
    id: 0,
    name: "Chọn thanh toán",
  },
  {
    id: 1,
    name: "Tiền mặt",
  },
  {
    id: 2,
    name: "Chuyển khoản",
  },
];
function MainCardUpdate(props) {
  const { id } = useParams();
  const {
    onClearWards,
    onSaveProductService,
    saveMainCard,
    user,
    staffByRepairMan,
    getMainCardById,
    updateStatusMaintenanceCardDetail,
    mainCardPaymentHistory,
    onUpdateStatusMCDetails,
  } = props;
  const [customer, setCustomer] = useState({});
  const [payment, setPayment] = useState(payments[1]);
  const [mainCard, setMainCard] = useState(initialStateMainCard);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [createProduct, setCreateProduct] = useState(initialStateProduct);
  const [showFilterCustomer, setShowFilterCustomer] = useState(false);
  const [showContent, setShowContent] = useState(1);
  const [money, setMoney] = useState(0);
  const [finish, setFinish] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    onchangeProduct("type", showContent);
  }, [showContent]);

  useEffect(() => {
    if (id) onGetDataFromId(id);
  }, []);

  useEffect(() => {
    if (id) onGetDataFromId(id);
  }, [id]);

  useEffect(() => {
    if (mainCard && mainCard.payStatus === 1 && mainCard.workStatus === 2) {
      setFinish(true);
    }
    if (mainCard && mainCard.maintenanceCardDetails) {
      let isSuccess = true;
      mainCard.maintenanceCardDetails.forEach(item => {
        if (item.status !== 2) {
          isSuccess = false;
        }
      });
      setSuccess(isSuccess);
    }
  }, [mainCard]);

  const onGetDataFromId = (id) => {
    getMainCardById(id).then((json) => {
      if (!json) return;
      setMainCard(json);
      setMoney(json.price);
      setCustomer(json.customer);
    });
  };

  //product
  const onchangeProduct = (type, value) => {
    setCreateProduct({
      ...createProduct,
      [type]: value,
    });
  };

  const saveProductService = () => {
    onSaveProductService(createProduct).then((json) => {
      if (json) {
        const newArr = [...mainCard.maintenanceCardDetails];
        newArr.unshift(json.product);
        setMainCard({ ...mainCard, maintenanceCardDetails: newArr });
        setCreateProduct(initialStateProduct);
        setShowModalProduct(false);
        toastSuccess("Thêm sản phẩm thành công");
      } else {
        toastError("Có lỗi xảy ra khi thêm sản phẩm");
      }
    });
  };
  //end product

  //mainCard

  const onUpdateStatusMaintenanceCardDetail = (id) => {
    updateStatusMaintenanceCardDetail(id).then((json) => {
      if (!json) {
        toastError("Có lỗi xảy ra khi cập nhật trạng thái");
        return;
      }
      if (json.message) {
        toastError(json.message);
        return;
      }
      setMainCard({
        ...mainCard,
        maintenanceCardDetails: json.maintenanceCardDetails,
        maintenanceCardDetailStatusHistories:
          json.maintenanceCardDetailStatusHistories,
        workStatus: json.workStatus,
      });
      toastSuccess("Cập nhật trạng thái thành công");
    });
  };
  const onMainCardPaymentHistory = () => {
    const PaymentHistoryDTO = [];
    const item = {};
    if (!payment || !payment.id) {
      toastError("Vui lòng chọn phương thức thanh toán");
      return;
    }
    item.maintenanceCard = mainCard;
    item.paymentMethod = payment;
    item.money = mainCard.price - totalAfterPayment();
    PaymentHistoryDTO.push(item);
    mainCardPaymentHistory(PaymentHistoryDTO).then((json) => {
      if (json) {
        setMainCard({
          ...mainCard,
          paymentHistories: json.paymentHistories,
          payStatus: json.payStatus,
          returnDate: json.returnDate
        });
      } else {
        toastError("Có lỗi xảy ra khi thanh toán");
      }
    });
  };
  const totalAfterPayment = () => {
    let total = 0;
    if (mainCard.paymentHistories.length > 0) {
      mainCard.paymentHistories.forEach((item) => {
        total += item.money;
      });
    }
    return total;
  };
  const onChangeMainCard = (type, value) => {
    if (user.role === 2) {
      toastError("Bạn không có quyền thực hiện thao tác này");
      return;
    }
    if (finish) {
      toastError("Phiếu đã hoàn thành, vui lòng không điều chỉnh!");
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
    arr.forEach((product) => {
      const item = {};
      item.name = product.name;
      item.status = 1;
      newArr.push(item);
    });
    return newArr;
  };

  const onUpdateMainCard = () => {
    if (user.role === 2) {
      toastError("Bạn không có quyền thực hiện thao tác này");
      return;
    }
    if (!mainCard.customer.id) {
      toastError("Vui lòng nhập thông tin khách hàng!");
      return;
    }
    if (!mainCard.maintenanceCardDetails.length) {
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
    if (finish) {
      toastError("Phiếu đã hoàn thành, vui lòng không điều chỉnh!");
      return;
    }
    mainCard.price = totalPriceMainCard(mainCard.maintenanceCardDetails);
    mainCard.maintenanceCardDetailStatusHistories =
      addMaintenanceCardDetailStatusHistories(mainCard.maintenanceCardDetails);
    props.updateMainCard(id, mainCard).then((json) => {
      if (json) {
        toastSuccess("Cập nhật sửa chữa thành công");
      } else {
        toastError("Có lỗi xảy ra khi cập nhật phiếu sửa chữa ");
      }
    });
  };
  //end mainCard
  const removeProduct = (id) => {
    if (user.role === 2) {
      toastError("Bạn không có quyền thực hiện thao tác này");
      return;
    }
    const newArr = mainCard.maintenanceCardDetails.filter(
      (item) => item.product.id !== id
    );
    setMainCard({ ...mainCard, maintenanceCardDetails: newArr });
  };
  const addProduct = (tmp) => {
    if (user.role === 2) {
      toastError("Bạn không có quyền thực hiện thao tác này");
      return;
    }
    const newArr = [...mainCard.maintenanceCardDetails];
    let check = false;
    const item = {};
    if (newArr.length === 0) {
      check = true;
      item.quantity = 1;
      item.product = tmp;
      item.status = 0;
      item.price = tmp.pricePerUnit;
      item.isGuarantee = 1;
      newArr.unshift(item);
    } else {
      newArr.forEach((element) => {
        if (element.product.id === tmp.id) {
          if (element.product.type === 1) {
            check = true;
            element.quantity += 1;
          } else {
            check = true;
            toastError("Chỉ thêm được 1 dịch vụ trong 1 phiếu");
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
    setMainCard({ ...mainCard, maintenanceCardDetails: newArr });
  };

  const updateStatusMCDetails = () => {
    if (!mainCard.id) {
      return;
    }
    onUpdateStatusMCDetails(id).then(json => {
      if (!json) {
        toastError("Có lỗi xảy ra khi cập nhật trạng thái");
        return;
      }
      setSuccess(true);
      setMainCard({
        ...mainCard,
        maintenanceCardDetails: json.maintenanceCardDetails,
        maintenanceCardDetailStatusHistories:
          json.maintenanceCardDetailStatusHistories,
        workStatus: json.workStatus,
      });
      toastSuccess("Cập nhật trạng thái thành công");
    });
  }
  return (
    <div className="main-card-update-warpper">
      <TitleAndAction
        history={history}
        onUpdateMainCard={(id, mainCard) => onUpdateMainCard(id, mainCard)}
        id={id}
        mainCard={mainCard}
        finish={finish}
        user={user}
        updateStatusMCDetails={updateStatusMCDetails}
        success={success}
      />
      <div className="contatiner">
        <div className="d-flex content-main-card-update">
          <div className="content-left">
            <InfoCustomer
              showFilterCustomer={showFilterCustomer}
              setShowFilterCustomer={setShowFilterCustomer}
              setCustomer={(a) => setCustomer(a)}
              customer={customer}
            />
            <ProductMainCard
              user={user}
              addProduct={addProduct}
              maintenanceCardDetails={mainCard.maintenanceCardDetails}
              removeProduct={(a) => removeProduct(a)}
              setShowModalProduct={setShowModalProduct}
              totalPriceMainCard={totalPriceMainCard}
              onUpdateStatusMaintenanceCardDetail={
                onUpdateStatusMaintenanceCardDetail
              }
              finish={finish}
            />
            <PaymentMethod
              setShowModalPayment={setShowModalPayment}
              mainCardTotal={mainCard.price}
              totalAfterPayment={totalAfterPayment}
              mainCard={mainCard}
            />
            <Guarantee mainCard={mainCard}/>
          </div>
          <div className="content-right">
            <InfoMainCard
              user={user}
              onChangeMainCard={(type, value) => onChangeMainCard(type, value)}
              onChangeMainCardReairMan={(type, value) =>
                onChangeMainCardReairMan(type, value)
              }
              mainCard={mainCard}
              finish={finish}
            />
            <HistoryAction
              maintenanceCardDetailStatusHistories={
                mainCard.maintenanceCardDetailStatusHistories
              }
              mainCard={mainCard}
            />
          </div>
        </div>
      </div>
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
      <Payment
        showModalPayment={showModalPayment}
        setShowModalPayment={setShowModalPayment}
        setPayment={setPayment}
        payment={payment}
        payments={payments}
        money={money}
        setMoney={setMoney}
        onMainCardPaymentHistory={onMainCardPaymentHistory}
        mainCardTotal={mainCard.price}
        totalAfterPayment={totalAfterPayment}
      />
    </div>
  );
}
MainCardUpdate.defaultProps = {
  user: {},
};
const mapStateToProps = (state, ownProps) => {
  const {
    auth: { user },
    staff: { staffByRepairMan },
  } = state;
  return {
    user,
    staffByRepairMan,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onSaveCustomer: (customer) => dispatch(saveCustomer(customer)),
  onClearWards: () => dispatch(receiveWard([])),
  onSaveProductService: (product) => dispatch(saveProductService(product)),
  updateMainCard: (id, mainCard) => dispatch(updateMainCard(id, mainCard)),
  getMainCardById: (id) => dispatch(getMainCardById(id)),
  updateStatusMaintenanceCardDetail: (id) =>
    dispatch(updateStatusMaintenanceCardDetail(id)),
  mainCardPaymentHistory: (data) => dispatch(mainCardPaymentHistory(data)),
  onUpdateStatusMCDetails: (id) => dispatch(updateStatusMCDetails(id)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainCardUpdate)
);
