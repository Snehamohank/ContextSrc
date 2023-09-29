/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../../utils/fontfamily';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../../utils/Colors';
import {BackArrow} from '../../../assets/svg';
//import liraries
import React, {useState, useEffect, useContext} from 'react';
import AttemptQuest from './Attempt';
import TakeQuest from './Take';
import {TestContext} from '../store/TestContext';
import {MainLoader} from '../../../components';

import {useTranslation} from 'react-i18next';

// create a component
const Exam = ({navigation, route}) => {
  const {t} = useTranslation();
  const {
    GetTestDetails,
    test,
    total_questions,
    total_mark,
    render_view,
    isFetchingExamAttend,
    startTest,
  } = useContext(TestContext);
  const test_id = route.params ? route.params.test_id : '';
  useEffect(() => {
    GetTestDetails(test_id);
  }, []);
  return (
    <View style={styles.container}>
      {isFetchingExamAttend ? (
        <>
          <MainLoader />
        </>
      ) : render_view === 'attempt' ? (
        <View style={{flex: 1}}>
          <AttemptQuest
            test={test}
            total_questions={total_questions}
            total_mark={total_mark}
            startExam={() => startTest(test_id)}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <TakeQuest navigation={navigation} test={test} />
        </View>
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
});

//make this component available to the app
export default Exam;
