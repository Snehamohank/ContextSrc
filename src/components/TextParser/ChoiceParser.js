/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import TextParser from './TextParser';
import HtmlParser from './HtmlParser';
import RenderHtml from './RenderHtml/src/index';
import { Colors } from '../../utils/Colors';
import { Text } from '../../utils/fontfamily';
import { IMAGEPOINT } from '../../store/Endpoints';
import { wp } from '../../utils/ScreenResolutionHandler';

// create a component
export const ChoiceInput = ({ quest, ans, current_index }) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 10,
        paddingVertical: 5,
      }}>
      <Text family={'h5'} size={'lg'} color={'black3'}>
        {ans.text}
      </Text>
    </View>
  );
};
