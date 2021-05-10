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
function ProductUpdate(props) {
  const {
    onUpLoadImage,
    onSaveProductService,
    onGetProductServiceById,
  } = props;
  const [product, setProduct] = useState(initialState);
  const [showContent, setShowContent] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      onGetProductServiceById(id).then((json) => {
        if (json) setProduct(json);
        if (json && json.type) setShowContent(json.type);
      });
    }
  }, []);

  const onchangeValue = (type, value) => {
    setProduct({
      ...product,
      [type]: value,
    });
  };

  const saveProductService = () => {
    onSaveProductService(id, product).then((json) => {
      if (json && json.success) {
        setProduct(initialState);
        setShowContent(1);
        pushstate(props.history, "/products");
      }
    });
  };

  console.log('product', product);

  const cancel = () => {
    setUser(initialState);
    setShowContent(1);
    pushstate(props.history, "/products");
  };

  const handleUploadImage = (file) => {
    onUpLoadImage(file)
      .then((json) => {
        if (json && json.data) {
          const images = [...product.images, json.data];
          onchangeValue("images", images);
        }
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  return (
    <React.Fragment>
      <div className="product-screen-wrapper-create">
        <TitleAndAction showContent={showContent} />
        <div className="row">
          {showContent === 1 ? (
            <Accessories
              product={product}
              onchangeValue={onchangeValue}
              handleUploadImage={handleUploadImage}
            />
          ) : (
            <Service product={product} onchangeValue={onchangeValue} />
          )}
          <InfoProductFooter
            saveProductService={saveProductService}
            cancel={cancel}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
ProductUpdate.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onUpLoadImage: (file) => dispatch(upLoadImage(file)),
  onSaveProductService: (id, product) =>
    dispatch(updateProductService(id, product)),
  onGetProductServiceById: (id) => dispatch(getProductServiceById(id)),
});

export default connect(null, mapDispatchToProps)(ProductUpdate);
