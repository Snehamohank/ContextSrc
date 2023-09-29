/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import {Text} from '../../utils/fontfamily';
import {Colors} from '../../utils/Colors';
import {wp} from '../../utils/ScreenResolutionHandler';
import {ENDPOINT, UserContext} from '../../store/UserContext';
import axios from 'axios';
import {MultiTapHandler} from '../../components/MultiTapHandler';
import {Loader} from '../../components';
import {CheckCircle, EyesOpen} from '../../assets/svg';

const Login = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [hidden, sethidden] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const passwordInput = useRef(null);

  const {signIn, showToast} = useContext(UserContext);

  const login = () => {
    setloading(true);
    let data = {
      username: username,
      password: password,
    };
    console.log(`${ENDPOINT}/user/login/`, data, 'repobody');
    axios
      .post(`${ENDPOINT}/user/login/`, data, {
        timeout: 10000,
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          console.log('Login res', data);
          if (data.status) {
            signIn({
              token: data.token,
              session_data: data.session_data,
              // profile: data.profile,
            });
          } else {
            showToast(data.reason);
          }
          setloading(false);
        } else {
          showToast('Something went wrong');
          setloading(false);
        }
      })
      .catch(error => {
        console.log(error);
        showToast('Something went wrong');
        setloading(false);
      });
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Image
              resizeMode="contain"
              style={{height: wp(30), width: wp(30), marginVertical: '5%'}}
              source={require('../../assets/PNG/dlclogo.png')}
            />
          </View>
          <View
            style={{
              paddingBottom: '10%',
              width: '100%',
              paddingHorizontal: 30,
            }}>
            <Text size={'xxxl'} family={'h3'} color={'black'}>
              Welcome back
            </Text>
            <Text
              style={{paddingTop: 15}}
              size={'lg'}
              family={'h5'}
              color={'grey'}>
              Lorem ipsum dolor sit amet consectetur. Volutpat facilisi diam
              rutrum elementum nunc. In fringilla nisi lorem sit lacus.
            </Text>
          </View>
          <View
            style={{
              flex: 1.5,
              width: '100%',
              paddingHorizontal: 10,
            }}>
            <View style={{paddingBottom: 30}}>
              <View
                style={{width: '100%', marginBottom: 10, marginHorizontal: 20}}>
                <Text family={'h4'} size={'xl'} color={'black'} style={{}}>
                  Username
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 8,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  backgroundColor: Colors.lightwhite,
                }}>
                <TextInput
                  value={username}
                  onChangeText={text => setUsername(text)}
                  placeholder="Input your username"
                  placeholderTextColor={Colors.lightgrey}
                  keyboardType="default"
                  returnKeyType="next"
                  style={{
                    height: 45,
                    width: '100%',
                    flex: 8,
                    fontSize: 16,
                    color: 'black',
                    fontFamily: 'AirbnbCereal-Book',
                    backgroundColor: Colors.lightwhite,
                    borderRadius: 10,
                    paddingLeft: 15,
                  }}
                />
                <View style={{marginRight: 15}}>
                  <CheckCircle height={18} width={18} />
                </View>
              </View>
            </View>
            <View style={{paddingBottom: 30}}>
              <View
                style={{width: '100%', marginBottom: 10, marginHorizontal: 20}}>
                <Text family={'h4'} size={'xl'} color={'black'} style={{}}>
                  Password
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 8,
                  marginHorizontal: 20,
                  alignItems: 'center',
                  backgroundColor: Colors.lightwhite,
                }}>
                <TextInput
                  ref={passwordInput}
                  secureTextEntry={hidden}
                  returnKeyType="done"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder="Input your password"
                  placeholderTextColor={Colors.lightgrey}
                  style={{
                    height: 45,
                    width: '100%',
                    color: 'black',
                    flex: 8,
                    fontSize: 16,
                    fontFamily: 'AirbnbCereal-Book',
                    backgroundColor: Colors.lightwhite,
                    borderRadius: 10,
                    paddingLeft: 15,
                  }}
                  onSubmitEditing={() => {
                    MultiTapHandler(login());
                  }}
                />
                <TouchableOpacity
                  onPress={() => sethidden(!hidden)}
                  style={{
                    // backgroundColor: 'red',
                    height: 45,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                  }}>
                  {hidden ? (
                    <EyesOpen height={22} width={22} />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={{height: 22, width: 22}}
                      source={require('../../assets/PNG/hidepass.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <TouchableOpacity
                // onPress={() => navigation.navigate('Home')}
                onPress={() => MultiTapHandler(login())}
                style={{
                  marginTop: '10%',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.darkBlue,
                    height: 50,
                    marginHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                  }}>
                  {loading ? (
                    <Loader color="#fff" size="small" />
                  ) : (
                    <Text family={'h4'} size={'xxl'} color={'white'} style={{}}>
                      Log In
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightwhite,
    borderRadius: 5,
    height: 45,
    fontSize: 13,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
