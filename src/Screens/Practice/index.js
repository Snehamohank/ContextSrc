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
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from '../../utils/fontfamily';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TwoTab from '../../components/TwoTab';
import Completed from './Completed';
import Unattended from './Unattended';
import {DownGrey, Language, SelectGreen} from '../../assets/svg';
import {Colors} from '../../utils/Colors';
import Modal from 'react-native-modal';
import Header from '../../components/Header';

import {useTranslation} from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const Practice = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: '#fafafa',
        }}>
        <Header title={t('practice question')} lang />
      </View>
      <Tab.Navigator
        tabBar={props => <TwoTab {...props} />}
        backBehavior="none"
        screenOptions={{
          scrollEnabled: true,
          activeTintColor: 'powderblue',
        }}>
        <Tab.Screen
          name={t('unattended')}
          component={Unattended}
          navigation={navigation}
        />
        <Tab.Screen
          name={t('completed')}
          component={Completed}
          navigation={navigation}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Practice;
