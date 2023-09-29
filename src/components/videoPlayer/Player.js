/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
  AppState,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('screen');
import MediaControls, {PLAYER_STATES} from './media-controls/src';
import Orientation from 'react-native-orientation-locker';
import {IMAGEPOINT} from '../../store/Endpoints';
import {BackArrow, BatchGrey, PersonGrey} from '../../assets/svg';
import moment from 'moment';
const normalizeFont = size => {
  return size * (width * 0.0025);
};

const dev_wid = width;

class videoPlay extends React.Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      landScape: false,
      appState: AppState.currentState,
      high_quality: true,
    };
  }

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
  }

  componentWillUnmount() {
    this.appStateSubscription.remove();
    this.setState({landScape: false}, Orientation.lockToPortrait());
  }

  _handleAppStateChange = nextAppState => {
    this.setState({appState: nextAppState});
    if (nextAppState === 'active') {
      // Do something here on app active foreground mode.
      console.log('App is in Active Foreground Mode.');
    } else {
      this.setState({paused: true});
    }
  };

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onFullScreen = () => {
    if (this.state.landScape) {
      this.setState({landScape: false}, Orientation.lockToPortrait());
    } else {
      this.setState(
        {landScape: true},
        Platform.OS == 'android'
          ? Orientation.lockToLandscape()
          : Orientation.lockToLandscapeRight(),
      );
    }
  };

  onReplay = () => {
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data =>
    this.setState({duration: data.duration, isLoading: false}, () => {
      this.videoPlayer.seek(this.state.currentTime);
    });

  onLoadStart = () => this.setState({isLoading: true});

  onEnd = () =>
    this.setState(
      {playerState: PLAYER_STATES.ENDED, landScape: false},
      Orientation.lockToPortrait(),
    );

  onSeeking = currentTime => this.setState({currentTime});

  renderToolbar = () => {
    if (!this.state.landScape) {
      return (
        <View style={styles.toolbar}>
          <TouchableOpacity
            onPress={() => {
              Orientation.lockToPortrait();
              this.props.navigation.goBack();
            }}
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BackArrow height={20} width={20} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  onQuality = () => {
    this.setState(state => ({high_quality: !state.high_quality}));
  };

  render() {
    if (__DEV__) {
      // console.log(IMAGEPOINT + this.props.localVideo);
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            height: this.state.landScape
              ? dev_wid - 20
              : Platform.isPad
              ? 350
              : height / 2.5,
            marginTop: this.state.landScape ? 0 : 0,
            width: '100%',
          }}>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode="contain"
            source={{
              uri: IMAGEPOINT + this.props.localVideo,
            }}
            // source={{
            //   uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            // }}
            style={styles.mediaPlayer}
            volume={1.0}
            onPlaybackRateChange={vid => console.log('bit rate', vid)}
          />
          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor="rgba(100, 100, 100, 0.01)"
            onFullScreen={this.onFullScreen}
            // onFullScreen={this.props.fullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}
            onQuality={this.onQuality}
            isHighQuality={this.state.high_quality}>
            {this.renderToolbar()}
          </MediaControls>
        </View>

        {!this.state.landScape && (
          <View style={{flex: 1, marginTop: 15, marginHorizontal: 15}}>
            <Text>
              {moment(this.props.date, 'DD-MMM-YYYY | HH:mm A').format(
                'DD MMMM YYYY  |  hh:mm A',
              )}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  flex: 1,
                }}>
                <PersonGrey height={15} width={15} />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontFamily: 'AirbnbCereal-Small',
                      fontSize: 10,
                      color: '#0085C2',
                    }}>
                    Tutor
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontFamily: 'AirbnbCereal-Black',
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                    numberOfLines={2}>
                    {this.props.teacher}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  flex: 1,
                }}>
                <BatchGrey height={15} width={15} />
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontFamily: 'AirbnbCereal-Small',
                      fontSize: 10,
                      color: '#0085C2',
                    }}>
                    Batch
                  </Text>
                  <Text
                    style={{
                      marginTop: 5,
                      fontFamily: 'AirbnbCereal-Black',
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                    numberOfLines={2}>
                    {this.props.batch}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                marginTop: 15,
                fontFamily: 'AirbnbCereal-Small',
                fontSize: 14,
                color: 'black',
                textAlign: 'justify',
              }}>
              {this.props.description}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    height: height / 2.5,
    width: '100%',
    marginTop: 15,
  },
  toolbar: {
    backgroundColor: 'rgba(100, 100, 100, 0.01)',
    // padding: 5,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default videoPlay;
