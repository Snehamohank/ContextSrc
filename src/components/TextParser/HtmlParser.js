import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { IMAGEPOINT } from '../../store/Endpoints';
import RenderHtml from 'react-native-render-html';
import { wp } from '../../utils/ScreenResolutionHandler';


const defaultOptions = {
  messageStyle: 'none',
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      'AMSmath.js',
      'AMSsymbols.js',
      'noErrors.js',
      'noUndefined.js',
    ],
  },
};

const TextParser = (props) => {
  useEffect(() => {}, [props.html]);

  var html = props.html
    .replace(/!\[([^\]]*)]\(([^(]+)\)/g, '<img src=$2>')
    .replace(/img src=\//g, `img src=${IMAGEPOINT}/`);

  console.log(html, 'html');

  return (
    <View style={{ marginVertical: 5 }}>
      <RenderHtml
        containerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        contentWidth={wp(80)}
        source={{ html: html }}
        // html={html}
      />
    </View>
  );
};

export default TextParser;
