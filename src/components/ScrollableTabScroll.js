import React, {useEffect, useRef, memo} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
// import {Text} from 'react-native-paper';
import {Text} from '../utils/fontfamily';

export const ScrollableTabScroll = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  const scrollViewRef = useRef(null);

  // useEffect(() => {
  //   scrollViewRef.current.scrollTo({
  //     x: state.index * 50,
  //     y: 0,
  //     animated: true,
  //   });
  // }, [state.index]);

  return (
    <View style={styles.tabContainer}>
      {/* <ScrollView
        ref={(list) => (scrollViewRef.current = list)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // paddingRight: 15,
        }}
        horizontal> */}
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

        let focusStyle = {}; //style object to append to the focussed tab
        let fontColor = {};
        isFocused
          ? (focusStyle = {backgroundColor: '#5E3CBE'})
          : (focusStyle = {backgroundColor: '#fff'});
        isFocused
          ? (fontColor = {
              color: 'white',
              fontSize: 14,
            })
          : (fontColor = {
              color: '#7F7F7F',
              fontSize: 14,
            });
        //below controls the rendered tab

        return (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, focusStyle]}>
            <Text style={[styles.labelStyle, fontColor]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 40,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 10,
  },
  tabItem: {
    paddingVertical: 10,
    width: '33.34%',
    backgroundColor: 'white',
    // elevation: 4,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ScrollableTabScroll);
