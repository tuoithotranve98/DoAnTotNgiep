/* eslint-disable react/react-in-jsx-scope */
import React from 'react'
import * as Icons from 'common/icons'

export default {
  menuLinkFull,
  menuLinkCoordinator,
};

export const menuLinkCoordinator = [
  {
    id: 0,
    url: '/maintenance-card',
    icon: <Icons.CustomerIcon />,
    title: 'Phiếu sửa chữa',
    submenu: [
      {
        id: 0,
        url: '/maintenance-card/create',
        title: 'Thêm mới phiếu sửa chữa'
      },
      {
        id: 1,
        url: '/maintenance-cards',
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
        url: '/customers',
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
        url: '/products',
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
        url: '/staffs',
        title: 'Danh sách nhân viên'
      }
    ]
  },
]


export const menuLinkFull = [
  {
    id: 5,
    url: '/',
    icon: <Icons.ReportIcon />,
    title: 'Tổng quan',
    submenu: []
  },
  {
    id: 0,
    url: '/maintenance-card',
    icon: <Icons.CustomerIcon />,
    title: 'Phiếu sửa chữa',
    submenu: [
      {
        id: 0,
        url: '/maintenance-card/create',
        title: 'Thêm mới phiếu sửa chữa'
      },
      {
        id: 1,
        url: '/maintenance-cards',
        title: 'Danh sách phiếu sửa chữa'
      },
      {
        id: 3,
        url: '/maintenance-card/detail/',
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
        url: '/customers',
        title: 'Danh sách khách hàng'
      },
      {
        id: 3,
        url: '/customer/detail/',
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
        url: '/products',
        title: 'Danh sách sản phẩm'
      },
      {
        id: 3,
        url: '/product/detail/',
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
        url: '/staffs',
        title: 'Danh sách nhân viên'
      },
      {
        id: 3,
        url: '/staff/detail/',
      }
    ]
  },

  {
    id: 4,
    url: '/report',
    icon: <Icons.ReportIcon />,
    title: 'Báo cáo',
    submenu: []
  },

]
