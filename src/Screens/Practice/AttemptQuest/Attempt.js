/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Text} from '../../../utils/fontfamily';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../../utils/Colors';
import moment from 'moment';
import {BackArrow} from '../../../assets/svg';
import Header from '../../../components/Header';

import {useTranslation} from 'react-i18next';

const AttemptQuest = ({test, total_questions, total_mark, startExam}) => {
  const {t} = useTranslation();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}>
        <Header back title={t('attempt questions')} />
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <View
            style={{
              backgroundColor: Colors.secondBlue,
              borderRadius: 15,
              marginBottom: 15,
              marginHorizontal: 15,
              marginTop: 15,
              padding: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff60'}}>
                  {t('date')} :
                </Text>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff'}}>
                  {moment(test.published_at, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{height: 12, width: 1.2, backgroundColor: '#fff'}}
                />
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff60'}}>
                  {t('time')} :
                </Text>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff'}}>
                  {moment(test.published_at, 'DD/MM/YYYY HH:mm').format(
                    'hh:mm A',
                  )}{' '}
                  to{' '}
                  {moment(test.expire_at, 'DD/MM/YYYY HH:mm').format('hh:mm A')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff60'}}>
                  {t('mark per question')} :
                </Text>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff'}}>
                  {test.mark_per_question}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{height: 12, width: 1.2, backgroundColor: '#fff'}}
                />
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff60'}}>
                  {t('negative mark per question')} :
                </Text>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff'}}>
                  {test.negative_score}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: '#ffffff30',
                height: 35,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 15,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'lg'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff70'}}>
                  {t('total mark')} :
                </Text>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'lg'}
                  color={'grey'}
                  style={{paddingHorizontal: 5, color: '#ffffff'}}>
                  {total_mark}
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 15}}>
            {/* <Text
              numberOfLines={5}
              family={'h4'}
              size={'lg'}
              color={'grey'}
              style={{paddingHorizontal: 5}}>
              {test.description}
            </Text> */}
            <Text
              numberOfLines={5}
              family={'h4'}
              size={'xxl'}
              color={'black'}
              style={{paddingHorizontal: 5, paddingTop: 20}}>
              {test.title}
            </Text>
            <Text
              numberOfLines={5}
              family={'h4'}
              size={'lg'}
              color={'grey'}
              style={{paddingHorizontal: 5, paddingTop: 15}}>
              {test.description}
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => startExam()}
          style={{
            backgroundColor: Colors.green,
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            borderRadius: 10,
            marginVertical: 10,
            marginHorizontal: 20,
          }}>
          <Text
            numberOfLines={5}
            family={'h4'}
            size={'xxl'}
            color={'white'}
            style={{paddingHorizontal: 5, paddingTop: 2}}>
            {t('attempt now')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AttemptQuest;

const styles = StyleSheet.create({});
