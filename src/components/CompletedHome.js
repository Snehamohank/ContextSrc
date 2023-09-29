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
import {IMAGEPOINT} from '../store/Endpoints';
import {BatchGrey, PersonGrey, RightGrey, VideoPlay} from '../assets/svg';

import {useTranslation} from 'react-i18next';

const CompletedHome = ({list, navigation}) => {
  const {t} = useTranslation();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.uploaded_file) {
            navigation.navigate('VideoScreen', {data: item});
          }
        }}
        activeOpacity={0.8}
        style={{paddingRight: 20}}>
        <View
          style={{
            width: wp(80),
            backgroundColor: Colors.white,
            borderRadius: 15,
            marginTop: 5,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: Colors.white,
              borderRadius: 15,
              elevation: 3,
              shadowColor: '#00000070',
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowOffset: {width: 0, height: 1},
              marginBottom: 5,
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
                      //   backgroundColor: Colors.lightPurple,
                      borderRadius: 15,
                    }}>
                    <Text
                      numberOfLines={5}
                      family={'h3'}
                      size={'sm'}
                      color={'white'}
                      style={{color: Colors.lightgrey}}>
                      {item.start_at}
                    </Text>
                  </View>
                </View>
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'md'}
                  color={'black'}
                  style={{paddingHorizontal: 5}}>
                  {item.title}
                </Text>
                <View style={{paddingHorizontal: 10, paddingTop: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <PersonGrey style={{}} height={12} width={12} />
                    <View style={{}}>
                      <Text
                        numberOfLines={5}
                        family={'h4'}
                        size={'md'}
                        color={'black'}
                        style={{
                          paddingHorizontal: 5,
                          color: Colors.lightSkyBlue,
                        }}>
                        {t('tutor')}
                      </Text>
                      <Text
                        numberOfLines={5}
                        family={'h4'}
                        size={'md'}
                        color={'black'}
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
                    <BatchGrey style={{}} height={12} width={12} />
                    <View style={{}}>
                      <Text
                        numberOfLines={5}
                        family={'h4'}
                        size={'md'}
                        color={'black'}
                        style={{
                          paddingHorizontal: 5,
                          color: Colors.lightSkyBlue,
                        }}>
                        {t('batch')}
                      </Text>
                      <Text
                        numberOfLines={5}
                        family={'h4'}
                        size={'md'}
                        color={'black'}
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
                <LinearGradient
                  colors={['transparent', '#00000080']}
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    borderBottomRightRadius: 15,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item.uploaded_file !== null && (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 25,
                        borderRadius: 5,
                      }}>
                      <VideoPlay style={{}} height={30} width={30} />
                    </View>
                  )}
                </View>
              </ImageBackground>
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
          {t('completed')}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Live')}
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
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default CompletedHome;

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
