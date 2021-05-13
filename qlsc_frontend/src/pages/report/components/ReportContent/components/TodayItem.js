import React from 'react';

class TodayItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="cnt-item" style={{ background: data.backgroundColorCustom }}>
        <div className="item-l">
          <div>{data.icon}</div>
        </div>
        <div className="item-r">
          <div className="text-ellipsis">{data.value}</div>
          <div className="txt text-ellipsis">{data.name}</div>
        </div>
      </div>
    );
  }
}

TodayItem.defaultProps = {
  data: {
    backgroundColorCustom: '#effbf8',
    name: 'Doanh thu dự kiến',
    value: '0 đ',
    icon: null,
  },
  isLoading: true,
};

export default TodayItem;