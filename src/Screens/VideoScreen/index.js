/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Player from '../../components/videoPlayer/Player';

const VideoScreen = ({navigation, route}) => {
  const {data} = route.params;
  return (
    <View style={{flex: 1}}>
      <Player
        navigation={navigation}
        localVideo={data.uploaded_file}
        title={data.title}
        teacher={data.teacher_name}
        batch={data.batch_name}
        date={data.start_at}
        description={data.description}
      />
    </View>
  );
};

export default VideoScreen;
