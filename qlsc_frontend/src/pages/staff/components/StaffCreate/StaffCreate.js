import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import InfoStaffFooter from "./InfoStaffFooter/InfoStaffFooter";
import InfoStaffLeft from "./InfoStaffLeft/InfoStaffLeft";
import InfoStaffRight from "./InfoStaffRight/InfoStaffRight";
import "./styles.scss";
import { saveStaff } from "../../actions/staffAction";
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
function StaffCreate(props) {
  const { onSaveStaff } = props;
  const [staff, setStaff] = useState(initialState);
  useEffect(() => {}, []);

  const onChangeStaff = (type, value) => {
    setStaff(() => {
      return {
        ...staff,
        [type]: value,
      };
    });
  };
  const saveStaff = () => {
    onSaveStaff(staff).then((json) => {
      if (json && json.success) {
        setStaff(initialState);
        pushstate(props.history, "/staffs");
      }
    });
  };
  const cancel = () => {
    setStaff(initialState);
    pushstate(props.history, "/staff");
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
StaffCreate.defaultProps = {};

const mapStateToProps = (state) => {
  //
};
const mapDispatchToProps = (dispatch) => ({
  onSaveStaff: (staff) => dispatch(saveStaff(staff)),
});

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(StaffCreate));
