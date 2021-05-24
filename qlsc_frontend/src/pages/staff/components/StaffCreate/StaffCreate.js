import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TitleAndAction from "./TitleAndAction/TitleAndAction";
import InfoStaffFooter from "./InfoStaffFooter/InfoStaffFooter";
import InfoStaffLeft from "./InfoStaffLeft/InfoStaffLeft";
import InfoStaffRight from "./InfoStaffRight/InfoStaffRight";
import "./styles.scss";
import { saveStaff } from "../../actions/staffAction";
import pushstate from "utils/pushstate";
import { toastError } from "../../../../utils/toast";

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
  const [isValidate, setIsValidate] = useState(true);
  const [actionSave, setActionSave] = useState(false);
  useEffect(() => {}, []);

  const onChangeStaff = (type, value) => {
    setActionSave(false);
    setStaff(() => {
      return {
        ...staff,
        [type]: value,
      };
    });
  };
  const saveStaff = () => {
    setActionSave(true);
    if (isValidate) {
      toastError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    onSaveStaff(staff).then((json) => {
      if (json ) {
        setStaff(initialState);
        pushstate(props.history, "/staffs");
      }
    });
  };
  const onChangeStatusValidate = (status) => {
    setIsValidate(status);
  };
  const cancel = () => {
    setStaff(initialState);
    pushstate(props.history, "/staffs");
  };
  return (
    <div className="staff-screen-wrapper-create">
      <TitleAndAction saveCustomer={saveStaff} cancel={cancel}/>
      <div className="row">
        <div className="col-md-8">
          <InfoStaffLeft
            actionSave={actionSave}
            onChangeStaff={onChangeStaff}
            staff={staff}
            onChangeStatusValidate={onChangeStatusValidate}
          />
        </div>
        <div className="col-md-4">
          <InfoStaffRight
            actionSave={actionSave}
            onChangeStaff={onChangeStaff}
            staff={staff}
            onChangeStatusValidate={onChangeStatusValidate}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffCreate);
