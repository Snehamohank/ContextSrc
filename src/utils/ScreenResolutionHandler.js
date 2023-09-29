import {Dimensions, PixelRatio} from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

let ratio =
  Math.round(
    (752 / PixelRatio.getPixelSizeForLayoutSize(screenWidth) + Number.EPSILON) *
      100,
  ) / 100;

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

const px = dpValue => {
  // convert dp to pixel with ratio.
  return PixelRatio.roundToNearestPixel(dpValue / 1.77);
};

// console.warn(screenWidth);

export {wp, hp, px};
