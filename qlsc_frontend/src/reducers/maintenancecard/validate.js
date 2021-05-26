const initState = {
  customerIsValid: false,
  serviceIsValid: false,
  isvalid: true,
};
export default (state = initState, action) => {
  switch (action.type) {
    case "CUSTOMER_VALID":
      return {
        ...state,
        customerIsValid: action.status,
      };
    case "SERVICE-VALID":
      return {
        ...state,
        serviceIsValid: action.status,
      };
    case "MAINTENAN-CARD-VALID":
      return {
        ...state,
        isvalid: action.status,
      };
    case "CLEAR-VALID":
      return {
        ...state,
        isvalid: true,
        customerIsValid: false,
        serviceIsValid: false,
      };
    default:
      return state;
  }
};
