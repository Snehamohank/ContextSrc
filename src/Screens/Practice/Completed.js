/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {Text} from '../../utils/fontfamily';
import React, {useContext, useEffect} from 'react';
import {Colors} from '../../utils/Colors';
import {wp} from '../../utils/ScreenResolutionHandler';
import LinearGradient from 'react-native-linear-gradient';
import {TestContext} from './store/TestContext';
import {NotesIcon} from '../../assets/svg';
import {MainLoader} from '../../components';

import {useTranslation} from 'react-i18next';

const Completed = ({navigation}) => {
  const {t} = useTranslation();
  const {
    GetPracticeCompleted_TestList,
    PracticeCompTestList,
    isFetching_comp_PracticeTestList,
  } = useContext(TestContext);

  const getDataList = () => {
    GetPracticeCompleted_TestList('Completed');
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

  const renderItem = ({item}) => {
    return (
      <View style={{paddingRight: 20}}>
        <View
          style={{
            backgroundColor: Colors.secondBlue,
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
              <View style={{flexDirection: 'row'}}>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AttemptQuest', {test_id: item.id})
                    }
                    style={{
                      backgroundColor: Colors.skyBlue,
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
                      style={{paddingHorizontal: 10, paddingTop: 2}}>
                      {t('re-attempt now')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 10}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TestResult', {test_id: item.id})
                    }
                    style={{
                      backgroundColor: Colors.lightPink,
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
                      color={'darkPink'}
                      style={{paddingHorizontal: 10, paddingTop: 2}}>
                      {t('view result')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'red',
                flex: 1,
              }}>
              <NotesIcon
                style={{
                  marginLeft: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                height={70}
                width={70}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {isFetching_comp_PracticeTestList ? (
        <MainLoader size="large" color="black" />
      ) : (
        <FlatList
          contentContainerStyle={{paddingLeft: 20}}
          showsHorizontalScrollIndicator={false}
          data={PracticeCompTestList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // ListHeaderComponent={
          //   <>
          //     <View
          //       style={{
          //         flexDirection: 'row',
          //         justifyContent: 'space-between',
          //         alignItems: 'center',
          //         paddingTop: 20,
          //       }}>
          //       <Text
          //         numberOfLines={5}
          //         family={'h3'}
          //         size={'xxl'}
          //         color={'black'}
          //         style={{paddingBottom: 10}}>
          //         Upcoming Live Session
          //       </Text>
          //     </View>
          //   </>
          // }
        />
      )}
    </View>
  );
};

export default Completed;

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
