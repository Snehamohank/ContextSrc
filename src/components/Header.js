/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Text} from '../utils/fontfamily';
import {
  BackArrow,
  LogoBlue,
  MessageIcon,
  NotificationIcon,
  SearchIcon,
  FavIcon,
  DownGrey,
  Language,
  SelectGreen,
} from '../assets/svg';
import * as NavigationRef from '../navigation/NavigationRef';
import {Colors} from '../utils/Colors';
import Modal from 'react-native-modal';

import {useTranslation} from 'react-i18next';
import i18n from './Lang';
import {HomeContext} from '../Screens/Home/store/HomeContext';

const divisions = [
  {id: 'en', title: 'English'},
  {id: 'lo', title: 'Laos'},
];

const Header = ({
  // navigation,
  main = false,
  back = false,
  lang = false,
  title = '',
  color = 'white',
}) => {
  const {SwitchLanguage, language} = useContext(HomeContext);
  const [currentLanguage, setLanguage] = useState(language ? language : 'en');
  const [isModalVisible, setModalVisible] = useState(false);

  const {t, i18n} = useTranslation();

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changeLanguage(item.id), SwitchLanguage(item.id);
          setModalVisible(false);
        }}
        style={{
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          borderBottomWidth: 0.2,
          borderColor: '#eee',
        }}>
        <Text family={'h4'} size={'xl'} color={'black'} style={{}}>
          {item.title}
        </Text>
        {item.id === currentLanguage && (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              height: 60,
              justifyContent: 'center',
            }}>
            <SelectGreen
              style={{marginVertical: '5%'}}
              height={20}
              width={20}
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {optionsgroundColor: color}]}>
      <View
        style={{
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          backgroundColor: '#fff',
          elevation: 4,
          shadowColor: '#00000070',
          shadowOpacity: 0.2,
          shadowRadius: 2,
          marginVertical: 2,
          paddingHorizontal: 10,
          shadowOffset: {width: 0, height: 1},
        }}>
        <>
          {main ? (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{paddingRight: 10, paddingHorizontal: 10}}
                  onPress={() => NavigationRef.goBack()}>
                  <Image
                    source={require('../assets/PNG/dlclogo.png')}
                    resizeMode="contain"
                    style={{height: 40, width: 40, marginVertical: '5%'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : back ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{paddingHorizontal: 5}}
                onPress={() => NavigationRef.goBack()}>
                <BackArrow style={{}} height={15} width={15} />
              </TouchableOpacity>
              {Boolean(title) && (
                <Text
                  numberOfLines={5}
                  family={'h3'}
                  size={'xxl'}
                  color={'black'}
                  allowFontScaling={false}
                  style={{paddingHorizontal: 10}}>
                  {title ? title : ''}
                </Text>
              )}
            </View>
          ) : title ? (
            <>
              {Boolean(title) && (
                <Text
                  numberOfLines={5}
                  family={'h3'}
                  size={'xxl'}
                  color={'black'}
                  allowFontScaling={false}
                  style={{paddingHorizontal: 10}}>
                  {title ? title : ''}
                </Text>
              )}
            </>
          ) : (
            <View />
          )}
        </>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          {lang ? (
            <>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Language style={{marginRight: 5}} height={22} width={22} />
                <Text
                  numberOfLines={5}
                  family={'h4'}
                  size={'lg'}
                  color={'grey'}
                  style={{paddingHorizontal: 5}}>
                  {t('language')}
                </Text>
                <DownGrey style={{}} height={12} width={12} />
              </TouchableOpacity>
              <Modal
                isVisible={isModalVisible}
                style={{justifyContent: 'flex-end', margin: 0}}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                backdropColor="black"
                backdropOpacity={0.5}
                useNativeDriver>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    minHeight: 170,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        height: 5,
                        borderRadius: 50,
                        width: 60,
                        backgroundColor: Colors.lightgrey,
                        marginVertical: 10,
                        marginTop: 15,
                      }}
                    />
                  </View>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={divisions}
                    contentContainerStyle={{marginLeft: 10}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={_renderItem}
                  />
                </View>
              </Modal>
            </>
          ) : (
            <View />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    elevation: 5,
    shadowColor: '#00000070',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 5,
    shadowOffset: {width: 0, height: 1},
  },
  countContainer: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#8244fc',
    position: 'absolute',
    right: 10,
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
