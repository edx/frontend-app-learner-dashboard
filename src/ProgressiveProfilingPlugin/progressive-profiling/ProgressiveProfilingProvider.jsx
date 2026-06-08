import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'ProgressiveProfilingPlugin/pp-redux-data/configureStore';
import ProgressiveProfiling from './ProgressiveProfiling';

const PPProvider = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <ProgressiveProfiling />
    </Provider>
  );
};

export default PPProvider;
