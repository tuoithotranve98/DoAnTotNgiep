import React, { useState } from "react";
import FilterByDate from "./FilterByDate/FilterByDate";
import { CSVLink } from "react-csv";
import "./styles.scss";

const headers = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Email", key: "email" },
  { label: "Age", key: "age" },
];

const data = [
  {
    firstName: "Warren",
    lastName: "Morrow",
    email: "sokyt@mailinator.com",
    age: "36",
  },
  {
    firstName: "Gwendolyn",
    lastName: "Galloway",
    email: "weciz@mailinator.com",
    age: "76",
  },
  {
    firstName: "Astra",
    lastName: "Wyatt",
    email: "quvyn@mailinator.com",
    age: "57",
  },
  {
    firstName: "Jasmine",
    lastName: "Wong",
    email: "toxazoc@mailinator.com",
    age: "42",
  },
  {
    firstName: "Brooke",
    lastName: "Mcconnell",
    email: "vyry@mailinator.com",
    age: "56",
  },
  {
    firstName: "Christen",
    lastName: "Haney",
    email: "pagevolal@mailinator.com",
    age: "23",
  },
  {
    firstName: "Tate",
    lastName: "Vega",
    email: "dycubo@mailinator.com",
    age: "87",
  },
  {
    firstName: "Amber",
    lastName: "Brady",
    email: "vyconixy@mailinator.com",
    age: "78",
  },
  {
    firstName: "Philip",
    lastName: "Whitfield",
    email: "velyfi@mailinator.com",
    age: "22",
  },
  {
    firstName: "Kitra",
    lastName: "Hammond",
    email: "fiwiloqu@mailinator.com",
    age: "35",
  },
  {
    firstName: "Charity",
    lastName: "Mathews",
    email: "fubigonero@mailinator.com",
    age: "63",
  },
];

function filename(tab) {
  const dateObj = new Date();
  const month = dateObj.getMonth() + 1;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const strDate = day + "/" + month + "/" + year;
  if (tab === 2) return `phieu_${strDate}.csv`;
  if (tab === 3) return `linhkien_${strDate}.csv`;
  if (tab === 4) return `nhanvien_${strDate}.csv`;
}

function headersForCsv(tab) {
  if (tab === 2) {
    return [
      { label: "STT", key: "stt" },
      { label: "Ngày ", key: "date" },
      { label: "Tổng số phiếu", key: "totalMc" },
      { label: "Tổng số phiếu hoàn thành", key: "success" },
      { label: "Tổng phiếu chưa hoàn thành", key: "unfinished" },
      { label: "Doanh thu", key: "revenue" },
    ];
  }
  if (tab === 3) {
    return [
      { label: "STT", key: "stt" },
      { label: "Mã linh kiện ", key: "code" },
      { label: "Tên linh kiện", key: "name" },
      { label: "Số lượng còn", key: "quantity" },
      { label: "Số lượng đã sử dụng", key: "countProduct" },
      { label: "Doanh thu", key: "revenue" },
    ];
  }
  if (tab === 4) {
    return [
      { label: "STT", key: "stt" },
      { label: "Mã nhân viên", key: "code" },
      { label: "Tên nhân viên", key: "name" },
      { label: "Chức vụ", key: "position" },
      { label: "Số phiếu đã nhận", key: "numberOfMc" },
      { label: "Doanh thu", key: "revenue" },
    ];
  }
  return [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" },
  ];
}

function dataToCsv(data, data2, data3, tab) {
  let dataExport = [];
  if (!data && !data.length) return (dataExport = []);
  if (tab === 2) {
    data.forEach((item, index) => {
      dataExport.push({
        stt: index + 1,
        date: item.dateText,
        totalMc: item.totalMc + ' phiếu',
        success: item.success + ' phiếu',
        unfinished: item.unfinished + ' phiếu',
        revenue: item.revenue + ' đ',
      });
    });
  } else if (tab === 3) {
    data2.forEach((item, index) => {
      dataExport.push({
        stt: index + 1,
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        countProduct: item.countProduct,
        revenue: item.revenue + ' đ',
      });
    });
  } else if (tab === 4) {
    data3.forEach((item, index) => {
      dataExport.push({
        stt: index + 1,
        code: item.code,
        name: item.name,
        position: item.position,
        numberOfMc: item.numberOfMc + ' phiếu',
        revenue: item.revenue + ' đ',
      });
    });
  }
  return dataExport;
}

function Filter(props) {
  const { onChangeTime, tab, dataMain, dataStaff, accessories } = props;
  const csvReport = {
    data: dataToCsv(dataMain, accessories, dataStaff, tab),
    headers: headersForCsv(tab),
    filename: filename(tab),
  };

  const renderTextHeader = () => {
    if (tab === 1) return "Tổng quan báo cáo";
    if (tab === 2) return "Thống kê phiếu sửa chữa";
    if (tab === 3) return "Thống kê linh kiện";
    if (tab === 4) return "Thống kê nhân viên";
    return null;
  };

  const checkData = () => {
    if (tab === 2 && !dataMain.length) return false;
    if (tab === 3 && !accessories.length) return false;
    if (tab === 4 && !dataStaff.length) return false;
    return true;
  }

  return (
    <div className="d-flex flex-wrap align-items-center-report">
      <div className="title-report-dashboard">{renderTextHeader()}</div>
      <FilterByDate onChangeTime={onChangeTime} />
      {tab !== 1 && checkData() && (
        <div className="export-csv">
          <CSVLink {...csvReport}><ExcelExportIcon />Xuất file</CSVLink>
        </div>
      )}
    </div>
  );
}

export default React.memo(Filter);


export const ExcelExportIcon = () => {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
      <path d="M11.375 8.125V10.2917C11.375 10.579 11.2609 10.8545 11.0577 11.0577C10.8545 11.2609 10.579 11.375 10.2917 11.375H2.70833C2.42102 11.375 2.14547 11.2609 1.9423 11.0577C1.73914 10.8545 1.625 10.579 1.625 10.2917V8.125" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.79163 5.41663L6.49996 8.12496L9.20829 5.41663" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 8.125V1.625" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
