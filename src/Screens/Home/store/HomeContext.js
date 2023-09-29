import React, {
  useReducer,
  createContext,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {UserContext} from '../../../store/UserContext';
import {initialState, Reducer, CONSTANT} from './HomeReducer';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@homeData', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const HomeContext = createContext();

const HomeProvider = props => {
  const {getData, postData, showToast, getProfile} = useContext(UserContext);

  const [state, dispatch] = useReducer(Reducer, initialState);

  const userContext = useMemo(
    () => ({
      // Home Data
      GetHomeData: url => {
        dispatch({
          type: CONSTANT.fetch_start,
        });
        getData('/students/student-home/').then(res => {
          // console.log('Responce Homepage', res.data);
          if (res) {
            const response = res.data;
            if (response.status) {
              console.log(response, 'home response');
              dispatch({
                type: CONSTANT.fetch_succes,
                ongoinglive: response.ongoinglive,
                upcominglive: response.upcominglive,
                completedlive: response.completed,
                tests: response.tests,
                student_data: response.student,
              });
              // getProfile();
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_error,
              });
            }
          } else {
            showToast('Something went wrong');
            dispatch({
              type: CONSTANT.fetch_error,
            });
          }
        });
      },

      //update language
      SwitchLanguage: lng => {
        dispatch({type: CONSTANT.update_language, language: lng});
      },

      // Notification Data
      notificationData: () => {
        dispatch({
          type: CONSTANT.fetch_notification_start,
        });
        getData('/students/notification-student/').then(res => {
          console.log('Responce notification', res);
          if (res) {
            const response = res.data;
            if (response.status) {
              dispatch({
                type: CONSTANT.fetch_notification_succes,
                notifications: response.page.items,
              });
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_notification_error,
              });
            }
          } else {
            showToast('Something went wrong');
            dispatch({
              type: CONSTANT.fetch_notification_error,
            });
          }
        });
      },
      SendDeviceId: deviceId => {
        // const formData = new FormData();
        // formData.append('device_id', deviceId);
        postData('/user/register-device/', {device_id: deviceId})
          .then(res => {
            console.log(res, 'push notificationnnn');
          })
          .catch(err => {});
      },
    }),
    [getData],
  );

  useEffect(() => {
    // For cache
    const initialize = async () => {
      let homeData;

      try {
        homeData = await AsyncStorage.getItem('@homeData');
      } catch (e) {
        // Restoring token failed
      }

      console.log('Homepage', homeData);
      dispatch({
        type: CONSTANT.restore_data,
        state: homeData ? JSON.parse(homeData) : {},
      });
    };
    if (state.isLoading) {
      initialize();
    } else {
      storeData(state);
    }
  }, [state]);

  return (
    <HomeContext.Provider value={{...userContext, ...state}}>
      {props.children}
    </HomeContext.Provider>
  );
};

HomeProvider.Provider = HomeProvider;
export {HomeProvider};
