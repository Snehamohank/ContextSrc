/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {ExamInput} from '../../components/TextParser/ExamParser';
import {IMAGEPOINT} from '../../store/Endpoints';
import {wp} from '../../components';
import {Text} from '../../utils/fontfamily';
import {Colors} from '../../utils/Colors';
import {choice_text} from '../../utils/Constants';
import {ChoiceInput} from '../../components/TextParser/ChoiceParser';
import {ArrowLeft, GroupDot, NextBlue} from '../../assets/svg';

// create a component
const Answers = ({navigation, route}) => {
  let test_id = route.params ? route.params.test_id : '';
  let questions = route.params ? route.params.questions : '';
  let results = route.params ? route.params.results : '';
  const [current_index, set_current_index] = useState(0);
  let quest = questions[current_index];
  const [state, setState] = useState({
    image: null,
    image_visible: false,
    attempted: {},
    questions_array: [],
    attempted_array: [],
  });

  const renderAnswerItem = ({item}) => {
    return (
      <TouchableOpacity
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
            borderColor:
              item.is_correct === true
                ? '#52b4a3'
                : item.is_correct === false && item.selected === true
                ? '#ff4d4d'
                : '#999999',
            backgroundColor:
              item.is_correct === true
                ? '#E9FFF1a3'
                : item.is_correct === false && item.selected === true
                ? '#FFE5E5'
                : '#fff',
            borderWidth:
              item.is_correct === true
                ? 1.5
                : item.is_correct === false && item.selected === true
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
                // backgroundColor: quest.answered
                //   ? item.is_correct === true
                //     ? '#fff'
                //     : item.is_correct === false && item.selected === true
                //     ? '#fff'
                //     : '#fff'
                //   : item.id === selected
                //   ? Colors.bg_blue
                //   : '#fff',
                borderWidth:
                  item.is_correct === true
                    ? 1.5
                    : item.is_correct === false && item.selected === true
                    ? 0
                    : 1,
                borderColor:
                  item.is_correct === true
                    ? 'transparent'
                    : item.is_correct === false && item.selected === true
                    ? 'transparent'
                    : Colors.lightgrey,
                backgroundColor:
                  item.is_correct === true
                    ? '#52b4a3'
                    : item.is_correct === false && item.selected === true
                    ? '#ff4d4d'
                    : '#fff',

                marginRight: 10,
              }}>
              <Text
                family={'h5'}
                size={'lg'}
                style={{
                  color: quest.answered
                    ? item.is_correct === true
                      ? '#ffffff'
                      : item.is_correct === false && item.selected === true
                      ? '#ffffff'
                      : '#333333'
                    : item.id === item.selected
                    ? '#FFFFFF'
                    : '#333333',
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
        </View>

        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: 20}}
            // onPress={() => {
            //   getAnswetedList();
            //   // setRightModalVisible(true);
            // }}
            onPress={() => {
              // getAnswetedList();
              navigation.navigate('TestAnsInfo', {
                goIndex: set_current_index,
                questions: questions,
                title: results.test.title,
                attnd_count: results.correct_count + results.incorrect_count,
                unattnd_count: results.not_attended,
                test: results.test,
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
            set_current_index(current_index - 1);
          }}>
          <View style={{transform: [{rotate: '180deg'}]}}>
            <NextBlue width={50} height={50} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            height: 50,
            // marginHorizontal: 20,
          }}>
          <Text
            family={'h4'}
            size="xl"
            style={{
              color: Colors.black1,
            }}>
            {/* {questions.length - 1 === current_index ? 'Finish' : 'Save'} */}
            {`Q${current_index + 1}/Q${questions.length}`}
          </Text>
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
            set_current_index(current_index + 1);
          }}>
          <NextBlue width={50} height={50} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView>
        {questions.length > 0 && (
          <>
            <View style={{paddingHorizontal: 25, marginTop: 25}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text family={'h4'} size="lg" color={'black'}>
                  Question {current_index + 1}
                </Text>
                <View
                  style={{
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 15,
                    backgroundColor: quest.answered
                      ? quest.correct === true
                        ? '#E9FFF1a3'
                        : quest.correct === false
                        ? '#FFE5E5'
                        : '#EEE8FF'
                      : '#ffff',
                  }}>
                  <Text
                    family={'h4'}
                    size="md"
                    style={{
                      color: quest.answered
                        ? quest.correct === true
                          ? '#52b4a3'
                          : quest.correct === false
                          ? '#ff4d4d'
                          : '#E9E9E9'
                        : '#ffff',
                    }}>
                    {' '}
                    {quest.answered
                      ? quest.correct
                        ? ' Correct answer'
                        : ' Wrong answer'
                      : ''}
                  </Text>
                </View>
              </View>
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
                Choose your answer
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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

export default Answers;
