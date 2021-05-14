
import * as actionTypes from "actions/actionTypes";
import { API_USER } from "constants/api";
import { fetch } from "utils/fetchMiddleware";


export const getStaffsByRepairman = () => (
  dispatch
) => {
  return dispatch(
    fetch(`${API_USER}/users/maintenanceCard`, {
      method: "GET",
    })
  )
    .then((json) => {
      dispatch({
        type: actionTypes.STAFF_BY_REPAIRMAN,
        data: json.listUser,
      });
    })
    .catch((e) => {
      console.log("e", e);
    });
};
