/* eslint-disable react-native/no-inline-styles */
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Image} from 'react-native-svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BannerCard from '../../components/BannerCard';
import UpcomingLive from '../../components/UpcomingLive';
import CompletedHome from '../../components/CompletedHome';
import {HomeContext} from '../Home/store/HomeContext';
import {MainLoader} from '../../components';

const All = ({navigation}) => {
  const {GetHomeData, ongoinglive, upcominglive, completedlive, isFetching} =
    useContext(HomeContext);

  const getDataList = () => {
    GetHomeData();
  };

  useEffect(() => {
    getDataList();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getDataList();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const _onRefresh = () => {
    GetHomeData();
  };

  return (
    <View style={{backgroundColor: '#f9f9f9', flex: 1}}>
      {isFetching ? (
        <MainLoader size="large" color="black" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={_onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: '#f9f9f9'}}>
          {ongoinglive.length > 0 && (
            <View style={{marginVertical: 10, marginHorizontal: 20}}>
              <BannerCard list={ongoinglive} navigation={navigation} />
            </View>
          )}
          {upcominglive.length > 0 && (
            <View style={{marginVertical: 10}}>
              <UpcomingLive list={upcominglive} />
            </View>
          )}
          {completedlive.length > 0 && (
            <View style={{marginVertical: 10}}>
              <CompletedHome list={completedlive} navigation={navigation} />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default All;

const styles = StyleSheet.create({});
