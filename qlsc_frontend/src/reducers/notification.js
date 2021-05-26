const initState = {
  notifications: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case "LIVE_NOTIFICATION":
      const { notifications } = state;
      // const newNotifications = notifications.length ? notifications : [];
      // newNotifications.push(action.notification);
      return {
        ...state,
        notifications: [...notifications, action.notification],
      };
    case "CLOSE_PROGRESS_BAR":
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};
