import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import thunkMiddleware from 'redux-thunk'
import { createLogger }  from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { selectCategory, fetchArticles } from './actions';
import rootReducer from './reducers';

// import ExampleComponent from './containers/filter';
// import { anAction } from './actions';

// function ajax() {
//   var aRequest = new XMLHttpRequest();
//
//   aRequest.onload = () => {
//     store.dispatch(anAction(aRequest.responseText));
//     console.log(store.getState());
//   }
//
//   aRequest.open("GET", "https://newsapi.org/v1/sources?language=en&category=technology", true);
//   aRequest.send();
// }

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

store.dispatch(selectCategory('technology'));
store.dispatch(fetchArticles('technology')).then(() =>
  console.log(store.getState())
)
// store.subscribe(() =>
//   console.log(store.getState())
// )

// store.dispatch(ajax());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
