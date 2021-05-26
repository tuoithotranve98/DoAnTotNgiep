/* eslint-disable no-shadow */
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { formatDate } from 'utils/datetimeUtil';
function HistoryAction(props) {
  const { maintenanceCardDetailStatusHistories } = props;
  const showStatusHistory = () => {
    let result = [];
    if (maintenanceCardDetailStatusHistories !== undefined) {
        const maintenanceCardDetailStatusHistories1 = maintenanceCardDetailStatusHistories.sort(function (a, b) {
            return new Date(a.createdDate) - new Date(b.createdDate);
        });
        result = maintenanceCardDetailStatusHistories1.map((maintenanceCardDetailStatusHistory, index) => {
            let title = "";
            let color = ""
            if (maintenanceCardDetailStatusHistory.status === 0) {
                title = "Thêm mới dịch vụ"
                color = "orange"
            }
            else if (maintenanceCardDetailStatusHistory.status === 1) {
                title = "Bắt đầu sửa"
                color = "blue"
            }
            else if (maintenanceCardDetailStatusHistory.status === 2) {
                title = "Hoàn thành"
                color = "green"
            }
            else if (maintenanceCardDetailStatusHistory.status === -1) {
                title = "Đã xóa"
                color = "red"
            }

            return (
                <Timeline>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    {maintenanceCardDetailStatusHistories1.length - 1 === index ? '' : <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <div className="d-flex" style={{justifyContent: 'space-between' }}>
                      <div>
                              <span style={{ fontWeight: 'bold' }}>{title}</span>
                              <p>{maintenanceCardDetailStatusHistory.name}</p>
                          </div>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>{formatDate(maintenanceCardDetailStatusHistory.createdDate)}</span>
                              {/* <p>
                                  {status}
                              </p> */}
                          </div>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            )
        })
    }

    return result
}

  return (
    <div className="main-card-history-action">
      <div className="card info-customer-right-01">
        <div className="title">Lịch sử thay đổi trạng thái dịch vụ</div>
        <div className="content">
          {showStatusHistory()}
        </div>
      </div>
    </div>
  );
}
HistoryAction.defaultProps = {};

export default React.memo(connect(null, null)(HistoryAction));
