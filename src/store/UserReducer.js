export const CONSTANT = {
  fetch_profile_start: 'FETCH_PROFILE_START',
  fetch_profile_success: 'FETCH_PROFILE_SUCCESS',
  fetch_profile_error: 'FETCH_PROFILE_ERROR',
  post_profile_start: 'POST_PROFILE_START',
  post_profile_failed: 'POST_PROFILE_FAILED',
  restore_data: 'RESTORE_TOKEN',
  sign_in: 'SIGN_IN',
  sign_out: 'SIGN_OUT',

  fetch_initial_loading: 'FETCH_INITIAL_LOADING',
};

export const initialState = {
  isLoading: true,
  isSignout: false,
  token: null,
  session_data: {},
  user_type: null,
  isProfileFetching: false,
  isSubmittingProfile: false,
  profile_data: [],

  first_open: true,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case CONSTANT.restore_data:
      return {
        ...state,
        ...action.state,
        isLoading: false,
      };
    case CONSTANT.sign_in:
      return {
        ...state,
        isSignout: false,
        token: action.token,
        session_data: action.session_data,
        user_type: action.user_type,
      };
    case CONSTANT.sign_out:
      return {
        ...state,
        isSignout: true,
        token: null,
        user_type: null,
      };
    case CONSTANT.fetch_profile_start:
      return {
        ...state,
        isProfileFetching: true,
      };
    case CONSTANT.fetch_profile_success:
      // var new_user = state.current_user;
      // new_user.photo = action.profiledata.profile.user.photo;
      // new_user.name = action.profiledata.profile.user.first_name;
      // new_user.student_id = action.profiledata.profile.reg_no;
      return {
        ...state,
        isProfileFetching: false,
        profile_data: action.profiledata,
      };
    case CONSTANT.fetch_profile_error:
      return {
        ...state,
        isProfileFetching: false,
        error_fetch: '',
      };

    case CONSTANT.post_profile_start:
      return {
        ...state,
        isSubmittingProfile: true,
      };
    case CONSTANT.post_profile_failed:
      return {
        ...state,
        isSubmittingProfile: false,
      };

    case CONSTANT.fetch_initial_loading:
      return {
        ...state,
        first_open: false,
      };
    default:
      return state;
  }
};

export default authReducer;
