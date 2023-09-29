export const CONSTANT = {
  fetch_start: 'FETCH_HOME_START',
  fetch_succes: 'FETCH_HOME_SUCCESS',
  fetch_error: 'FETCH_HOME_ERROR',
  fetch_news_start: 'FETCH_NEWS_START',
  fetch_news_succes: 'FETCH_NEWS_SUCCESS',
  fetch_news_error: 'FETCH_NEWS_ERROR',
  fetch_notification_start: 'FETCH_NOTIFICATION_START',
  fetch_notification_succes: 'FETCH_NOTIFICATION_SUCCESS',
  fetch_notification_error: 'FETCH_NOTIFICATION_ERROR',

  update_language: 'UPDATE_LANGUAGE',

  restore_data: 'RESTORE_HOME_DATA',
};

export const initialState = {
  isLoading: true,
  isFetching: false,
  ongoinglive: [],
  upcominglive: [],
  completedlive: [],
  tests: [],
  student_data: [],
  language: 'en',
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case CONSTANT.restore_data:
      return {
        ...state,
        ...action.state,
        isLoading: false,
      };
    case CONSTANT.fetch_start:
      return {
        ...state,
        isFetching: true,
      };
    case CONSTANT.fetch_succes:
      return {
        ...state,
        isFetching: false,
        ongoinglive: action.ongoinglive,
        upcominglive: action.upcominglive,
        completedlive: action.completedlive,
        tests: action.tests,
        student_data: action.student_data,
      };
    case CONSTANT.fetch_error:
      return {
        ...state,
        isFetching: false,
      };
    // News
    case CONSTANT.fetch_news_start:
      return {
        ...state,
        isFetchingNews: true,
      };
    case CONSTANT.fetch_news_succes:
      return {
        ...state,
        isFetchingNews: false,
        all_news: action.news,
      };
    case CONSTANT.fetch_news_error:
      return {
        ...state,
        isFetchingNews: false,
      };

    case CONSTANT.update_language:
      return {
        ...state,
        language: action.language,
      };
    // Notification
    case CONSTANT.fetch_notification_start:
      return {
        ...state,
        isFetchingNotification: true,
      };
    case CONSTANT.fetch_notification_succes:
      return {
        ...state,
        isFetchingNotification: false,
        notifications: action.notifications,
      };
    case CONSTANT.fetch_notification_error:
      return {
        ...state,
        isFetchingNotification: false,
      };
    default:
      return state;
  }
};
