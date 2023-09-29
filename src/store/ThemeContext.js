import React, {
  useReducer,
  createContext,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialState, Reducer, CONSTANT} from './ThemeReducer';

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@homeData', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const ThemeContext = createContext();

const ThemeProvider = props => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const themeContext = useMemo(
    () => ({
      SetThemeColors: async (color, mode) => {
        dispatch({
          type: CONSTANT.set_theme,
          themecolors: color,
          thememode: mode,
        });
      },
    }),
    [state],
  );

  // const AppThemeMode = Appearance.getColorScheme();
  // const AppThemeColors = useTheme().colors;
  // useEffect(() => {
  //   themeContext.SetThemeColors(AppThemeColors, AppThemeMode);
  // }, []);

  // useEffect(() => {
  //   AppState.addEventListener('change', handleChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleChange);
  //   };
  // }, []);

  // const handleChange = newState => {
  //   console.log(newState, 'newState');
  //   // if (newState === 'active') {
  //     const AppMode = Appearance.getColorScheme();
  //     console.log(AppMode, 'AppMode');
  //     console.log(state.AppThemeMode, 'AppThemeModeAppThemeMode');
  //     themeContext.SetThemeColors(
  //       AppMode === 'dark' ? DarkModetheme.colors : LightModetheme.colors,
  //       AppMode,
  //     );
  //     if (state.AppThemeMode != AppMode) {
  //       RNRestart.Restart();
  //     }

  //     // RNRestart.Restart();
  //   // }
  // };

  useEffect(() => {
    // For cache
    const initialize = async () => {
      let themeData;
      try {
        themeData = await AsyncStorage.getItem('@themeData');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({
        type: CONSTANT.restore_data,
        state: themeData ? JSON.parse(themeData) : {},
      });
    };
    if (state.isLoading) {
      initialize();
    } else {
      storeData(state);
    }
  }, [state]);

  return (
    <ThemeContext.Provider
      value={{
        ...themeContext,
        ...state,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.Provider = ThemeProvider;
export {ThemeProvider};
