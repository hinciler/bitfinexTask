import React from 'react';
import {Text, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import Index from './src/routers';
import {store} from './src/state/store';

LogBox.ignoreAllLogs();

//ios font size
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

const App = () => {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
};
export default App;
