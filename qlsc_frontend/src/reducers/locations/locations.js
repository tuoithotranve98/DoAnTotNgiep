import * as actionTypes from "actions/actionTypes";
const initState = {
  city: {},
  ward: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LOCATION_RECEIVE_CITY:
      const { data } = action;
      if (data) {
        return {
          ...state,
          city: data,
        };
      }
      return {
        ...state,
      };
    case actionTypes.LOCATION_RECEIVE_WARD: {
      const { data } = action;
      if (data) {
        return {
          ...state,
          ward: data,
        };
      }
      return {
        ...state,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
