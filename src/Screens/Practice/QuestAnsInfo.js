/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');
import {TestContext} from './store/TestContext';
import {MultiTapHandler} from '../../components';
import {CloseIcon} from '../../assets/svg';

// create a component
const QuestInfo = ({navigation, route}) => {
  console.log(route.params, 'params info');

  const goIndex = route.params ? route.params.goIndex : '';
  const questions = route.params ? route.params.questions : {};
  const title = route.params ? route.params.title : '';
  const attnd_count = route.params ? route.params.attnd_count : '';
  const unattnd_count = route.params ? route.params.unattnd_count : '';
  const test = route.params ? route.params.test : '';

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: 'red',
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <CloseIcon height={18} width={18} />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 20}}>
          {/* <View style={{paddingBottom: 15}}>
          <Text family={'h4'} size={'lg'} color={'black2'} style={{}}>
            {title}
          </Text>
        </View> */}
          <View
            style={{
              borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              borderColor: '#DCDCDC',
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <View
              style={{
                width: '60%',
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                size={'md'}
                color={'grey'}
                family={'h4'}
                style={{color: '#929292'}}>
                Duration
              </Text>
              <Text
                size={'xl'}
                color={'grey'}
                family={'h3'}
                style={{marginTop: 10}}>
                {test.duration}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              flexDirection: 'row',
              borderColor: '#DCDCDC',
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <View
              style={{
                width: '35%',
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                size={'md'}
                color={'grey'}
                family={'h4'}
                style={{color: '#929292'}}>
                Total Questions
              </Text>
              <Text
                size={'xxl'}
                color={'grey'}
                family={'h3'}
                style={{marginTop: 10}}>
                {questions.length}
              </Text>
            </View>
            <View style={{width: 1, backgroundColor: '#DCDCDC'}} />
            <View
              style={{
                width: '65%',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  paddingLeft: 15,
                  flexDirection: 'row',
                }}>
                <Text
                  size={'md'}
                  color={'grey'}
                  family={'h4'}
                  style={{color: '#929292'}}>
                  Mark per Question :
                </Text>
                <Text
                  size={'xl'}
                  color={'black'}
                  family={'h3'}
                  style={{paddingLeft: 5}}>
                  {test.mark_per_question}
                </Text>
              </View>
              <View style={{height: 1, backgroundColor: '#DCDCDC'}} />
              <View
                style={{
                  alignItems: 'center',
                  paddingLeft: 15,
                  flexDirection: 'row',
                }}>
                <Text
                  size={'md'}
                  color={'grey'}
                  family={'h4'}
                  style={{color: '#929292'}}>
                  Negative Mark per :
                </Text>
                <Text
                  size={'xl'}
                  color={'black'}
                  family={'h3'}
                  style={{paddingLeft: 5}}>
                  {test.negative_score}
                </Text>
              </View>
            </View>
          </View>
          {/* <View
          style={{
            alignItems: 'center',
            backgroundColor: '#E8E8E8',
            paddingVertical: 15,
            borderRadius: 5,
          }}>
          <Text
            size={'lg'}
            color={'grey'}
            family={'h5'}
            style={{marginBottom: 15}}>
            Number of Questions :{' '}
            <Text color={'black1'} size={'xl'} family={'h3'}>
              {total_questions}
            </Text>
          </Text>
          <View
            style={{
              alignItems: 'baseline',
              flexDirection: 'row',
            }}>
            <Text
              size={'lg'}
              color={'grey'}
              family={'h4'}
              style={{marginBottom: 15}}>
              Attended :{' '}
              <Text color={'black1'} size={'xl'} family={'h3'}>
                {answered_count}
              </Text>
            </Text>
            <View
              style={{
                height: 20,
                width: 1,
                backgroundColor: 'lightgrey',
                marginHorizontal: 15,
              }}
            />
            <Text
              size={'lg'}
              color={'grey'}
              family={'h4'}
              style={{marginBottom: 15}}>
              Unattended :{' '}
              <Text
                style={{fontColor: '	#8B0000'}}
                color={'	#8B0000'}
                size={'xl'}
                family={'h3'}>
                {not_anttempted}
              </Text>
            </Text>
          </View>
        </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#DEFFEB',
                paddingVertical: 15,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                size={'md'}
                color={'grey'}
                family={'h4'}
                style={{color: '#14AF51'}}>
                Submitted
              </Text>
              <Text
                size={'xl'}
                color={'black'}
                family={'h3'}
                style={{color: '#14AF51', paddingTop: 5}}>
                {attnd_count}
              </Text>
            </View>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#FFEED4',
                paddingVertical: 15,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                size={'md'}
                color={'grey'}
                family={'h4'}
                style={{color: '#FFAB2D'}}>
                Not Attended
              </Text>
              <Text
                size={'xl'}
                color={'black'}
                family={'h3'}
                style={{color: '#FFAB2D'}}>
                {unattnd_count}
              </Text>
            </View>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#FFDCDC',
                paddingVertical: 15,
                width: '30%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                size={'md'}
                color={'grey'}
                family={'h4'}
                style={{color: '#ED3636'}}>
                Not Answerd
              </Text>
              <Text
                size={'xl'}
                color={'black'}
                family={'h3'}
                style={{color: '#ED3636'}}>
                {questions.length - attnd_count}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView style={{flexGrow: 1, paddingTop: 25}}>
          <View>
            <Text
              size={'xl'}
              color={'black'}
              family={'h4'}
              style={{paddingHorizontal: 20}}>
              Questions
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {questions.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      goIndex(index);
                      // SetAttempted(item);
                      navigation.goBack();
                    }}
                    key={`que${index}`}
                    style={{
                      width: width / 4,
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        backgroundColor: item.answered
                          ? '#DEFFEB'
                          : item.choices_list.includes('selected')
                          ? '#FFDCDC'
                          : '#FFEED4',
                        borderRadius: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        family={'h4'}
                        size={'xl'}
                        style={{
                          color: item.answered
                            ? '#14AF51'
                            : item.choices_list.includes('selected')
                            ? '#E4333C'
                            : '#FFAB2D',
                        }}>
                        {'Q'}
                        {index + 1}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <View style={{paddingVertical: 10}}>
      <TouchableOpacity
        onPress={() => MultiTapHandler(FinishExamAction())}
        style={{
          backgroundColor: '#52b4a3',
          marginHorizontal: 20,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}>
        <Text
          numberOfLines={1}
          family={'h4'}
          size={'xl'}
          color={'white'}
          style={{}}>
          Finish Test
        </Text>
      </TouchableOpacity>
    </View> */}
    </View>
  );
};

//make this component available to the app
export default QuestInfo;
