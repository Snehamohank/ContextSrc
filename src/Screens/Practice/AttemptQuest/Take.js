/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
//
import {Loader, MainLoader, MultiTapHandler, wp} from '../../../components';
import {TestContext} from '../store/TestContext';
import {IMAGEPOINT} from '../../../store/Endpoints';
import {Colors} from '../../../utils/Colors';
import {choice_text} from '../../../utils/Constants';
import {ChoiceInput} from '../../../components/TextParser/ChoiceParser';
import {ExamInput} from '../../../components/TextParser/ExamParser';
import * as NavigationRef from '../../../navigation/NavigationRef';
import {
  BackArrow,
  InfoIcon,
  Next,
  Previous,
  ClockGray,
  ArrowRight,
  ArrowLeft,
  RefreshIcon,
  GroupDot,
  NextBlue,
} from '../../../assets/svg';
import {Text} from '../../../utils/fontfamily';

import {useTranslation} from 'react-i18next';
import moment from 'moment';

// create a component
const Take = ({navigation, test}) => {
  const {t} = useTranslation();
  const {
    questions,
    showToast,
    isFetchingExamStart,
    submitAnswer,
    batch_id,
    FinishTest,
    attempt_no,
    ClearAnswer,
    start_time,
  } = useContext(TestContext);
  const [timeLeft, setTimeLeft] = useState(
    test.duration ? test.duration * 60 : 0,
  );
  const [duration, set_duration] = useState(
    test.duration ? test.duration * 60 : 0,
  );
  const [selected, setselected] = useState(null);
  const [state, setState] = useState({
    image: null,
    image_visible: false,
    attempted: {},
    questions_array: [],
    attempted_array: [],
  });
  const [submit_loading, set_submit_loading] = useState(false);
  const [current_index, set_current_index] = useState(0);
  let quest = questions[current_index];
  const test_id = test.id;
  useEffect(() => {
    if (start_time.length > 0) {
      var now = moment().format('DD/MM/YYYY HH:mm:ss A');
      var then = start_time;

      var duration_diff = moment(now, 'DD/MM/YYYY HH:mm:ss A').diff(
        moment(then, 'DD/MM/YYYY HH:mm:ss A'),
        'minutes',
      );
      var current_duration = (test.duration * 60 ) - (duration_diff * 60 );
      // console.log(start_time,duration,duration_diff, current_duration, 'duration_diff');
      // console.log(moment(start_time,'DD/MM/YYYY HH:mm:ss A').fromNow()),"oiy";
      setTimeLeft(current_duration);
    }
  }, []);

  useEffect(() => {
    if (quest && !quest.answered && test.duration) {
      if (timeLeft <= 0) {
        showToast('Time Over');
        onFinishExam();
        clearInterval(intervalId);
        return;
      }
      const intervalId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      // clear interval on re-render to avoid memory leaks
      return () => clearInterval(intervalId);
    }
  }, [timeLeft, questions, current_index, quest]);

  useEffect(() => {
    if (current_index === 0 && questions.length > 0) {
      SetAttempted(questions[0]);
    }
  }, []);

  const SetAttempted = (question = {}) => {
    let attmpt = state.attempted;
    if (attmpt[test_id]) {
      const item_index = attmpt[test_id].indexOf(question.id);
      if (item_index !== -1) {
        // attmpt[test_id].splice(item_index, 1);
      } else {
        attmpt[test_id].push(question.id);
      }
    } else {
      attmpt[test_id] = [question.id];
    }
    setState({...state, attempted: attmpt});
  };

  const SubmitAnswerAction = () => {
    if (selected) {
      set_submit_loading(true);
      SetAttempted(quest);
      submitAnswer(
        questions,
        quest,
        selected,
        test_id,
        attempt_no,
        current_index,
        batch_id,
      );
      set_submit_loading(false);
    } else {
      showToast('Select any option');
    }
  };

  const onFinish = () => {
    Alert.alert(
      'After Submit, answers cannot modify',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onFinishExam();
          },
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  const onFinishExam = () => {
    FinishTest(test_id, attempt_no).then(res => {
      if (res) {
        console.log(res, 'finsh api succ');
        NavigationRef.replace('TestResult', {test_id: test_id});
      }
    });
  };

  const ClearAnswerAction = () => {
    ClearAnswer(quest, questions, current_index, attempt_no, test_id, batch_id);
    setTimeout(() => {
      setselected('');
      setTimeLeft(duration);
    }, 500);
  };

  const answered_count = state.questions_array.length;
  const not_answered = state.attempted_array.length;
  const not_anttempted = questions.length - (answered_count + not_answered);

  var hours = Math.floor(timeLeft / 3600);
  var minutes = Math.floor((timeLeft % 3600) / 60);
  var seconds = timeLeft % 60;

  const renderAnswerItem = ({item}) => {
    if (item.selected) {
      setselected(item.id);
    }
    return (
      <TouchableOpacity
        onPress={() => setselected(item.id)}
        activeOpacity={0.8}
        style={
          // selected === item.id
          //   ? styles.SelectedContainer
          //   :
          styles.UnselectedContainer
        }>
        <View
          style={{
            justifyContent: 'center',
            marginTop: quest.answered ? 5 : 5,
            borderRadius: 8,
            borderColor: item.id === selected ? '#5E3CBE' : '#b5b5b5',
            backgroundColor: item.id === selected ? '#EEE8FF' : '#ffffff',
            borderWidth: quest.answered
              ? item.selected || item.is_correct
                ? 1.5
                : 1
              : item.id === selected
              ? 1.5
              : 1,
            paddingLeft: 10,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginLeft: -5,
                height: 35,
                width: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                borderWidth: item.id === selected ? 0 : 1,
                borderColor:
                  item.id === selected ? 'transparent' : Colors.lightgrey,
                backgroundColor: item.id === selected ? '#5E3CBE' : '#E9E9E9',
                marginRight: 10,
              }}>
              <Text
                family={'h5'}
                size={'lg'}
                style={{
                  color: item.id === selected ? '#FFFFFF' : '#333333',
                }}>
                {choice_text[item.position]}
              </Text>
            </View>

            <View style={{flex: 1}}>
              <ChoiceInput
                quest={quest}
                current_index={current_index}
                ans={item}
              />
            </View>
          </View>
          {item.image && (
            <>
              {item.image.length > 0 && (
                <View
                  style={{alignItems: 'center', marginBottom: 15}}
                  // activeOpacity={1}
                  // onPress={() =>
                  //   setState({
                  //     ...state,
                  //     image_visible: true,
                  //     image: [{ url: IMAGEPOINT + item.image }],
                  //   })
                  // }
                >
                  <AutoHeightImage
                    source={{uri: IMAGEPOINT + item.image}}
                    width={wp('75%')}
                    style={{borderRadius: 10}}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          elevation: 3,
          shadowColor: '#00000070',
          shadowOpacity: 0.2,
          shadowRadius: 2,
          paddingHorizontal: 15,
          backgroundColor: '#fff',
          shadowOffset: {width: 0, height: 1},
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              paddingRight: 5,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}
            onPress={() => navigation.goBack()}>
            <ArrowLeft height={15} width={15} />
          </TouchableOpacity>

          {test.duration && (
            <TouchableOpacity
              style={{alignItems: 'center', flexDirection: 'row'}}>
              {/* <ClockGray height={20} width={20} /> */}
              {/* <Text
                numberOfLines={1}
                family={'h4'}
                size={'xl'}
                color={'green'}
                style={{marginLeft: 10}}>
                Time Left
              </Text> */}

              <View style={{paddingLeft: 10}}>
                <Text
                  numberOfLines={1}
                  family={'h4'}
                  size={'xl'}
                  color={'blue'}
                  style={{color: '#24C262'}}>
                  {hours} : {minutes} : {seconds}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => onFinish()}
            style={{
              paddingHorizontal: 15,
              alignItems: 'center',
              backgroundColor: '#E07E27',
              height: 28,
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Text
              numberOfLines={1}
              family={'h4'}
              size={'md'}
              color={'white'}
              style={{}}>
              {t('end test')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 20}}
            // onPress={() => {
            //   getAnswetedList();
            //   // setRightModalVisible(true);
            // }}
            onPress={() => {
              SetAttempted(quest);
              navigation.navigate('TestInfo', {
                test_id: test_id,
                attempted: state.attempted,
                onFinish: onFinish,
                SetAttempted: SetAttempted,
                goIndex: set_current_index,
                test: test,
                timeLeft: timeLeft,
              });
            }}>
            <GroupDot width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 50,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          disabled={current_index == 0}
          style={{opacity: current_index == 0 ? 0.4 : 1}}
          activeOpacity={current_index != 0 ? 0.8 : 1}
          onPress={() => {
            setselected('');
            SetAttempted(quest);
            set_current_index(current_index - 1);
          }}>
          <View style={{transform: [{rotate: '180deg'}]}}>
            <NextBlue width={50} height={50} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={submit_loading}
          onPress={() => MultiTapHandler(SubmitAnswerAction())}
          activeOpacity={0.8}
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#5E3CBE',
            borderRadius: 10,
            height: 50,
            // marginHorizontal: 20,
          }}>
          {submit_loading ? (
            <Loader size="small" color="#fff" />
          ) : (
            <Text
              family={'h4'}
              size="xxl"
              style={{
                color: Colors.white,
              }}>
              {/* {questions.length - 1 === current_index ? 'Finish' : 'Save'} */}
              {t('submit')}
            </Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            MultiTapHandler(ClearAnswerAction()), setselected('');
          }}>
          <RefreshIcon width={25} height={25} />
        </TouchableOpacity> */}

        <TouchableOpacity
          disabled={questions.length - 1 == current_index}
          activeOpacity={questions.length - 1 > current_index ? 0.5 : 1}
          style={{opacity: questions.length - 1 == current_index ? 0.4 : 1}}
          onPress={() => {
            SetAttempted(quest);
            set_current_index(current_index + 1);
            setselected('');
          }}>
          <NextBlue width={50} height={50} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isFetchingExamStart ? (
        <MainLoader size="large" color="black" />
      ) : (
        <>
          {renderHeader()}

          <ScrollView>
            {questions.length > 0 && (
              <>
                <View style={{paddingHorizontal: 25, marginTop: 25}}>
                  <Text family={'h4'} size="lg" color={'black'}>
                    {t('question')} {current_index + 1}
                  </Text>
                  <ExamInput quest={quest} />

                  {Boolean(quest.image) && (
                    <>
                      {quest.image.length > 0 && (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() =>
                            setState({
                              ...state,
                              image_visible: false,
                              image: [{url: IMAGEPOINT + quest.image}],
                            })
                          }>
                          <AutoHeightImage
                            source={{uri: IMAGEPOINT + quest.image}}
                            width={wp('90%')}
                            style={{borderRadius: 10}}
                          />
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
                <View style={{marginHorizontal: 25, marginVertical: 20}}>
                  <Text
                    style={{marginTop: 5}}
                    family={'h4'}
                    color={'grey'}
                    size={'lg'}>
                    {t('choose answer')}
                  </Text>
                </View>
                <FlatList
                  // style={{ marginTop: 30 }}
                  data={quest.choices_list}
                  renderItem={renderAnswerItem}
                  keyExtractor={item => item.id}
                />
              </>
            )}
          </ScrollView>

          {renderFooter()}
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  SelectedContainer: {
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    // width: '100%',
    backgroundColor: Colors.pollblue,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  UnselectedContainer: {
    borderRadius: 25,
    marginVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    flexDirection: 'column',
    // width: '100%',
    backgroundColor: Colors.white,
  },
});

//make this component available to the app
export default Take;
