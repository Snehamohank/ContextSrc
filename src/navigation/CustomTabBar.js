/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {
  HomeBlue,
  HomeGrey,
  LiveBlue,
  LiveGrey,
  PracticeBlue,
  PracticeGrey,
  ProfileBlue,
  ProfileGrey,
} from '../assets/svg';

const tabContent = {
  Home: {
    name: 'Home',
    image: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
    activeImage: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
  },
  Live: {
    name: 'Live',
    image: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
    activeImage: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
  },
  Practice: {
    name: 'Practice',
    image: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
    activeImage: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
  },
  Profile: {
    name: 'Profile',
    image: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
    activeImage: (
      <Image
        style={{height: 25, width: 20}}
        source={require('../assets/PNG/home.png')}
      />
    ),
  },
};

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row', backgroundColor: '#aaa'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              height: Platform.OS == 'android' ? 55 : 70,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderBottomWidth: 0.5,
              borderColor: '#999999',
              // elevation: 4,
              shadowOffset: {width: 0, height: 1},
              shadowRadius: 0.2,
              shadowOpcity: 0.2,
              shadowColor: '#515151',
              // paddingBottom: 10,
              // borderRightWidth: 1,
            }}>
            {!isFocused ? (
              route.name === 'Home' ? (
                <HomeGrey height={30} width={30} />
              ) : route.name === 'Live' ? (
                <LiveGrey height={30} width={30} />
              ) : route.name === 'Practice' ? (
                <PracticeGrey height={30} width={30} />
              ) : route.name === 'Profile' ? (
                <ProfileGrey height={30} width={30} />
              ) : (
                <View />
              )
            ) : route.name === 'Home' ? (
              <HomeBlue height={30} width={30} />
            ) : route.name === 'Live' ? (
              <LiveBlue height={30} width={30} />
            ) : route.name === 'Practice' ? (
              <PracticeBlue height={30} width={30} />
            ) : route.name === 'Profile' ? (
              <ProfileBlue height={30} width={30} />
            ) : (
              <View />
            )}
            {/* <Text
              style={{
                color: isFocused ? '#000' : '#99b2c6',
                fontSize: 9,
                paddingTop: 3,
                fontWeight: isFocused ? 'bold' : '700',
              }}>
              {route.name}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
