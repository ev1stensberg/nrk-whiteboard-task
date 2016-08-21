import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import View from './containers/View';
import { meta } from './core/reducers/populateReducer';
import { render } from 'react-dom';

const Root = () =>
  (<Provider store={createStore(meta, applyMiddleware(thunk))}>
    <View />
  </Provider>);

render(
  <Root />,
  document.getElementById('root')
);
