import React, { useRef } from "react";
import "./styles.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
import vi from "date-fns/locale/vi";
import DatePicker, { registerLocale } from "react-datepicker";
import SelectStaff from "./SelectStaff";

registerLocale("vi", vi);
function InfoMainCard(props) {
  const { mainCard, onChangeMainCard, onChangeMainCardReairMan, finish } =
    props;
  const coordinator = mainCard.coordinator || {};
  const calendar2 = useRef();

  const onClickFocusEndDate = () => {
    //
  };

  const onClickFocusStartDate = () => {
    //
  };
  return (
    <div className="info-main-card-warpper">
      <div className="title">Thông tin phiếu sửa chữa</div>
      <div className=" field">
        <div className="label">Mã phiếu</div>
        <input
          className="customer-name"
          type="text"
          name="code"
          readOnly
          value={mainCard.code || ""}
          onChange={(e) => onChangeMainCard("code", e.target.value)}
          placeholder="Nhập mã phiếu"
        />
      </div>
      <div className=" field">
        <div className="label">Biển số xe</div>
        <input
          className="customer-name"
          type="text"
          name="platesNumber"
          value={mainCard.platesNumber || ""}
          onChange={(e) => onChangeMainCard("platesNumber", e.target.value)}
          placeholder="Nhập biển số xe"
        />
      </div>
      <div className=" field">
        <div className="label">Nhân viên sửa chữa</div>
        <SelectStaff
          finish={finish}
          staff={mainCard.repairman || ""}
          onSelect={(e) =>
            onChangeMainCardReairMan("repairman", e.target.value)
          }
        />
      </div>
      <div className=" field">
        <div className="label">Màu xe</div>
        <input
          className="customer-name"
          type="text"
          name="color"
          value={mainCard.color || ""}
          onChange={(e) => onChangeMainCard("color", e.target.value)}
          placeholder="Nhập màu xe"
        />
      </div>
      <div className=" field">
        <div className="label">Loại xe</div>
        <input
          className="customer-name"
          type="text"
          name="model"
          value={mainCard.model || ""}
          onChange={(e) => onChangeMainCard("model", e.target.value)}
          placeholder="Nhập loại xe"
        />
      </div>

      <div className=" field">
        <div className="label">Nhân viên điều phối</div>
        <input
          className="customer-name"
          type="text"
          name="phone"
          readOnly
          disabled
          value={coordinator.name || ""}
        />
      </div>
      <div className=" field">
        <div className="label">Ngày trả xe</div>
        <div id="old-order-prepayment-datetime">
          <DatePicker
            closeOnScroll
            selected={
              mainCard.returnDate ? new Date(mainCard.returnDate) : null
            }
            minDate={new Date()}
            onChange={(e) => onChangeMainCard("returnDate", e)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Ngày trả xe thực tế"
            locale="vi"
            disabled
          />
          <span className="icon-calendar" onClick={onClickFocusStartDate}>
            <Icons.IconCalendar />
          </span>
        </div>
      </div>
      <div className=" field">
        <div className="label">Ngày dự kiến trả xe</div>
        <div id="old-order-prepayment-datetime" style={{ marginTop: "10px" }}>
          <DatePicker
            closeOnScroll
            selected={
              mainCard.expectedReturnDate
                ? new Date(mainCard.expectedReturnDate)
                : new Date()
            }
            onChange={(e) => onChangeMainCard("expectedReturnDate", e)}
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
        <div className="label">Ghi chú</div>
        <textarea
          name="description"
          placeholder="Ghi chú"
          name="description"
          value={mainCard.description || ""}
          onChange={(e) => onChangeMainCard("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default InfoMainCard;
