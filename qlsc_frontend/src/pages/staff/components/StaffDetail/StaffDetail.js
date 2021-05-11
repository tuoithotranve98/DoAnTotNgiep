import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import StaffDetailInfo from './StaffDetailInfo/StaffDetailInfo';
import { useParams } from "react-router-dom";
import { getStaffById } from '../../actions/staffAction';
import './styles.scss';
import StaffHistoryMainCardList from './StaffHistoryMainCard/StaffHistoryMainCardList';
import TitleAndAction from './TitleAndAction/TitleAndAction';
function StaffDetail(props) {
  const { id } = useParams();
  const { staff, onGetStaffById } = props;
  useEffect(() => {
    if (id) {
      onGetStaffById(id);
    }
  }, []);
  return (
    <div className="staff-screen-wrapper-detail">
        <TitleAndAction staff={staff} />
        <StaffDetailInfo staff={staff} />
        <StaffHistoryMainCardList  staff={staff}  />
    </div>
  );
}
StaffDetail.defaultProps = {
  staff: {},
};

const mapStateToProps = (state) => {
  const {
    staff: { staff }
  } = state
  return {
    staff,
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetStaffById: (id) => dispatch(getStaffById(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffDetail));
