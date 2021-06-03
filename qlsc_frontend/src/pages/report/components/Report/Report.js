import React from "react";
import ChartEmpty from "../ReportContent/components/ChartEmpty";
import Chart from "./Chart";

/**
 * view:
 * 1: Giá trị bán cao nhất
 * 2: Lượng bán nhiều nhất
 * 3: Tỷ lệ hủy cao
 * 4: Số lượng hủy cao
 * */

function ReportProduct(props) {
  const { data } = props;

  if (!data.length) {
    return (
      <div className="report-product-content">
        <ChartEmpty text="Không đủ dữ liệu để hiển thị"/>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="report-product-content">
        <Chart type={1} data={data} />
      </div>
    </React.Fragment>
  );
}

export default ReportProduct;
