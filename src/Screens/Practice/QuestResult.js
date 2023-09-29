/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {TestContext} from './store/TestContext';
import {Colors} from '../../utils/Colors';
import {MainLoader, wp} from '../../components';
import * as NavigationRef from '../../navigation/NavigationRef';
import LinearGradient from 'react-native-linear-gradient';
import {ArrowLeft} from '../../assets/svg';
import {Text} from '../../utils/fontfamily';

import {useTranslation} from 'react-i18next';

// create a component
const Result = ({navigation, route}) => {
  const {t} = useTranslation();

  const {TestResults, results, isFetchingExamResult} = useContext(TestContext);
  let test_id = route.params ? route.params.test_id : '';

  console.log(results, 'results');
  useEffect(() => {
    getDataList();
  }, []);

  const getDataList = () => {
    TestResults(test_id);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            height: 50,
            alignItems: 'center',
            backgroundColor: Colors.white,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}>
          <ArrowLeft height={15} width={15} />
          <Text
            family={'h4'}
            size={'xxl'}
            color={'black2'}
            style={{paddingLeft: 10}}>
            {t('result')}
          </Text>
        </TouchableOpacity>
      </View>
      {isFetchingExamResult ? (
        <MainLoader />
      ) : (
        <>
          <View style={{justifyContent: 'space-between', flex: 1}}>
            <View>
              <View style={{padding: 10, paddingVertical: 15}}>
                <View
                  style={{
                    backgroundColor: '#e3fff0',
                    height: 100,
                    borderRadius: 10,
                    flexDirection: 'row',
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Text
                style={{
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(18)
                      : normalizeFont(18),
                  fontFamily:
                    Platform.OS == 'android'
                      ? 'UberMoveText-Light'
                      : 'UberMoveText-Light',
                  color: '#00A8B9',
                }}>
                Attempt Questions
              </Text> */}
                    <Text
                      numberOfLines={2}
                      family={'h4'}
                      size={'lg'}
                      color={'blue'}
                      style={{paddingTop: 5, color: '#3EBAA5'}}>
                      {t('attempt questions')}
                    </Text>
                    {/* <Text
                style={{
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(22)
                      : normalizeFont(26),
                  fontFamily: 'UberMoveText-Bold',
                  color: '#00A8B9',
                }}>
                {results.attended}
              </Text> */}
                    <Text
                      numberOfLines={2}
                      family={'h4'}
                      size={'xxxl'}
                      color={'blue'}
                      style={{
                        fontSize: 30,
                        paddingTop: 10,
                        color: '#3EBAA5',
                      }}>
                      {results.correct_count + results.incorrect_count}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#3EBAA5',
                      height: 100,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <Text
                style={{
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(18)
                      : normalizeFont(18),
                  fontFamily:
                    Platform.OS == 'android'
                      ? 'UberMoveText-Light'
                      : 'UberMoveText-Light',
                  color: '#E3FFFE',
                }}>
                Total Questions
              </Text> */}
                    <Text
                      numberOfLines={2}
                      family={'h4'}
                      size={'lg'}
                      color={'pollblue'}
                      style={{paddingTop: 5}}>
                      {t('total questions')}
                    </Text>
                    {/* <Text
                style={{
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(22)
                      : normalizeFont(26),
                  fontFamily: 'UberMoveText-Bold',
                  color: '#E3FFFE',
                }}>
                {results.questions.length}
              </Text> */}
                    <Text
                      numberOfLines={2}
                      family={'h4'}
                      size={'xxxl'}
                      color={'pollblue'}
                      style={{fontSize: 30, paddingTop: 10}}>
                      {results.questions.length}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{paddingHorizontal: 20}}>
                <TouchableOpacity
                  activeOpacity={1}
                  disabled={results.correct_count === 0}
                  // onPress={() =>
                  //   navigation.navigate('QbAnswerView', {
                  //     examid: examid,
                  //     answer_type: 'correct',
                  //   })
                  // }
                  style={styles.answer}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#DEFFE8', '#DEFFE8']}
                    style={styles.linearGradientanswer}>
                    <Text
                      family={'h4'}
                      // size={'lg'}
                      // color={'white'}
                      style={{
                        paddingLeft: 10,
                        color: '#2FAD79',
                        fontSize: 14,
                      }}>
                      {t('correct answers')}
                    </Text>
                    <Text
                      family={'h4'}
                      // size={'lg'}
                      // color={'white'}
                      style={{
                        color: '#2FAD79',
                        paddingRight: 5,
                        fontSize: 20,
                      }}>
                      {results.correct_count}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  disabled={results.incorrect_count === 0}
                  // onPress={() =>
                  //   navigation.navigate('QbAnswerView', {
                  //     examid: examid,
                  //     answer_type: 'in_correct',
                  //   })
                  // }
                  style={styles.answer}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#FFE6E6', '#FFE6E6']}
                    style={styles.linearGradientanswer}>
                    <Text
                      family={'h4'}
                      // size={'lg'}
                      // color={'white'}
                      style={{
                        paddingLeft: 10,
                        color: '#D34444',
                        fontSize: 14,
                      }}>
                      {t('incorrect answers')}
                    </Text>
                    <Text
                      family={'h4'}
                      // size={'lg'}
                      // color={'white'}
                      style={{
                        color: '#D34444',
                        paddingRight: 5,
                        fontSize: 20,
                      }}>
                      {results.incorrect_count}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  disabled={results.unattended === 0}
                  // onPress={() =>
                  //   navigation.navigate('QbAnswerView', {
                  //     examid: examid,
                  //     answer_type: 'not_attended',
                  //   })
                  // }
                  style={styles.answer}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#D7F7FF', '#D7F7FF']}
                    style={styles.linearGradientanswer}>
                    <Text
                      family={'h4'}
                      // size={'lg'}
                      // color={'white'}
                      style={{
                        paddingLeft: 10,
                        color: '#197DA4',
                        fontSize: 14,
                      }}>
                      {t('not attend')}
                    </Text>
                    <Text
                      family={'h4'}
                      // size={'lg'}
                      // color={'white'}
                      style={{
                        color: '#197DA4',
                        paddingRight: 5,
                        fontSize: 20,
                      }}>
                      {results.not_attended}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={{alignItems: 'center', marginTop: 50}}>
                <Text color={'grey'}>{t('scored')}</Text>
                <Text style={{fontSize: 30, marginTop: 5}} size={'xxxl'}>
                  {results.marks}/{results.total_mark}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                onPress={() => navigation.pop(2)}
                style={{
                  width: wp('90%'),
                  // paddingVertical: 15,
                  height: 45,
                  backgroundColor: '#3EBAA5',
                  // borderWidth: 1,
                  // borderColor: Colors.blue,
                  alignSelf: 'center',
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  // elevation: 2,
                }}>
                {/* <Text
                style={{
                  fontFamily: 'Helvetica Neue',
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(10)
                      : 14,
                  color: Colors.white,
                  alignSelf: 'center',
                }}
                numberOfLines={1}>
                Done
              </Text> */}
                <Text
                  family={'h3'}
                  size={'lg'}
                  color={'white'}
                  style={{
                    fontSize: 14,
                  }}>
                  {t('done')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  NavigationRef.replace('AttemptQuest', {
                    test_id: results.test.id,
                  })
                }
                style={{
                  width: wp('90%'),
                  // paddingVertical: 10,
                  height: 45,
                  backgroundColor: Colors.bg_blue,
                  borderWidth: 1,
                  borderColor: Colors.blue,
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginVertical: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  // elevation: 2,
                }}>
                {/* <Text
                style={{
                  fontFamily: 'Helvetica Neue',
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(10)
                      : 14,
                  color: Colors.blue,
                  alignSelf: 'center',
                }}
                numberOfLines={1}>
                Do again
              </Text> */}
                <Text
                  family={'h3'}
                  size={'lg'}
                  color={'blue'}
                  style={{
                    fontSize: 14,
                  }}>
                  {t('re-attempt')}
                </Text>
              </TouchableOpacity>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#DEFFE8', '#DEFFE8']}
                style={{
                  width: wp('90%'),
                  // paddingVertical: 10,
                  height: 45,
                  backgroundColor: Colors.bg_blue,

                  alignSelf: 'center',
                  borderRadius: 10,
                  marginVertical: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  // elevation: 2,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TestAnswers', {
                      test_id: results.test.id,
                      questions: results.questions,
                      results: results,
                    })
                  }
                  style={{
                    width: wp('90%'),
                    // paddingVertical: 10,
                    height: 45,
                    backgroundColor: Colors.bg_blue,

                    alignSelf: 'center',
                    borderRadius: 10,
                    marginVertical: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    // elevation: 2,
                  }}>
                  {/* <Text
                style={{
                  fontFamily: 'Helvetica Neue',
                  fontSize:
                    Platform.isPad || DeviceInfo.isTablet()
                      ? normalizeFont(10)
                      : 14,
                  color: Colors.blue,
                  alignSelf: 'center',
                }}
                numberOfLines={1}>
                Do again
              </Text> */}
                  <Text
                    family={'h4'}
                    size={'lg'}
                    style={{
                      fontSize: 14,
                      color: '#2FAD79',
                    }}>
                    {t('view result')}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  answerContainer: {},
  linearGradientanswer: {
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 15,
  },
  answer: {
    marginVertical: 10,
    width: '100%',
  },
});

//make this component available to the app
export default Result;
