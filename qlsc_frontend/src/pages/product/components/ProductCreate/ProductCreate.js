/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import "./styles.scss";
import Accessories from "./Accessories/Accessories";
import Service from "./Service/Service";
function ProductCreate(props) {
  const {} = props;
  const [user, setUser] = useState({
    name: null,
    code: null,
    phone: null,
    email: null,
    address: null,
    city: null,
    ward: null,
    description: null,
  });
  const [showContent, setShowContent] = useState(0)
  useEffect(() => {}, []);
  return (
    <React.Fragment>

      <div className="product-screen-wrapper-create">
      <TitleAndAction setShowContent={(a) => setShowContent(a)} />
        <div className="row">
          {
            showContent === 0 ?   <Accessories /> : <Service />
          }

        </div>
      </div>
    </React.Fragment>
  );
}
ProductCreate.defaultProps = {};

export default React.memo(connect(null, null)(ProductCreate));
