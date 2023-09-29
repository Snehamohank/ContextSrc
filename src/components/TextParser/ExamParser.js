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
export const ExamInput = ({ quest }) => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Text
        family={'h4'}
        size="lg"
        style={{
          color: Colors.black2,
        }}>
        {quest.question}
      </Text>
    </View>
  );
};
