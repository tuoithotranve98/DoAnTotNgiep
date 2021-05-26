import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import "./styles.scss";
import Accessories from "./Accessories/Accessories";
import Service from "./Service/Service";
import InfoProductFooter from "./InfoProductFooter/InfoProductFooter";
import {
  upLoadImage,
  updateProductService,
  getProductServiceById,
} from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
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
  type: null,
};
function ServiceUpdate(props) {
  const { onUpLoadImage, onSaveProductService, onGetProductServiceById } =
    props;
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState([]);
  const [showContent, setShowContent] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [actionSave, setActionSave] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      onGetProductServiceById(id).then((json) => {
        if (json) setProduct(json);
        if (json && json.images) setImages(json.images);
        if (json && json.type) setShowContent(json.type);
      });
    }
  }, []);

  useEffect(() => {
    onchangeValue("images", images);
  }, [images])

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
    onSaveProductService(id, product).then((json) => {
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
    files.forEach((file) => {
      onUpLoadImage(file)
        .then((json) => {
          if (json && json.data) {
            setImages((state) => ([...state, json.data]));
          }
        })
        .catch((e) => {
          console.error(e);
          return e;
        });
    });
  };

  const removeImage = (index) => {
    const images = product.images.filter((img, idx) => idx === index);
    if (index === 0 && product && product.images.length === 1) {
      onchangeValue("images", []);
      return;
    }
    onchangeValue("images", images);
  };

  return (
    <React.Fragment>
      <div className="product-screen-wrapper-create">
        <TitleAndAction showContent={showContent}  saveProductService={saveProductService}
            cancel={cancel}/>
        <div className="row">
            <Service
              actionSave={actionSave}
              onChangeStatusValid={onChangeStatusValid}
              product={product}
              onchangeValue={onchangeValue}
            />

        </div>
      </div>
    </React.Fragment>
  );
}
ServiceUpdate.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onUpLoadImage: (file) => dispatch(upLoadImage(file)),
  onSaveProductService: (id, product) =>
    dispatch(updateProductService(id, product)),
  onGetProductServiceById: (id) => dispatch(getProductServiceById(id)),
});

export default connect(null, mapDispatchToProps)(ServiceUpdate);
