/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../utils/fontfamily';
import React from 'react';
import {Colors} from '../utils/Colors';
import {IMAGEPOINT} from '../store/Endpoints';
import {BatchBlue, BatchGrey, PersonBlue, PersonGrey} from '../assets/svg';
import {useTranslation} from 'react-i18next';

const BannerCard = ({list, navigation}) => {
  const {t} = useTranslation();
  const _renderItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: Colors.secondBlue,
            borderRadius: 15,
            marginVertical: 10,
          }}>
          <View style={{flex: 3, flexDirection: 'row', padding: 10}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#ffffff50',
                    borderRadius: 15,
                    padding: 2,
                  }}>
                  <Text
                    numberOfLines={5}
                    family={'h3'}
                    size={'sm'}
                    color={'white'}
                    style={{paddingHorizontal: 5}}>
                    {item.start_at}
                  </Text>
                </View>
              </View>
              <Text
                numberOfLines={5}
                family={'h4'}
                size={'md'}
                color={'white'}
                style={{paddingHorizontal: 5}}>
                {item.title}
              </Text>
              <View style={{paddingHorizontal: 10, paddingTop: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <PersonBlue style={{}} height={12} width={12} />
                  <View style={{}}>
                    <Text
                      numberOfLines={5}
                      family={'h4'}
                      size={'md'}
                      color={'white'}
                      style={{paddingHorizontal: 5, color: '#ffffff50'}}>
                      {t('tutor')}
                    </Text>
                    <Text
                      numberOfLines={5}
                      family={'h4'}
                      size={'md'}
                      color={'white'}
                      style={{paddingHorizontal: 5, paddingTop: 2}}>
                      {item.teacher_name}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 5,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <BatchBlue style={{}} height={12} width={12} />
                  <View style={{}}>
                    <Text
                      numberOfLines={5}
                      family={'h4'}
                      size={'md'}
                      color={'white'}
                      style={{paddingHorizontal: 5, color: '#ffffff50'}}>
                      {t('batch')}
                    </Text>
                    <Text
                      numberOfLines={5}
                      family={'h4'}
                      size={'md'}
                      color={'white'}
                      style={{paddingHorizontal: 5, paddingTop: 2}}>
                      {item.batch_name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 2}}>
            <ImageBackground
              source={{
                uri: item.photo
                  ? IMAGEPOINT + item.photo
                  : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
              }}
              resizeMode="cover"
              imageStyle={{
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 20,
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('JitsiMeeting', {
                      room: item.url_title,
                    });
                  }}
                  style={{
                    backgroundColor: Colors.green,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 25,
                    borderRadius: 5,
                  }}>
                  <Text
                    numberOfLines={5}
                    family={'h4'}
                    size={'md'}
                    color={'white'}
                    style={{paddingHorizontal: 5, paddingTop: 2}}>
                    {t('join now')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
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
          style={{paddingHorizontal: 0}}>
          {t('ongoing')}
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={list}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BannerCard;

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
