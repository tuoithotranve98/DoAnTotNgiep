import * as actionTypes from 'actions/actionTypes';

const initState = {
  items: {},
  total: 0,
  page: 1,
  selectedIds: [],
  listOrderCollation: [],
  checkCreate: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    // case actionTypes.GET_MAIN_CARD: {
    //   return {
    //     ...state,
    //     items: action.data.items,
    //     total: action.data.total,
    //     page: action.data.page,
    //   };
    // }
    default:
      return state;
  }
};
const filterOrderCollation = (ids, list) => {
  const arr = [];
  let check = false;
  for (let index = 0; index < ids.length; index++) {
    const item = ids[index];
    const a = list[item];
    arr.push(a);
    if (arr.length > 0) {
      const locationId = arr[0].sapo_location_id;
      if (locationId !== a.sapo_location_id) {
        check = true;
      }
    }
  }
  const tmp = {
    list: arr,
    check
  };
  return tmp;
};

const addOrderCollation = (list, item) => {
  const newArr = [...list];
  let check = false;
  if (newArr.length === 0) {
    newArr.push(item);
  } else {
    newArr.forEach(element => {
      if (element.id === item.id) {
        check = true;
      }
    });
    if (check) {
      SapoApp.flashError('Đơn hàng đã có trong danh sách');
    }
    if (!check) {
      newArr.push(item);
    }
  }
  return newArr;
};
