import * as actionTypes from 'actions/actionTypes';

const initState = {
  currentPage: 0,
  staffs: [],
  totalItem: 0,
  totalPage: 0,
  staff: {},
  //state giao điện
  fetching: false,
  isEmpty: false,
  staffByRepairMan: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_STAFFS:
      return {
        ...state,
        staffs: action.users,
        currentPage: action.currentPage,
        totalItem: action.totalElement,
        totalPage: action.totalPage,
      }
    case actionTypes.RECEIVE_STAFF:
      return {
        ...state,
        staff: action.staff,
      }
    case "UPDATE_TOTAL_MAINTENANCE_CARD":
      let updateStaff = state.staffByRepairMan.find(staff => staff.id === action.id);
      updateStaff.text = `${updateStaff.name} - ${updateStaff.totalMaintenanceCard + 1}`;
      updateStaff.totalMaintenanceCard += 1;
      let newStaffs = state.staffByRepairMan.filter(staff => staff.id !== action.id);
      newStaffs.push(updateStaff);
      console.log('check id', newStaffs);
      return {
        ...state,
        staffByRepairMan: newStaffs,
      }
    case actionTypes.STAFF_BY_REPAIRMAN:
      return {
        ...state,
        staffByRepairMan: action.data,
      }
    case actionTypes.STAFF_FETCHING:
      return {
        ...state,
        fetching: action.bool,
      };
    case actionTypes.STAFF_IS_EMPTY:
      return {
        ...state,
        isEmpty: action.bool,
      };
    default:
      return state;
  }
};

