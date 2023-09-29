/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {Colors} from '../../utils/Colors';
import {Text} from '../../utils/fontfamily';
import {wp} from '../../utils/ScreenResolutionHandler';
import {ImageSinglePicker} from '../../components/Image-Picker';
import {UserContext} from '../../store/UserContext';
import {HomeContext} from '../Home/store/HomeContext';
import {IMAGEPOINT} from '../../store/Endpoints';
import {CameraBlue, CloseIcon, EditProfile} from '../../assets/svg';

import {useTranslation} from 'react-i18next';

let profUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png';

const ProfileScreen = ({navigation}) => {
  const {
    GetprofileData,
    profile_data,
    showToast,
    postProfile,
    isSubmittingProfile,
    signOut,
  } = useContext(UserContext);

  const {t} = useTranslation();

  const {student_data} = useContext(HomeContext);

  // const [username, onSetUserName] = useState(null);
  const [user_name, setUsername] = useState();
  const [email, onSetEmail] = useState();
  const [schoolname, onSetSchoolName] = useState();
  const [number, onSetNumber] = useState();
  const [address, onSetAddress] = useState();
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    GetprofileData();
    console.log(profile_data, 'aquaman');
    setProfileData();
  }, []);

  const postData = () => {
    if (user_name.length === 0) {
      showToast('Name cannot be empty');
    } else {
      edit
        ? postProfile(image, user_name, number, email, address).then(res => {
            setEdit(false);
          })
        : setEdit(true);
    }
  };

  const setProfileData = () => {
    setUsername(profile_data.student_name);
    onSetEmail(profile_data.email);
    onSetSchoolName(profile_data.school_name);
    onSetNumber(profile_data.contact);
    onSetAddress(profile_data.address);
  };

  const selectImage = () => {
    ImageSinglePicker().then(res => {
      console.log('Image', res);
      setImage(res);
    });
  };

  const image_url = image
    ? image.uri
    : profile_data.photo
    ? IMAGEPOINT + profile_data.photo
    : null;

  const LogoutAction = () => {
    Alert.alert(
      'Logout',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            if (Platform.OS === 'android') {
              signOut();
            }
            setTimeout(() => {
              signOut();
            }, 500);
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{paddingBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.darkBlue,
          }}>
          <View
            // onPress={() => navigation.goBack()}
            style={{
              height: 50,
              alignItems: 'center',
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            {/* <BackArrow width={15} height={15} /> */}
            {edit ? (
              <TouchableOpacity
                onPress={() => {
                  setEdit(false);
                }}>
                <CloseIcon height={20} width={20} />
              </TouchableOpacity>
            ) : (
              <Text
                family={'h4'}
                size={'xxl'}
                color={'white'}
                style={{paddingTop: 5}}>
                {t('profile')}
              </Text>
            )}
          </View>
          {edit ? (
            <TouchableOpacity
              loading={isSubmittingProfile}
              onPress={postData}
              style={{
                height: 30,
                alignItems: 'center',
                paddingHorizontal: 25,
                marginRight: 15,
                flexDirection: 'row',
                backgroundColor: Colors.green,
                borderRadius: 5,
              }}>
              <Text family={'h4'} size={'md'} color={'white'} style={{}}>
                {t('save')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setEdit(!edit)}
              style={{
                height: 50,
                alignItems: 'center',
                paddingHorizontal: 20,
                flexDirection: 'row',
              }}>
              {!edit && (
                <EditProfile
                  style={{marginVertical: '5%'}}
                  height={17}
                  width={17}
                />
              )}
              <Text
                family={'h4'}
                size={'md'}
                color={'white'}
                style={{paddingLeft: 10}}>
                {t('edit profile')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView>
          <ImageBackground
            resizeMode="stretch"
            width={'100%'}
            source={require('../../assets/PNG/profBg.png')}
            style={{paddingHorizontal: 10}}>
            <View
              style={{
                paddingVertical: 10,
                paddingTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={selectImage} activeOpacity={0.8}>
                <ImageBackground
                  imageStyle={{borderRadius: 100}}
                  // source={{uri: profUrl}}
                  source={{uri: image_url ? image_url : profUrl}}
                  style={{
                    width: wp(38),
                    height: wp(38),
                    marginBottom: 10,
                    // borderWidth: 2,
                    // borderColor: Colors.white,
                  }}
                  resizeMode={
                    Platform.isPad || DeviceInfo.isTablet() ? 'cover' : 'cover'
                  }>
                  {edit && (
                    <View
                      style={{
                        flex: 1,
                        // backgroundColor: 'red',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        right: 10,
                        bottom: 5,
                      }}>
                      <CameraBlue
                        style={{marginVertical: '5%'}}
                        height={40}
                        width={40}
                      />
                    </View>
                  )}
                </ImageBackground>
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 10,
                }}>
                {/* <Text
                  family={'h4'}
                  size={'xxl'}
                  color={'white'}
                  style={{paddingLeft: 10}}>
                  {profile_data.student_name}
                </Text> */}
                <TextInput
                  placeholderTextColor={Colors.black1}
                  editable={edit}
                  style={edit ? styles.inputBoxHead : styles.LineInputHead}
                  onChangeText={text => setUsername(text)}
                  value={user_name}
                  keyboardType="default"
                />
              </View>
              <View
                style={{
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginBottom: 15,
                }}>
                <Text
                  family={'h5'}
                  size={'xl'}
                  color={'black'}
                  style={{color: '#ffffff'}}>
                  {profile_data.register_no}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={{marginHorizontal: 15, marginTop: 20}}>
            <Text
              size={'lg'}
              color={'black3'}
              family={'h5'}
              allowFontScaling={false}>
              {t('school')}
            </Text>
            <View style={edit ? styles.editView : styles.LineInputBox}>
              <TextInput
                placeholderTextColor={Colors.black1}
                editable={edit}
                style={edit ? styles.inputBox : styles.LineInputBox}
                onChangeText={txt => onSetSchoolName(txt)}
                value={schoolname}
                placeholder={profile_data.school_name}
                keyboardType="default"
              />
              {edit && (
                <TouchableOpacity
                  onPress={() => onSetSchoolName('')}
                  style={{padding: 5}}>
                  <CloseIcon style={{}} height={15} width={15} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={{marginHorizontal: 15, paddingTop: 15}}>
            <Text
              size={'lg'}
              color={'black3'}
              family={'h5'}
              allowFontScaling={false}>
              {t('contact')}
            </Text>
            <View style={edit ? styles.editView : styles.LineInputBox}>
              <TextInput
                placeholderTextColor={Colors.black1}
                editable={edit}
                style={edit ? styles.inputBox : styles.LineInputBox}
                onChangeText={txt => onSetNumber(txt)}
                value={number}
                // placeholder={profile_data.contact}
                keyboardType="number-pad"
              />
              {edit && (
                <TouchableOpacity
                  onPress={() => onSetNumber('')}
                  style={{padding: 5}}>
                  <CloseIcon style={{}} height={15} width={15} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{marginHorizontal: 15, paddingTop: 15}}>
            <Text
              size={'lg'}
              color={'black3'}
              family={'h5'}
              allowFontScaling={false}>
              {t('email')}
            </Text>
            <View style={edit ? styles.editView : styles.LineInputBox}>
              <TextInput
                placeholderTextColor={Colors.black1}
                editable={edit}
                style={edit ? styles.inputBox : styles.LineInputBox}
                onChangeText={txt => onSetEmail(txt)}
                value={email}
                keyboardType="email-address"
              />
              {edit && (
                <TouchableOpacity
                  onPress={() => onSetEmail('')}
                  style={{padding: 5}}>
                  <CloseIcon style={{}} height={15} width={15} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={{marginHorizontal: 15, paddingTop: 15}}>
            <Text
              size={'lg'}
              color={'black3'}
              family={'h5'}
              allowFontScaling={false}>
              {t('address')}
            </Text>
            <View
              style={{
                borderBottomColor: edit ? Colors.black : Colors.white,
                borderBottomWidth: edit ? 0.5 : 0.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                multiline={edit ? false : true}
                placeholderTextColor={Colors.black1}
                editable={edit}
                style={edit ? styles.inputBox : styles.LineInputBox}
                onChangeText={txt => onSetAddress(txt)}
                value={address}
                keyboardType="default"
              />
              {edit && (
                <TouchableOpacity
                  onPress={() => onSetAddress('')}
                  style={{padding: 5}}>
                  <CloseIcon style={{}} height={15} width={15} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={{marginHorizontal: 15, paddingTop: 15}}>
            <TouchableOpacity onPress={() => LogoutAction()}>
              <Text
                size={'xxl'}
                color={'red'}
                family={'h4'}
                allowFontScaling={false}>
                {t('logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  percentageView: {
    backgroundColor: '#fff',
    borderRadius: 80,
    width: 75,
    height: 75,
    borderColor: Colors.bg_blue,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
  },
  percentageDiffView: {
    backgroundColor: '#fff',
    borderRadius: 80,
    width: 75,
    height: 75,
    borderColor: Colors.bg_blue,
    borderWidth: 1.5,
    marginLeft: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 10,
  },
  headerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  countText: {
    textAlign: 'center',
    color: '#5e95b2',
    fontWeight: 'bold',
  },
  modalView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.3,
    marginHorizontal: 10,
  },
  modalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  slidebar: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 60,
    backgroundColor: '#9f9f9f',
    height: 4,
    marginVertical: 15,
    borderRadius: 10,
  },
  inputBoxName: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    paddingLeft: 0,
    paddingBottom: 3,
    fontFamily: 'AirbnbCereal-Medium',
    fontSize: 15,
    color: Colors.black1,
  },
  LineinputBox: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    paddingLeft: 0,
    paddingBottom: 3,
    fontFamily: 'AirbnbCereal-Medium',
    fontSize: 15,
    color: Colors.black1,
  },
  LineInputHead: {
    fontFamily: 'AirbnbCereal-Medium',
    fontSize: 18,
    color: Colors.white,
  },
  inputBoxHead: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 0.5,
    fontFamily: 'AirbnbCereal-Medium',
    fontSize: 18,
    color: Colors.white,
  },
  inputBox: {
    width: '90%',
    paddingLeft: 0,
    paddingBottom: 3,
    fontFamily: 'AirbnbCereal-Medium',
    fontSize: 15,
    color: Colors.black1,
  },
  LineInputBox: {
    // borderBottomColor: Colors.black,
    // borderBottomWidth: 0.5,
    paddingLeft: 0,
    paddingBottom: 3,
    fontFamily: 'AirbnbCereal-Medium',
    fontSize: 15,
    color: Colors.black1,
  },
  editView: {
    height: 35,
    borderBottomColor: Colors.black,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
