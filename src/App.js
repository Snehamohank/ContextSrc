/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {navigationRef, isReadyRef} from './navigation/NavigationRef';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Nav from './navigation/Navigation';
import {UserProvider} from './store/UserContext';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {HomeProvider} from './Screens/Home/store/HomeContext';
import {TestProvider} from './Screens/Practice/store/TestContext';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      <SafeAreaProvider>
        <UserProvider>
          <HomeProvider>
            <TestProvider>
              <SafeAreaView style={{flex: 1}}>
                <Nav />
              </SafeAreaView>
            </TestProvider>
          </HomeProvider>
        </UserProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
