import React from 'react';
import './styles.scss';
import Wrapper from './TableBody/components/Wrapper/Wrapper';
import TableHeader from './TableHeader/TableHeader';

function HistoryMainCard() {
  return (
    <div className="customer-list-body">
      <TableHeader />
      <div className="dashboard-body-content">
        <div className="content-container">
          <Wrapper />
        </div>
      </div>
    </div>
  );
}
export default HistoryMainCard;
