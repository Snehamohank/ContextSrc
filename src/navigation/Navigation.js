/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RNBootSplash from 'react-native-bootsplash';

import {UserContext} from '../store/UserContext';

import HomeScreen from '../Screens/Home';
import ProfileScreen from '../Screens/Profile';
import MyTabBar from './CustomTabBar';
import Login from '../Screens/Login';
import Live from '../Screens/Live/Index';
import Practice from '../Screens/Practice';
import AttemptQuest from '../Screens/Practice/AttemptQuest/index';
import TestInfo from '../Screens/Practice/QuestInfo';
import TestResult from '../Screens/Practice/QuestResult';
import TestAnswers from '../Screens/Practice/QuestAnswers';
import TestAnsInfo from '../Screens/Practice/QuestAnsInfo';
import EditProfile from '../Screens/EditProfile';
import VideoScreen from '../Screens/VideoScreen';
import Meeting from '../Screens/VideoCall/JitsiMeeting';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      backBehavior="initialRoute"
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Live" component={Live} />
      <Tab.Screen name="Practice" component={Practice} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Nav = () => {
  const {token, isLoading, isSignout} = useContext(UserContext);
  useEffect(() => {
    if (!isLoading) {
      RNBootSplash.hide({fade: true, duration: 5000});
      console.log('bootsplash nav', isLoading);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'#000000'} />
      </View>
    );
  } else if (token === null || isSignout) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'auto',
        }}>
        <Stack.Screen name="Home" component={TabNav} />
        <Stack.Screen name="Live" component={Live} />
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AttemptQuest" component={AttemptQuest} />
        <Stack.Screen name="TestInfo" component={TestInfo} />
        <Stack.Screen name="TestResult" component={TestResult} />
        <Stack.Screen name="TestAnswers" component={TestAnswers} />
        <Stack.Screen name="TestAnsInfo" component={TestAnsInfo} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
        <Stack.Screen name="JitsiMeeting" component={Meeting} />
      </Stack.Navigator>
    );
  }
};

export default Nav;
