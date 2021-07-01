import * as globalUiActionTypes from 'actions/actionTypes';

export const changeShowFeedBack = (show) => ({
  type: globalUiActionTypes.SHOW_FEED_BACK,
  show,
});
