/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {TestContext} from './store/TestContext';
import {MultiTapHandler} from '../../components';
import {CloseIcon} from '../../assets/svg';
import {Text} from '../../utils/fontfamily';

// create a component
const QuestInfo = ({navigation, route}) => {
  const {
    // test,
    questions,
    showToast,
    FinishExam,
  } = useContext(TestContext);
  const test_id = route.params ? route.params.test_id : '';
  const onFinish = route.params ? route.params.onFinish : '';
  const test = route.params ? route.params.test : '';
  const timeLeft_taken = route.params ? route.params.timeLeft : '';
  const [timeLeft, setTimeLeft] = useState(timeLeft_taken ? timeLeft_taken : 0);
  const goIndex = route.params ? route.params.goIndex : '';
  const attempted = route.params ? route.params.attempted : {};
  const title = route.params ? route.params.test.title : {};
  const total_questions = route.params ? route.params.test.count : {};
  const [state, setState] = useState({
    answered_questions_array: [],
    attempted_array: [],
    attempted: attempted,
    //
    subject_list: [],
  });
  useEffect(() => {
    getAnswetedList();
  }, []);

  useEffect(() => {
    // setTimeLeft(test.duration ? test.duration : 0);
    if (!timeLeft) {
      showToast('Time Over');
      onFinish();
      clearInterval(intervalId);
      return;
    }
    const intervalId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  // if (Object.keys(test).length > 0) {
  //   var valueStart = test.start_at.split(' ');
  //   var valueEnd = test.end_at.split(' ');
  //   var startDate = valueStart[0];
  //   var startTime = valueStart[1]
  //     ? test.start_at.substr(test.start_at.indexOf(' ') + 1)
  //     : '';
  //   var endDate = valueEnd[0];
  //   var endTime = valueEnd[1]
  //     ? test.end_at.substr(test.end_at.indexOf(' ') + 1)
  //     : '';
  // }
  const getAnswetedList = () => {
    const answered_questions_array = [];
    let attempted_array = [];
    questions.map((question, index) => {
      for (var i = 0; i < question.choices_list.length; i++) {
        if (question.choices_list[i].selected) {
          answered_questions_array.push(question.id);
          break;
        }
      }
      question.index_number = index;
    });
    if (state.attempted[test_id]) {
      attempted_array = state.attempted[test_id].filter(
        atemp => !answered_questions_array.includes(atemp),
      );
    }
    setState({
      ...state,
      answered_questions_array,
      attempted_array,
    });
  };
  const FinishExamAction = () => {
    navigation.goBack();
    onFinish();
  };
  const answered_count = state.answered_questions_array.length;
  const not_answered = state.attempted_array.length;
  const not_anttempted = questions.length - (answered_count + not_answered);
  // const not_anttempted =
  //   questions.length -
  //   (state.attempted[test_id] ? state.attempted[test_id].length : '');

  var hours = Math.floor(timeLeft / 3600);
  var minutes = Math.floor((timeLeft % 3600) / 60);
  var seconds = timeLeft % 60;
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
            <View style={{width: 1, backgroundColor: '#DCDCDC'}} />
            <View
              style={{
                width: '40%',
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                size={'md'}
                color={'grey'}
                family={'h4'}
                style={{color: '#929292'}}>
                Time Remaining
              </Text>
              <Text
                size={'xl'}
                color={'green'}
                family={'h3'}
                style={{marginTop: 10, color: '#14AF51'}}>
                {hours} : {minutes} : {seconds}
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
                {total_questions}
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
                  Negative Mark per Question :
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
                {answered_count}
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
                {not_anttempted}
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
                {not_answered}
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
                        backgroundColor:
                          state.answered_questions_array.includes(item.id)
                            ? '#DEFFEB'
                            : state.attempted_array.includes(item.id)
                            ? '#FFDCDC'
                            : '#EDEDED',

                        borderRadius: 50,

                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        family={'h4'}
                        size={'xl'}
                        color={
                          state.answered_questions_array.includes(item.id)
                            ? '#14AF51'
                            : state.attempted_array.includes(item.id)
                            ? '#E4333C'
                            : '#FFAB2D'
                        }>
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
