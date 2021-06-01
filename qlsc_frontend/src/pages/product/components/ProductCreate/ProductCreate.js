import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import "./styles.scss";
import Accessories from "./Accessories/Accessories";
import Service from "./Service/Service";
import InfoProductFooter from "./InfoProductFooter/InfoProductFooter";
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
  type: 1,
};
function ProductCreate(props) {
  const { onUpLoadImage, onSaveProductService } = props;
  const [product, setProduct] = useState(initialState);
  const [showContent, setShowContent] = useState(1);
  const [isValid, setIsValid] = useState(true);
  const [actionSave, setActionSave] = useState(false);

  useEffect(() => {
    onchangeValue("type", 1);
  }, []);

  useEffect(() => {
    setIsValid(true);
    setActionSave(false);
  }, [showContent]);

  useEffect(() => {
    onchangeValue("type", showContent);
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
      if (json ) {
        setProduct(initialState);
        setShowContent(1);
        pushstate(props.history, "/products");
      }
    });
  };

  const cancel = () => {
    setProduct(initialState);
    setShowContent(1);
    pushstate(props.history, "/products");
  };

  const handleUploadImage = (files) => {
    const newImages = product.images.length ? product.images : [];
    files.map((file) => {
      newImages.push(onUpLoadImage(file)
        .then((json) => {
          if (json && json.data) {
            return json.data;
          }
        })
        .catch((e) => {
          console.error(e);
          return e;
        }));
    });
    Promise.all(newImages).then(res => onchangeValue("images", res));
  };

  const handleChange = () => {
    if (showContent === 1) {
      setShowContent(2);
    } else {
      setShowContent(1);
    }
  };

  const removeImage = (index) => {
    if (index === 0 && product && product.images.length === 1) {
      onchangeValue("images", []);
      return;
    }
    const images = product.images.filter((img, idx) => idx !== index);
    onchangeValue("images", images);
  };

  const renderContent = () => {
    if (showContent === 1) {
      return (
        <Accessories
          removeImage={removeImage}
          actionSave={actionSave}
          onChangeStatusValid={onChangeStatusValid}
          product={product}
          onchangeValue={onchangeValue}
          handleUploadImage={handleUploadImage}
        />
      );
    }
    if (showContent === 2) {
      return (
        <Service
          actionSave={actionSave}
          onChangeStatusValid={onChangeStatusValid}
          product={product}
          onchangeValue={onchangeValue}
        />
      );
    }
  };

  return (
    <React.Fragment>
      <div className="product-screen-wrapper-create">
        <TitleAndAction setShowContent={handleChange} saveProductService={saveProductService}
            cancel={cancel}/>
        <div className="row">
          {renderContent()}
        </div>
      </div>
    </React.Fragment>
  );
}
ProductCreate.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onUpLoadImage: (file) => dispatch(upLoadImage(file)),
  onSaveProductService: (product) => dispatch(saveProductService(product)),
});

export default connect(null, mapDispatchToProps)(ProductCreate);
