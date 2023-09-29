/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useRef} from 'react';
import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

const Meeting = ({route, navigation}) => {
  const {room} = route.params;
  const jitsiMeeting = useRef(null);

  const onReadyToClose = useCallback(() => {
    navigation.navigate('Home');
    jitsiMeeting.current.close();
  }, [navigation]);

  const eventListeners = {
    onReadyToClose,
  };

  console.log(room, 'roooooom');

  return (
    // @ts-ignore
    <JitsiMeeting
      eventListeners={eventListeners}
      flags={{
        'invite.enabled': false,
        'kick-out.enabled': false,
      }}
      ref={jitsiMeeting}
      style={{flex: 1}}
      room={room}
      serverURL={'https://meet.jit.si/'}
    />
  );
};

export default Meeting;
