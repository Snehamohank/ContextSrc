/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {Colors} from '../../utils/Colors';
import {Text} from '../../utils/fontfamily';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
let profUrl =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png';

const EditProfile = ({navigation}) => {
  const [username, onSetUserName] = React.useState(null);
  const [dob, onSetDOB] = useState('');
  const [age, onSetAge] = useState('');
  const [email, onSetEmail] = useState('');
  const [number, onSetNumber] = useState('');
  const [address, onSetAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(dob ? dob : new Date());

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{paddingBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: 50,
              alignItems: 'center',
              backgroundColor: Colors.white,
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}>
            <Image
              resizeMode="contain"
              style={{height: 25, width: 25, marginVertical: '5%'}}
              source={require('../../assets/PNG/home.png')}
            />
            <Text
              family={'h4'}
              size={'xxl'}
              color={'black2'}
              style={{paddingLeft: 10}}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: Colors.blue,
              width: 80,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              borderRadius: 5,
              marginRight: 10,
            }}>
            <Text family={'h4'} size={'lg'} color={'lightwhite'} style={{}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              paddingVertical: 10,
              paddingTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageBackground
              imageStyle={{borderRadius: 100}}
              source={{uri: profUrl}}
              style={{
                width: 100,
                height: 100,
              }}
              resizeMode={
                Platform.isPad || DeviceInfo.isTablet() ? 'cover' : 'cover'
              }>
              <View style={{top: 60, left: 65}}>
                <Image
                  resizeMode="contain"
                  style={{height: 30, width: 30, marginVertical: '5%'}}
                  source={require('../../assets/PNG/home.png')}
                />
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 10,
            }}>
            <Text
              family={'h5'}
              size={Platform.isPad || DeviceInfo.isTablet() ? 'xl' : 'xl'}
              color={'blue'}>
              DPA342CDXL
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 15}}>
          <Text
            size={'lg'}
            color={'black3'}
            family={'h5'}
            allowFontScaling={false}>
            Name
          </Text>
          <View style={{height: 35}}>
            <TextInput
              placeholderTextColor={Colors.black1}
              style={styles.inputBox}
              onChangeText={onSetUserName}
              value={username}
              placeholder="Muhammed Muzeen"
              keyboardType="default"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            paddingTop: 15,
          }}>
          <View
            style={{
              width: '50%',
            }}>
            <Text
              size={'lg'}
              color={'black3'}
              family={'h5'}
              allowFontScaling={false}>
              Date of Birth
            </Text>
            <View style={{height: 35}}>
              <TouchableOpacity
                // onPress={toggleModal}
                onPress={() => setOpen(true)}
                activeOpacity={0.8}
                style={{paddingTop: 10}}>
                <View style={styles.inputBox}>
                  {date == 'Birthday' ? (
                    <Text
                      style={{paddingBottom: 5}}
                      size={'lg'}
                      color={'black1'}
                      family={'h4'}
                      allowFontScaling={false}>
                      Birthday
                    </Text>
                  ) : (
                    <Text
                      style={{}}
                      size={'lg'}
                      color={'black1'}
                      family={'h4'}
                      allowFontScaling={false}>
                      {moment(date, 'DD/MM/YYYY hh:mm A').format(
                        'DD MMMM YYYY',
                      )}
                    </Text>
                  )}

                  <View style={{}}>
                    {/* <DownGray height={12} width={12} /> */}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <DatePicker
            modal
            placeholder="Select your birthday"
            mode="date"
            maximumDate={new Date()}
            minimumDate={new Date('1900-01-01')}
            open={open}
            date={
              date === 'Birthday'
                ? new Date()
                : new Date(moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'))
            }
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View style={{width: '10%'}} />
          <View
            style={{
              width: '40%',
            }}>
            <Text
              size={'lg'}
              color={'black3'}
              family={'h5'}
              allowFontScaling={false}>
              Age
            </Text>
            <View style={{height: 35}}>
              <TextInput
                placeholderTextColor={Colors.black1}
                style={styles.inputBox}
                onChangeText={onSetAge}
                value={age}
                placeholder="28"
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 15, paddingTop: 15}}>
          <Text
            size={'lg'}
            color={'black3'}
            family={'h5'}
            allowFontScaling={false}>
            Email Address
          </Text>
          <View style={{height: 35}}>
            <TextInput
              placeholderTextColor={Colors.black1}
              style={styles.inputBox}
              onChangeText={onSetEmail}
              value={email}
              placeholder="muzeen123@gmail.com"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View style={{marginHorizontal: 15, paddingTop: 15}}>
          <Text
            size={'lg'}
            color={'black3'}
            family={'h5'}
            allowFontScaling={false}>
            Mobile Number
          </Text>
          <View style={{height: 35}}>
            <TextInput
              placeholderTextColor={Colors.black1}
              style={styles.inputBox}
              onChangeText={onSetNumber}
              value={number}
              placeholder="+91 | 9999999999"
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={{marginHorizontal: 15, paddingTop: 15}}>
          <Text
            size={'lg'}
            color={'black3'}
            family={'h5'}
            allowFontScaling={false}>
            Address
          </Text>
          <View
            style={{
              borderBottomColor: Colors.grey,
              borderBottomWidth: 0.5,
              paddingTop: 5,
            }}>
            <Text
              style={{paddingBottom: 5}}
              size={'lg'}
              color={'black1'}
              family={'h4'}
              allowFontScaling={false}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt volutpat. exerci tation
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

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
  inputBox: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
    paddingLeft: 0,
    paddingBottom: 3,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.black1,
  },
});
