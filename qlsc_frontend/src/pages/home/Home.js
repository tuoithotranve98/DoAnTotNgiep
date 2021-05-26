import React from "react";
import * as Icons from 'pages/home/commons/Icons' 
const listAction = [
    {
        id: 1,
        color: '#0088FF',
        icon: <Icons.Product/>,
        title: 'Bước 1. Thêm linh kiện',
        subtitle: 'Tạo mới và quản lý linh kiện của bạn',
        txtButton: 'Thêm linh kiện',
        background: '#F2F9FF',
    },
    {
        id: 2,
        color: '#ffbe38',
        icon: <Icons.Customer/>,
        title: 'Bước 2. Thêm khách hàng',
        subtitle: 'Tạo mới và quản lý khách hàng của bạn',
        txtButton: 'Thêm khách hàng',
        background: '#F2F9FF',
    },
    {
        id: 3,
        color: '#3fda9e',
        icon: <Icons.MainCard/>,
        title: 'Bước 3. Thêm phiếu',
        subtitle: 'Tạo mới và quản lý phiếu sửa chữa của bạn',
        txtButton: 'Thêm phiếu',
        background: '#F3FCF9',
    },
]
function Home() {
  return (
    <React.Fragment>
      <div className="home-container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="header">
                <div className="title">
                  Chào mừng Nguyễn Thu Hà, bắt đầu sử dụng phần mềm Kiomo ngay
                  nào!
                </div>
                <div className="sub-title">
                  Hãy dành ít phút thực hiện các bước sau đây để làm quen bạn
                  nhé.
                </div>
              </div>
              <div className="d-flex content">
               {
                   listAction.map((item, index) => {
                       return(
                        <div className="list-action">
                            <div>
                                {item.icon}
                            </div>
                            <div>
                                {item.title}
                            </div>
                            <div>
                                {item.subtitle}
                            </div>
                            <div>
                                {item.txtButton}
                            </div>
                        </div>
                       )
                   })
               }
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
