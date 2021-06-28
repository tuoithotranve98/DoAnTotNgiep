import React from "react";
import "./styles.scss";

function Guarantee(props) {
  const { mainCard } = props;
  const { maintenanceCardDetails } = mainCard;

  const time = (time) => {
    if (!time) return null;
    const { number, type } = detectTime(time);
    var date = new Date(mainCard.createdDate);
    if (type === 1) {
        date.setMonth(date.getMonth() + parseInt(number));
        return date.toLocaleDateString();
    }
    if (type === 2) {
        date.setDate(date.getDate() + parseInt(number));
        return date.toLocaleDateString();
    }
    if (type === 3) {
        date.setFullYear(date.getFullYear() + parseInt(number));
        return date.toLocaleDateString();
    }
    return null;
  }

  const detectTime = (str) => {
      const number = str.match(/\d+/)[0];
    //   month: 1, day: 2, year: 3
      let type = 1;
      if (str.toLowerCase().includes("tháng")) {
        type = 1;
      } else if (str.toLowerCase().includes("ngày")) {
        type = 2;
      } else if (str.toLowerCase().includes("năm")) {
        type = 3;
      }
      return {
          number,
          type,
      }
  }
  return (
    <div className="main-card-guarantee">
      <div className="title">Thời gian bảo hành</div>
      <div className="wrapper">
        {maintenanceCardDetails && maintenanceCardDetails.length
          ? maintenanceCardDetails.map((item) => {
              if (item.product.type === 2) return null;
              return (
                <div className="d-flex item">
                  <div className="name">{item.product.name}</div>
                  <div>đến ngày : {time(item.product.guarantee)}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Guarantee;
