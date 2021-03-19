/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import * as Icons from 'common/icons'
export const menuLink = [
  {
    id: 99,
    url: '/dashboard',
    icon: <Icons.ReportIcon />,
    title: 'Tổng quan',
    submenu: []
  },
  {
    id: 0,
    url: '/maintenancecard',
    icon: <Icons.CustomerIcon />,
    title: 'Phiếu sửa chữa',
    submenu: [
      {
        id: 0,
        url: '/maintenancecard/create',
        title: 'Thêm mới phiếu sửa chữa'
      },
      {
        id: 1,
        url: '/maintenancecard',
        title: 'Danh sách phiếu sửa chữa'
      }
    ]
  },
  {
    id: 1,
    url: '/customer',
    icon: <Icons.CustomerIcon />,
    title: 'Khách hàng',
    submenu: [
      {
        id: 0,
        url: '/customer/create',
        title: 'Thêm mới khách hàng'
      },
      {
        id: 1,
        url: '/customer',
        title: 'Danh sách khách hàng'
      }
    ]
  },
  {
    id: 2,
    url: '/product',
    icon: <Icons.ProductIcon />,
    title: 'Sản phẩm',
    submenu: [
      {
        id: 0,
        url: '/product/create',
        title: 'Thêm mới sản phẩm'
      },
      {
        id: 1,
        url: '/product',
        title: 'Danh sách sản phẩm'
      }
    ]
  },
  {
    id: 3,
    url: '/staff',
    icon: <Icons.ReportIcon />,
    title: 'Nhân viên',
    submenu: [
      {
        id: 0,
        url: '/staff/create',
        title: 'Thêm mới nhân viên'
      },
      {
        id: 1,
        url: '/staff',
        title: 'Danh sách nhân viên'
      }
    ]
  },
  {
    id: 4,
    url: '/report',
    icon: <Icons.ReportIcon />,
    title: 'Báo cáo',
    submenu: []
  }
]
