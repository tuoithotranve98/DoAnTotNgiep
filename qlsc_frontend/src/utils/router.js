import React from 'react'
import * as Icons from 'common/icons'

export default {
  menuLinkFull,
  menuLinkRepairer,
  menuLinkCoordinator,
};

export const menuLinkCoordinator = [
  // {
  //   id: 0,
  //   url: '/home',
  //   icon: <Icons.Home />,
  //   title: 'Tổng quan',
  //   submenu: []
  // },
  {
    id: 1,
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
    id: 2,
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
  // {
  //   id: 3,
  //   url: '/product',
  //   icon: <Icons.Product />,
  //   title: 'Linh kiện',
  //   submenu: [
  //     {
  //       id: 0,
  //       url: '/product/create',
  //       title: 'Thêm mới linh kiện'
  //     },
  //     {
  //       id: 1,
  //       url: '/products',
  //       title: 'Danh sách linh kiện'
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   url: '/service',
  //   icon: <Icons.Service />,
  //   title: 'Dịch vụ',
  //   submenu: [
  //     {
  //       id: 0,
  //       url: '/service/create',
  //       title: 'Thêm mới dịch vụ'
  //     },
  //     {
  //       id: 1,
  //       url: '/services',
  //       title: 'Danh sách dịch vụ'
  //     }
  //   ]
  // },
];

export const menuLinkRepairer = [
  // {
  //   id: 0,
  //   url: '/home',
  //   icon: <Icons.Home />,
  //   title: 'Tổng quan',
  //   submenu: []
  // },
  {
    id: 1,
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
    title: 'Linh kiện',
    submenu: [
      {
        id: 0,
        url: '/products',
        title: 'Danh sách linh kiện'
      }
    ]
  },
  {
    id: 3,
    url: '/service',
    icon: <Icons.Service />,
    title: 'Dịch vụ',
    submenu: [
      {
        id: 0,
        url: '/services',
        title: 'Danh sách dịch vụ'
      }
    ]
  },
]


export const menuLinkFull = [
  {
    id: 0,
    url: '/home',
    icon: <Icons.Home />,
    title: 'Tổng quan',
    submenu: []
  },
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    url: '/product',
    icon: <Icons.Product />,
    title: 'Linh kiện',
    submenu: [
      {
        id: 0,
        url: '/product/create',
        title: 'Thêm mới linh kiện'
      },
      {
        id: 1,
        url: '/products',
        title: 'Danh sách linh kiện'
      }
    ]
  },
  {
    id: 4,
    url: '/service',
    icon: <Icons.Service />,
    title: 'Dịch vụ',
    submenu: [
      {
        id: 0,
        url: '/service/create',
        title: 'Thêm mới dịch vụ'
      },
      {
        id: 1,
        url: '/services',
        title: 'Danh sách dịch vụ'
      }
    ]
  },
  {
    id: 5,
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
    id: 6,
    url: '/report',
    icon: <Icons.Report />,
    title: 'Báo cáo',
    submenu: []
  },

]
