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
import AsyncApp from './containers/filter';

const loggerMiddleware = createLogger();

// let store = createStore(rootReducer);
// console.log(store.getState());
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.subscribe(() =>
  console.log(store.getState())
)
// store.dispatch(selectCategory('gaming'));
// store.dispatch(fetchArticlesIfNeeded('gaming')).then(() =>
//   console.log(store.getState())
// )
// store.subscribe(() =>
//   console.log(store.getState())
// )

ReactDOM.render(
  <Provider store={store}>
    <AsyncApp />
    {/* <App /> */}
  </Provider>,
  document.getElementById('root')
);
