import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_SOURCES, RECEIVE_SOURCES,
  REQUEST_ARTICLES, RECEIVE_ARTICLES
} from '../actions';

function selectedCategory(state = 'technology', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function sources(state = {
  isFetching: false,
  didInvalidate: false,
  // items: []
  sources: []
}, action) {
  // console.log("NO, I HAVE BEEN ACTIVATED, SIRE");
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_SOURCES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_SOURCES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        // items: action.sources,
        sources: action.sources,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function articles(state = {
  isFetching: false,
  items: []
}, action) {
  // console.log("At articles()");
  // console.log(state.items);
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.articles,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
function articles(totalArticles, otherArticles, source, action) {
  let objectified = otherArticles.map(child => {return {
    source: source,
    title: child
  }});
  let concatArray = totalArticles.concat(objectified);
  return concatArray;

  // switch(action.type) {
  //   case RECEIVE_ARTICLES:
  //     return concatArray
  //   default:
  //     return []
  // }
}

function sourcesByCategory(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_SOURCES:
    case REQUEST_SOURCES:
      return Object.assign({}, state, {
        [action.category]: sources(state[action.category], action),
      })
    default:
      return state
  }
}

function articlesBySources(state = {
  articles: [],
  testing: [1,2,3]
}, action) {
  switch(action.type) {
    case RECEIVE_ARTICLES:
    // case REQUEST_ARTICLES:
      console.log("here at articlesBySources()");
      // console.log(JSON.stringify(state));
      console.log(state);
      return Object.assign({}, state, {
        articles: articles(state.articles, action.articles, action.source, action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sourcesByCategory,
  selectedCategory,
  articlesBySources
});

export default rootReducer;
