import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import thunkMiddleware from 'redux-thunk'
import { createLogger }  from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { selectCategory, fetchArticlesIfNeeded } from './actions';
import rootReducer from './reducers';
import AsyncApp from './containers/Filter';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
