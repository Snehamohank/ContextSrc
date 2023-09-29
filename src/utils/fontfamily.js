import React from 'react';
import {Platform, Text as TEXT} from 'react-native';
import {Colors} from '../utils/Colors';

const getFontSize = size => {
  switch (size) {
    case 'xs':
      return 8;
    case 'sm':
      return 10;
    case 'md':
      return 12;
    case 'lg':
      return 14;
    case 'xl':
      return 16;
    case 'xxl':
      return 18;
    case 'xxxl':
      return 24;
    case 'xxxxl':
      return 32;
    default:
      return 12;
  }
};

const getFontFamily = family => {
  switch (family) {
    case 'h1':
      return Platform.OS == 'android'
        ? 'AirbnbCereal-Black'
        : 'AirbnbCerealApp-Black';
    case 'h2':
      return Platform.OS == 'android'
        ? 'AirbnbCereal-ExtraBold'
        : 'AirbnbCerealApp-ExtraBold';
    case 'h3':
      return Platform.OS == 'android'
        ? 'AirbnbCereal-Bold'
        : 'AirbnbCerealApp-Bold';
    case 'h4':
      return Platform.OS == 'android'
        ? 'AirbnbCereal-Medium'
        : 'AirbnbCerealApp-Medium';
    case 'h5':
      return Platform.OS == 'android'
        ? 'AirbnbCereal-Book'
        : 'AirbnbCerealApp-Book';
    case 'h6':
      return Platform.OS == 'android'
        ? 'AirbnbCereal-Light'
        : 'AirbnbCerealApp-Light';
    default:
      return Platform.OS == 'android'
        ? 'AirbnbCereal-Medium'
        : 'AirbnbCerealApp-Medium';
  }
};

const getFontColor = color => {
  switch (color) {
    case 'black':
      return Colors.black;
    case 'white':
      return Colors.white;
    case 'lightwhite':
      return Colors.lightwhite;
    case 'lighterwhite':
      return Colors.lighterwhite;
    case 'lightblack':
      return Colors.lightblack;
    case 'matteblack':
      return Colors.matteblack;
    case 'lightblue':
      return Colors.lightblue;
    case 'blue':
      return Colors.blue;
    case 'darkblue':
      return Colors.darkblue;
    case 'lighterred':
      return Colors.lighterred;
    case 'lightred':
      return Colors.lightred;
    case 'red':
      return Colors.red;
    case 'grey':
      return Colors.grey;
    case 'green':
      return Colors.green;
    case 'lightgreen':
      return Colors.lightgreen;
    case 'orange':
      return Colors.orange;
    case 'lightblack':
      return Colors.lightblack;
    case 'orange':
      return Colors.orange;
    case 'lightblue':
      return Colors.lightblue;
    case 'darkBlue':
      return Colors.darkBlue;
    case 'secondBlue':
      return Colors.secondBlue;
    case 'lightPurple':
      return Colors.lightPurple;
    case 'purple':
      return Colors.purple;
    case 'lightSkyBlue':
      return Colors.lightSkyBlue;
    case 'lightPink':
      return Colors.lightPink;
    case 'darkPink':
      return Colors.darkPink;

    case 'edit':
      return '#1375D6';
    default:
      return Colors.black;
  }
};

export const Text = ({
  size,
  style,
  family,
  numberOfLines = null,
  children,
  color,
}) => (
  <TEXT
    style={[
      {
        fontFamily: getFontFamily(family),
        fontSize: getFontSize(size),
        color: getFontColor(color),
      },
      style,
    ]}
    numberOfLines={numberOfLines}>
    {children}
  </TEXT>
);
