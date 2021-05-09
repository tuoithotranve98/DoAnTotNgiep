import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import InfoStaffFooter from "./InfoStaffFooter/InfoStaffFooter";
import InfoStaffLeft from "./InfoStaffLeft/InfoStaffLeft";
import InfoStaffRight from "./InfoStaffRight/InfoStaffRight";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { updateStaff, getStaffById } from "../../actions/staffAction";
import pushstate from "utils/pushstate";

const initialState = {
  name: null,
  code: null,
  phone: null,
  email: null,
  address: null,
  description: null,
  password: null,
  role: 1,
};
function StaffUpdate(props) {
  const { onSaveStaff, onGetStaffById } = props;
  const { id } = useParams();
  const [staff, setStaff] = useState(initialState);
  useEffect(() => {
    if (id) {
      onGetStaffById(id).then((json) => {
        if (json) setStaff(json);
      });
    }
  }, []);

  const onChangeStaff = (type, value) => {
    setStaff(() => {
      return {
        ...staff,
        [type]: value,
      };
    });
  };
  const saveStaff = () => {
    onSaveStaff(id, staff).then((json) => {
      if (json && json.success) {
        setStaff(initialState);
        pushstate(props.history, "/staffs");
      }
    });
  };
  const cancel = () => {
    setStaff(initialState);
    pushstate(props.history, "/staffs");
  };
  return (
    <div className="staff-screen-wrapper-create">
      <TitleAndAction />
      <div className="row">
        <div className="col-md-8">
          <InfoStaffLeft onChangeStaff={onChangeStaff} staff={staff} />
        </div>
        <div className="col-md-4">
          <InfoStaffRight onChangeStaff={onChangeStaff} staff={staff} />
        </div>
        <InfoStaffFooter saveStaff={saveStaff} cancel={cancel} />
      </div>
    </div>
  );
}
StaffUpdate.defaultProps = {};

const mapStateToProps = (state) => {
  //
};
const mapDispatchToProps = (dispatch) => ({
  onSaveStaff: (id, staff) => dispatch(updateStaff(id, staff)),
  onGetStaffById: (id) => dispatch(getStaffById(id)),
});

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(StaffUpdate)
);
