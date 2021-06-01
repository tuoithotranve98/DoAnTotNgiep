import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import "./styles.scss";
import Service from "./Service/Service";
import { upLoadImage, saveProductService } from "../../actions/ProductAction";
import pushstate from "utils/pushstate";
import { toastError } from "../../../../utils/toast";

const initialState = {
  name: null,
  code: null,
  quantity: null,
  unit: null,
  pricePerUnit: null,
  description: null,
  images: [],
  type: 2,
};
function ServiceCreate(props) {
  const { onUpLoadImage, onSaveProductService } = props;
  const [product, setProduct] = useState(initialState);
  const [showContent, setShowContent] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [actionSave, setActionSave] = useState(false);


  useEffect(() => {
    setIsValid(true);
    setActionSave(false);
  }, [showContent]);

  const onchangeValue = (type, value) => {
    setActionSave(false);
    if (type === "quantity" && isNaN(value)) {
      toastError("Số lượng không hợp lệ. Vui lòng nhập lại!");
      return;
    }
    setProduct({
      ...product,
      [type]: value,
    });
  };

  const onChangeStatusValid = (status) => {
    setIsValid(status);
  };

  const saveProductService = () => {
    setActionSave(true);
    if (isValid) {
      toastError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSaveProductService(product).then((json) => {
      if (json) {
        setProduct(initialState);
        setShowContent(1);
        pushstate(props.history, "/services");
      }
    });
  };

  const cancel = () => {
    setProduct(initialState);
    setShowContent(1);
    pushstate(props.history, "/services");
  };

  const handleChange = () => {
    if (showContent === 1) {
      setShowContent(2);
    } else {
      setShowContent(1);
    }
  };

  const renderContent = () => {
    return (
      <Service
        actionSave={actionSave}
        onChangeStatusValid={onChangeStatusValid}
        product={product}
        onchangeValue={onchangeValue}
      />
    );
  };

  return (
    <React.Fragment>
      <div className="product-screen-wrapper-create">
        <TitleAndAction
          setShowContent={handleChange}
          saveProductService={saveProductService}
          cancel={cancel}
        />
        <div className="row">{renderContent()}</div>
      </div>
    </React.Fragment>
  );
}
ServiceCreate.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onUpLoadImage: (file) => dispatch(upLoadImage(file)),
  onSaveProductService: (product) => dispatch(saveProductService(product)),
});

export default connect(null, mapDispatchToProps)(ServiceCreate);
