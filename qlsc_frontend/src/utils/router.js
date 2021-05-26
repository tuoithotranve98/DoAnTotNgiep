import React from 'react'
import * as Icons from 'common/icons'

export default {
  menuLinkFull,
  menuLinkRepairer,
  menuLinkCoordinator,
};

export const menuLinkCoordinator = [
  {
    id: 0,
    url: '/maintenance-card',
    icon: <Icons.MainCard />,
    title: 'Phiếu sửa chữa',
    submenu: [
      {
        id: 0,
        url: '/maintenance-card/create',
        title: 'Thêm mới phiếu'
      },
      {
        id: 1,
        url: '/maintenance-cards',
        title: 'Danh sách phiếu'
      }
    ]
  },
  {
    id: 1,
    url: '/customer',
    icon: <Icons.Customer />,
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
    icon: <Icons.Product />,
    title: 'Linh kiện - Dịch vụ',
    submenu: [
      {
        id: 0,
        url: '/products',
        title: 'Danh sách linh kiện - dịch vụ'
      }
    ]
  },
];

export const menuLinkRepairer = [
  {
    id: 0,
    url: '/maintenance-card',
    icon: <Icons.MainCard />,
    title: 'Phiếu sửa chữa',
    submenu: [
      {
        id: 0,
        url: '/maintenance-cards',
        title: 'Danh sách phiếu'
      }
    ]
  },
  {
    id: 2,
    url: '/product',
    icon: <Icons.Product />,
    title: 'Linh kiện - Dịch vụ',
    submenu: [
      {
        id: 0,
        url: '/products',
        title: 'Danh sách linh kiện - dịch vụ'
      }
    ]
  },
]


export const menuLinkFull = [
  {
    id: 0,
    url: '/maintenance-card',
    icon: <Icons.MainCard />,
    title: 'Phiếu sửa chữa',
    submenu: [
      {
        id: 0,
        url: '/maintenance-card/create',
        title: 'Thêm mới phiếu'
      },
      {
        id: 1,
        url: '/maintenance-cards',
        title: 'Danh sách phiếu'
      },
      {
        id: 2,
        url: '/maintenance-card/detail/',
      }
    ]
  },
  {
    id: 1,
    url: '/customer',
    icon: <Icons.Customer />,
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
        id: 2,
        url: '/customer/detail/',
      }
    ]
  },
  {
    id: 2,
    url: '/product',
    icon: <Icons.Product />,
    title: 'Linh kiện - Dịch vụ',
    submenu: [
      {
        id: 0,
        url: '/product/create',
        title: 'Thêm mới'
      },
      {
        id: 1,
        url: '/products',
        title: 'Danh sách'
      },
    ]
  },
  {
    id: 3,
    url: '/staff',
    icon: <Icons.User />,
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
        id: 2,
        url: '/staff/detail/',
      }
    ]
  },

  {
    id: 4,
    url: '/report',
    icon: <Icons.Report />,
    title: 'Báo cáo',
    submenu: []
  },

]
