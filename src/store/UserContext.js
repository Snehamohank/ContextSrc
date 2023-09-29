/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useReducer,
  createContext,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Snackbar } from 'react-native-paper';
import { ENDPOINT } from './Endpoints';
import { initialState, authReducer, CONSTANT } from './UserReducer';
import { Platform } from 'react-native';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    // saving error
  }
};

export { ENDPOINT };

export const UserContext = createContext();

export const UserProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const showToast = msg => {
    setVisible(!visible);
    setMessage(msg);
  };

  const onDismissSnackBar = () => setVisible(false);

  const userContext = useMemo(
    () => ({
      SetGuest: async data => {
        dispatch({
          type: CONSTANT.set_guestview,
          guest: data,
        });
      },
      // Sign In
      signIn: async data => {
        console.log('signIn', data);

        dispatch({
          type: CONSTANT.sign_in,
          token: data.token,
          session_data: data.session_data,
          user_type: data.session_data.user_type,
          profile: data.profile,
        });
      },
      // Set Profile
      setProfile: async data => {
        console.log('profile', data);

        dispatch({
          type: CONSTANT.set_profile,
          name: data.name,
          mobile_no: data.mobile_no,
          email: data.email,
          promoter_id: data.promoter_id,
          photo: data.photo,
        });
      },
      signOut: () => {
        setTimeout(() => {
          dispatch({ type: 'SIGN_OUT' });

          AsyncStorage.clear();
        }, 500);
      },

      getData: url =>
        new Promise((resolve, reject) => {
          console.log(`${ENDPOINT}${url}`, '`${ENDPOINT}${url} UserContext`');
          axios
            .get(`${ENDPOINT}${url}`, {
              timeout: 10000,
              headers: {
                Authorization: state.token ? `Token ${state.token}` : '',
                Accept: 'application/json',
              },
            })
            .then(response => {
              if (response.status === 200) {
                resolve(response);
                if (response.data.status == false) {
                }
              } else {
                resolve(null);
              }
            })
            .catch(error => {
              console.log(error, 'error');
              console.log('error', String(error));
              if (
                String(error) === 'Error: Request failed with status code 401'
              ) {
                userContext.signOut(state.current_user);
                reject(true);
              } else if (
                String(error) === 'Error: Request failed with status code 403'
              ) {
                console.log('errr');
                showToast('You are not authorized for this action.');
                userContext.signOut(state.current_user);
              } else {
                resolve(null);
              }
            });
        }),
      postData: (url, data) =>
        new Promise((resolve, reject) => {
          console.log('data', state.token, data);
          console.log(url, 'url');
          axios
            .post(`${ENDPOINT}${url}`, data, {
              timeout: 10000,
              headers: {
                Authorization: state.token ? `Token ${state.token}` : '',
                Accept: 'application/json',
              },
            })
            .then(response => {
              if (response.status === 200) {
                resolve(response);
                if (response.data.status == false) {
                }
              } else {
                resolve(null);
              }
            })
            .catch(error => {
              console.log(error, 'postdata error');
              if (
                String(error) === 'Error: Request failed with status code 401'
              ) {
                userContext.signOut(state.current_user);
                reject(true);
              } else {
                resolve(null);
              }
            });
        }),
      postFormData: (url, data, config = {}) =>
        new Promise(resolve => {
          console.log('data', state.token, data);
          console.log(url, 'url');
          axios
            .post(`${ENDPOINT}${url}`, data, {
              headers: {
                Authorization: `Token ${state.token}`,
                // Accept: "application/json",
                'Content-Type': 'multipart/form-data',
              },
              ...config,
            })
            .then(response => {
              console.log('postForm', response.data);
              if (response.status === 200) {
                resolve(response);
                if (response.data.status == false) {
                }
              } else {
                resolve(null);
              }
            })
            .catch(error => {
              if (
                String(error) === 'Error: Request failed with status code 401'
              ) {
                userContext.signOut(state.current_user);
              }
              console.log(error);
              resolve(null);
            });
        }),
      GetprofileData: () => {
        dispatch({
          type: CONSTANT.fetch_profile_start,
        });
        userContext
          .getData('/students/profile/')
          .then(res => {
            console.log(res, 'profile response');

            if (res) {
              const response = res.data;
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_profile_success,
                  profiledata: response.student,
                });
              } else {
                showToast('Something went wrong');
                dispatch({
                  type: CONSTANT.fetch_profile_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_profile_error,
              });
            }
          })
          .catch(err => console.log(err.message, 'error'));
      },
      //post profile
      EditProfile: (name, address, pincode, whatsapp) =>
        new Promise(resolve => {
          const formData = new FormData();
          formData.append('first_name', name);
          formData.append('address', address);
          formData.append('pincode', pincode);
          formData.append('alternate_no', whatsapp);
          console.log(formData, 'formData edit profile');
          userContext
            .postData('/student/profile/', formData)
            .then(res => {
              console.log(res, 'respons');
              if (res.data.status) {
                dispatch(res.data);
                resolve(res);
              } else {
                showToast(res.data.reason);
              }
            })
            .catch(err => { });
        }),

      postProfile: (photo = null, name, number, email, addresss) =>
        new Promise(resolve => {
          dispatch({
            type: CONSTANT.post_profile_start,
          });
          console.log('data', name, email, number, addresss);
          const data = new FormData();
          data.append('student_name', name);
          data.append('contact', number);
          data.append('email', email);
          data.append('address', addresss);

          if (photo) {
            if (Platform.OS === 'android') {
              const file = {
                name: photo.name,
                type: photo.type,
                uri: photo.uri,
              };
              data.append('photo', file);
            } else {
              const file = {
                name: photo.name.replace('HEIC', 'jpg'),
                type: photo.type.replace('heic', 'jpg'),
                uri: photo.uri,
              };
              data.append('photo', file);
            }
          }
          console.log(data, 'form data profile spider man');
          userContext.postFormData('/students/profile/', data).then(res => {
            console.log('Set Profile', res);
            if (res) {
              const response = res.data;
              if (response.status) {
                resolve(response);
                // userContext.setProfile({ name, email, mobile_no, promoter_id });
                userContext.getProfile();
                showToast('Profile saved successfully');
              } else {
                showToast(response.reason);
                resolve(null);
                dispatch({
                  type: CONSTANT.post_profile_failed,
                });
              }
            } else {
              showToast('Something went wrong');
              resolve(null);
              dispatch({
                type: CONSTANT.post_profile_failed,
              });
            }
          });
        }),
      GetCountryData: (country = '', state = '', city = '') =>
        new Promise(resolve => {
          dispatch({
            type: CONSTANT.fetch_country_start,
          });
          axios
            .get(
              `https://geodata.solutions/restapi?country=${country}&state=${state}&city=${city}`,
              {
                timeout: 10000,
                headers: {
                  // Authorization: state.token ? `Token ${state.token}` : '',
                  Accept: 'application/json',
                },
              },
            )
            .then(response => {
              console.log(response, 'getDataResponse');
              if (response.status === 200) {
                resolve(response);
                dispatch({
                  type: CONSTANT.fetch_country_succes,
                  data: response.data,
                });
              } else {
                resolve(null);
                dispatch({
                  type: CONSTANT.fetch_country_error,
                });
              }
            })
            .catch(error => {
              console.log(error, 'error');
              console.log('error', String(error));
              dispatch({
                type: CONSTANT.fetch_profile_error,
              });
            });
        }),

      first_open_close: () => {
        dispatch({ type: CONSTANT.fetch_initial_loading });
      },
    }),

    [state],
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    console.log('user Effect');
    const initialize = async () => {
      console.log('user Effect initialize');
      let userData;

      try {
        userData = await AsyncStorage.getItem('@userData');
      } catch (e) {
        // Restoring token failed
      }

      console.log('Token', userData);
      dispatch({
        type: 'RESTORE_TOKEN',
        state: userData ? JSON.parse(userData) : {},
      });
    };
    if (state.isLoading) {
      initialize();
    } else {
      storeData(state);
    }
  }, [state]);

  return (
    <UserContext.Provider value={{ ...userContext, ...state, showToast }}>
      {props.children}
      <Snackbar
        visible={visible}
        duration={3000}
        style={{
          borderRadius: 10,
          //   backgroundColor: Colors.getColors(AppThemeMode).app_text_light_color,
          backgroundColor: '#828282',
        }}
        onDismiss={onDismissSnackBar}
      // action={{
      //   label: 'Undo',
      //   onPress: () => {
      //     // Do something
      //   },
      // }}
      >
        {message}
      </Snackbar>
    </UserContext.Provider>
  );
};
