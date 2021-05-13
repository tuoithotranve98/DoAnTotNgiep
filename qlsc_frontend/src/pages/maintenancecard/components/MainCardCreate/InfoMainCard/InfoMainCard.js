import React, { useState, useRef } from "react";
import "./styles.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
import vi from "date-fns/locale/vi";
import DatePicker, { registerLocale } from "react-datepicker";
import SelectStaff from "./SelectStaff";

registerLocale("vi", vi);
function InfoMainCard(props) {
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [focusEndDate, setFocusEndDate] = useState(true);
  const [focusStartDate, setFocusStartDate] = useState(true);
  const calendar1 = useRef();
  const calendar2 = useRef();

  const onClickFocusEndDate = () => {
    setFocusEndDate(!focusEndDate);
    calendar2.current.setOpen(focusEndDate);
  };

  const onClickFocusStartDate = () => {
    setFocusStartDate(!focusStartDate);
    calendar2.current.setOpen(focusStartDate);
  };

  return (
    <div className="info-main-card-warpper">
      <div className="title">Thông tin phiếu sửa chữa</div>
      <div className=" field">
        <div className="label">Mã phiếu</div>
        <input
          className="customer-name"
          type="text"
          name="phone"
          onChange={(e) => this.onChangePhone(e.target.value)}
        />
      </div>
      <div className=" field">
        <div className="label">Biển số xe</div>
        <input
          className="customer-name"
          type="text"
          name="phone"
          onChange={(e) => this.onChangePhone(e.target.value)}
        />
      </div>
      <div className=" field">
        <div className="label">Nhân viên sửa chữa</div>
          <SelectStaff />
      </div>
      <div className=" field">
        <div className="label">Màu xe</div>
        <input
          className="customer-name"
          type="text"
          name="phone"
          onChange={(e) => this.onChangePhone(e.target.value)}
        />
      </div>
      <div className=" field">
        <div className="label">Loại xe</div>
        <input
          className="customer-name"
          type="text"
          name="phone"
          onChange={(e) => this.onChangePhone(e.target.value)}
        />
      </div>

      <div className=" field">
        <div className="label">Nhân viên đồi phối</div>
        <input
          className="customer-name"
          type="text"
          name="phone"
          readOnly
          disabled
          value="Nguyễn Thọ"
          onChange={(e) => this.onChangePhone(e.target.value)}
        />
      </div>
      <div className=" field">
        <div className="label">Ngày trả xe</div>
        <div id="old-order-prepayment-datetime">
          <DatePicker
            closeOnScroll
            selected={startDate}
            minDate={new Date()}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Từ ngày"
            locale="vi"
            ref={calendar1}
          />
          <span className="icon-calendar" onClick={onClickFocusStartDate}>
            <Icons.IconCalendar />
          </span>
        </div>
      </div>
      <div className=" field">
        <div className="label">Ngày dự kiến trả xe</div>
        <div
            id="old-order-prepayment-datetime"
            style={{ marginTop: '10px' }}
          >
            <DatePicker
              closeOnScroll
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              placeholderText="Ngày dự kiến trả xe"
              dateFormat="dd/MM/yyyy"
              locale="vi"
              ref={calendar2}
            />
            <span className="icon-calendar" onClick={onClickFocusEndDate}>
              <Icons.IconCalendar />
            </span>
          </div>
      </div>
      <div className=" field">
        <div className="label">Mô tả</div>
        <textarea
          name="description"
          placeholder="Ghi chú"
          // value={customer.description || ''}
          // onChange={(e) => onChangeCustomer("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default InfoMainCard;
