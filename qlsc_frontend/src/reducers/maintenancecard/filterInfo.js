import * as actionTypes from 'actions/actionTypes';

const initState = {
  slectedFilter: [],
  showFilter: false,
  filterText: '',
  statusWork: '',
  statusPayment: '',
  endDate: '',
  startDate: '',
};

const filterInfo = (state = initState, action) => {
  switch (action.type) {
    // case actionTypes.SHOW_MAIN_CARD_FILTER:
    //   return {
    //     ...state,
    //     showFilter: action.show,
    //   };
    // case actionTypes.SHOW_DELIVERY_COLLATIONS_FILTER_BY_STORE:
    //   return {
    //     ...state,
    //     showFilterByStore: action.show,
    //   };
    // case actionTypes.CHANGE_DELIVERY_COLLATIONS_FILTER_INFO:
    //   return {
    //     ...state,
    //     showFilter: action.filterInfo.showFilter,
    //     filterText: action.filterInfo.filterText,
    //     statusWork: action.filterInfo.statusWork,
    //     statusPayment: action.filterInfo.statusPayment,
    //     endDate: action.filterInfo.endDate,
    //     startDate: action.filterInfo.startDate,
    //   };
    default:
      return state;
  }
};

export default filterInfo;
