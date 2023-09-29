export const CONSTANT = {
  LIGHTMODE: 'LIGHTMODE',
  DARKMODE: 'DARKMODE',
  set_theme: 'SET_THEME',
  fetch_error: 'FETCH_HOME_ERROR',

  //
  restore_data: 'RESTORE_HOME_DATA',
};

export const initialState = {
  isLoading: true,
  isFetching: true,
  darkMode: false,
  AppThemeMode: 'light',
  AppThemeColors: {},
};

export const Reducer = (state, action) => {
  switch (action.type) {
    case CONSTANT.restore_data:
      return {
        ...state,
        ...action.state,
        isLoading: false,
      };
    case CONSTANT.LIGHTMODE:
      return {...state, darkMode: false};
    case CONSTANT.DARKMODE:
      return {...state, darkMode: true};
    case CONSTANT.set_theme:
      return {
        ...state,
        AppThemeColors: action.themecolors,
        AppThemeMode: action.thememode,
      };
    default:
      return state;
  }
};
