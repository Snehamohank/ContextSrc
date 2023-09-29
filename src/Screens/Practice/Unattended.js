/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../../utils/fontfamily';
import React, {useContext, useEffect} from 'react';
import {Colors} from '../../utils/Colors';
import {wp} from '../../utils/ScreenResolutionHandler';
import LinearGradient from 'react-native-linear-gradient';
import {TestContext} from './store/TestContext';
import {MainLoader} from '../../components';
import {NotesIcon} from '../../assets/svg';

import {useTranslation} from 'react-i18next';

const Unattended = ({navigation}) => {
  const {t} = useTranslation();

  const {
    GetPracticeUnattended_TestList,
    PracticeTestList,
    isFetching_unattend_PracticeTestList,
  } = useContext(TestContext);

  const getDataList = () => {
    GetPracticeUnattended_TestList('Unattended');
  };

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataList();
    });
    return unsubscribe;
  }, [navigation]);

  const _onRefresh = () => {
    getDataList();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AttemptQuest', {test_id: item.id})}
        activeOpacity={0.9}
        style={{paddingRight: 20}}>
        <View
          style={{
            backgroundColor: '#2363E0',
            borderRadius: 15,
            marginBottom: 15,
            height: 130,
          }}>
          <View
            style={{
              paddingHorizontal: 15,
              flex: 1,
              paddingVertical: 15,
              flexDirection: 'row',
            }}>
            <View style={{flex: 2, justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                {item.expires !== '' && (
                  <View
                    style={{
                      backgroundColor: '#ffffff40',
                      borderRadius: 15,
                      paddingHorizontal: 5,
                      height: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}>
                    <Text
                      numberOfLines={5}
                      family={'h4'}
                      size={'sm'}
                      color={'white'}
                      style={{paddingHorizontal: 5, color: '#ffffff'}}>
                      {item.expire_at}
                    </Text>
                  </View>
                )}
                {item.is_over ||
                  (item.is_expire_soon && (
                    <View
                      style={{
                        backgroundColor: Colors.red,
                        borderRadius: 15,
                        paddingHorizontal: 3,
                        marginLeft: 5,
                        height: 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 10,
                      }}>
                      <Text
                        numberOfLines={5}
                        family={'h4'}
                        size={'sm'}
                        color={'white'}
                        style={{paddingHorizontal: 5, color: '#ffffff'}}>
                        {item.is_expire_soon
                          ? t('expire soon')
                          : item.is_over
                          ? t('expired')
                          : ''}
                      </Text>
                    </View>
                  ))}
              </View>
              <Text
                numberOfLines={2}
                family={'h4'}
                size={'md'}
                color={'white'}
                style={{color: '#ffffff', paddingBottom: 10}}>
                {item.title}
              </Text>
              <View style={{width: '60%'}}>
                <View
                  style={{
                    backgroundColor: Colors.green,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 25,
                    borderRadius: 5,
                    marginTop: 5,
                  }}>
                  <Text
                    numberOfLines={5}
                    family={'h4'}
                    size={'md'}
                    color={'white'}
                    style={{paddingHorizontal: 5}}>
                    {t('attempt now')}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                flex: 1,
              }}>
              <NotesIcon
                style={{alignItems: 'center', justifyContent: 'center'}}
                height={70}
                width={70}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {isFetching_unattend_PracticeTestList ? (
        <MainLoader size="large" color="black" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isFetching_unattend_PracticeTestList}
              // onRefresh={_onRefresh}
            />
          }
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          data={PracticeTestList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Unattended;

const styles = StyleSheet.create({
  container: {backgroundColor: '#f9f9f9', flex: 1},
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
