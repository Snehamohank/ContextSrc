/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {Text} from '../utils/fontfamily';
import React from 'react';
import {Colors} from '../utils/Colors';
import {wp} from '../utils/ScreenResolutionHandler';
import LinearGradient from 'react-native-linear-gradient';
import {NotesIcon, RightGrey} from '../assets/svg';

import {useTranslation} from 'react-i18next';

const PracticeCard = ({list, navigation}) => {
  const {t} = useTranslation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('AttemptQuest', {test_id: item.id})}
        activeOpacity={0.9}
        style={{paddingRight: 20}}>
        <View
          style={{
            width: wp(80),
            backgroundColor: '#2363E0',
            borderRadius: 15,
          }}>
          <View
            style={{
              paddingHorizontal: 15,
              flex: 1,
              paddingVertical: 15,
              flexDirection: 'row',
            }}>
            <View style={{flex: 2}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: '#ffffff40',
                    borderRadius: 15,
                    paddingHorizontal: 5,
                    height: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
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
                family={'h4'}
                size={'md'}
                color={'white'}
                style={{color: '#ffffff', paddingVertical: 5, paddingTop: 10}}>
                {item.title}
              </Text>
              <Text
                family={'h4'}
                size={'md'}
                color={'white'}
                style={{color: '#ffffff', paddingBottom: 5}}>
                {item.description}
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
                    style={{paddingHorizontal: 5, paddingTop: 2}}>
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={5}
          family={'h3'}
          size={'xxl'}
          color={'black'}
          style={{paddingHorizontal: 20, paddingBottom: 10}}>
          {t('practice questions')}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Practice')}
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Text
            numberOfLines={5}
            family={'h5'}
            size={'md'}
            color={'black'}
            style={{}}>
            {t('view all')}
          </Text>
          <RightGrey style={{marginLeft: 5}} height={10} width={10} />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{paddingLeft: 20}}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default PracticeCard;

const styles = StyleSheet.create({
  container: {backgroundColor: '#f9f9f9'},
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
