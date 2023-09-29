import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const defaultOptions = {
  messageStyle: 'none',
  extensions: [
    'mml2jax.js',
    'MathMenu.js',
    'MathZoom.js',
    'AssistiveMML.js',
    'a11y/accessibility- menu.js',
  ],
  jax: ['input/MathML', 'output/CommonHTML'],
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
  const [height, setHeight] = useState(10);
  const [loading, setLoader] = useState(true);

  const handleMessage = (message) => {
    // console.log('height', Number(message.nativeEvent.data), props.html.replaceAll('&nbsp;', ''));
    setHeight(Number(message.nativeEvent.data));
    setLoader(false);
  };

  useEffect(() => {
    setHeight(10);
    setLoader(true);
  }, [props.html]);

  const wrapMathjax = (content) => {
    const options = JSON.stringify(
      Object.assign({}, defaultOptions, props.mathJaxOptions),
    );

    return `
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<script type="text/x-mathjax-config">
				MathJax.Hub.Config(${options});
				MathJax.Hub.Queue(function() {
          var height = document.documentElement.scrollHeight;
          document.getElementById("formula").style.visibility = '';
          setTimeout(() => {
            var scrollHeight = document.documentElement.clientHeight;
            window.ReactNativeWebView.postMessage(String(scrollHeight));
          }, 500);
				});
			</script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
			<div id="formula" style="visibility: hidden; background-color:rgba(0,0,0,0.0);">
				${content}
			</div>
		`;
  };

  const html = wrapMathjax(props.html.split('&nbsp;').join(''));

  // Create new props without `props.html` field. Since it's deprecated.
  const new_props = Object.assign({}, props, { html: undefined });

  return (
    <View
      style={{
        height: height,
        ...new_props.style,
        backgroundColor: 'transparent',
      }}>
      <WebView
        style={{ height: height, backgroundColor: 'transparent' }}
        androidHardwareAccelerationDisabled={true}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        onMessage={handleMessage.bind(this)}
        source={{ html }}
        {...new_props}
      />
      {loading && <ActivityIndicator size="small" />}
    </View>
  );
};

export default TextParser;
