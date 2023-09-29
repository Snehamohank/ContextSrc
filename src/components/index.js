import {createSelector} from 'reselect';
import {Dimensions, PixelRatio, ActivityIndicator, View} from 'react-native';

export {MultiTapHandler} from './MultiTapHandler';

const {width, height} = Dimensions.get('screen');

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const smaller_size = height < width ? height : width;

export const normalizeFont = createSelector([state => state], size => {
  return size * (smaller_size * 0.0025);
});

const wp = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const hp = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export {wp, hp};

export const Loader = ({color = '#5858C4', size = 'large'}) => {
  return (
    <>
      <ActivityIndicator color={color} size={size} />
    </>
  );
};

export const MainLoader = ({color = '#5858C4', size = 'large'}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

// export {SearchInput} from './SearchInput';
