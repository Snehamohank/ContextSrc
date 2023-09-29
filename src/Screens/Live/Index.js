/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from '../../utils/fontfamily';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ScrollableTabScroll from '../../components/ScrollableTabScroll';
import All from './All';
import Upcoming from './Upcoming';
import Completed from './Completed';
import {HomeContext} from '../Home/store/HomeContext';
import {DownGrey, Language, SelectGreen} from '../../assets/svg';
import {Colors} from '../../utils/Colors';
import Modal from 'react-native-modal';
import Header from '../../components/Header';

import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const Live = ({route, navigation}) => {
  // const {type} = route.params;
  const {t} = useTranslation();
  const {
    GetHomeData,
    ongoinglive,
    upcominglive,
    completedlive,
    tests,
    student_data,
    isFetching,
  } = useContext(HomeContext);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: '#fafafa',
        }}>
        <Header title={t('live videos')} lang />
      </View>
      <Tab.Navigator
        tabBar={props => <ScrollableTabScroll {...props} />}
        backBehavior="none"
        screenOptions={{
          scrollEnabled: true,
          activeTintColor: 'powderblue',
        }}>
        <Tab.Screen name={t('all')} component={All} />
        <Tab.Screen name={t('upcoming')} component={Upcoming} />
        <Tab.Screen name={t('completed')} component={Completed} />
      </Tab.Navigator>
    </View>
  );
};

export default Live;

const styles = StyleSheet.create({});
