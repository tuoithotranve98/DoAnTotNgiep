import { forEach } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Item from '../Item/Item';
function List(props) {
  return (
    <React.Fragment>
      <div className="list-order-selected">
        {
          props.products.map((product, index)=>{
            return(
              <Item
                product={product}
                key={index}
                removeProduct={(a)=>props.removeProduct(a)}
              />
            )
          })
        }
      </div>
    </React.Fragment>
  );
}

export default connect(null, null)(List);
