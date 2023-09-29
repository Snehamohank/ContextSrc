/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import BannerCard from '../../components/BannerCard';
import PracticeCard from '../../components/PracticeCard';
import UpcomingLive from '../../components/UpcomingLive';
import CompletedHome from '../../components/CompletedHome';
import {HomeContext} from './store/HomeContext';
import Header from '../../components/Header';

import i18n from '../../components/Lang';

const HomeScreen = ({navigation}) => {
  const {
    GetHomeData,
    ongoinglive,
    upcominglive,
    completedlive,
    tests,
    student_data,
    isFetching,
    SwitchLanguage,
    language,
  } = useContext(HomeContext);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    GetHomeData();
    console.log(student_data, 'home data');
  }, []);

  const _onRefresh = () => {
    GetHomeData();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fafafa',
      }}>
      <Header main lang />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={_onRefresh} />
        }>
        {ongoinglive.length > 0 && (
          <View style={{marginVertical: 10, marginHorizontal: 20}}>
            <BannerCard list={ongoinglive} navigation={navigation} />
          </View>
        )}
        {tests.length > 0 && (
          <View style={{marginVertical: 10}}>
            <PracticeCard list={tests} navigation={navigation} />
          </View>
        )}

        {upcominglive.length > 0 && (
          <View style={{marginVertical: 10}}>
            <UpcomingLive list={upcominglive} navigation={navigation} />
          </View>
        )}

        {completedlive.length > 0 && (
          <View style={{marginVertical: 10}}>
            <CompletedHome list={completedlive} navigation={navigation} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
