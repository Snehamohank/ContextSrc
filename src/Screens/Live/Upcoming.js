/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Text} from '../../utils/fontfamily';
import React, {useContext} from 'react';
import {Colors} from '../../utils/Colors';
import {wp} from '../../utils/ScreenResolutionHandler';
import LinearGradient from 'react-native-linear-gradient';
import {HomeContext} from '../Home/store/HomeContext';
import {IMAGEPOINT} from '../../store/Endpoints';
import {BatchGrey, PersonGrey} from '../../assets/svg';

import {useTranslation} from 'react-i18next';

const Upcoming = () => {
  const {t} = useTranslation();

  const {GetHomeData, upcominglive, isFetching} = useContext(HomeContext);

  const _onRefresh = () => {
    GetHomeData();
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{paddingRight: 20}}>
        <View
          style={{
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
                      backgroundColor: Colors.lightPurple,
                      borderRadius: 15,
                      padding: 2,
                    }}>
                    <Text
                      numberOfLines={5}
                      family={'h3'}
                      size={'sm'}
                      color={'white'}
                      style={{paddingHorizontal: 5, color: Colors.purple}}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 20,
                    marginHorizontal: 20,
                  }}>
                  {/* <TouchableOpacity
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
                        JOIN NOW
                      </Text>
                    </TouchableOpacity> */}
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={_onRefresh} />
        }
        contentContainerStyle={{paddingLeft: 20}}
        showsHorizontalScrollIndicator={false}
        data={upcominglive}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <Text
                numberOfLines={5}
                family={'h3'}
                size={'xxl'}
                color={'black'}
                style={{paddingBottom: 10}}>
                {t('upcoming')}
              </Text>
            </View>
          </>
        }
      />
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: {backgroundColor: '#f9f9f9', flex: 1},
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
