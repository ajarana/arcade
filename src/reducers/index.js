import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_SOURCES, RECEIVE_SOURCES,
  REQUEST_ARTICLES, RECEIVE_ARTICLES,
  ALL_ARTICLES_LOADED
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
  isFetchingSources: false,
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
        isFetchingSources: true,
        didInvalidate: false
      })
    case RECEIVE_SOURCES:
      return Object.assign({}, state, {
        isFetchingSources: false,
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
  isFetchingSetOfArticles: false,
  allArticlesLoaded: false,
  totalSources: null,
  sourcesLoaded: 0,
  articles: []
}, action) {
  switch (action.type) {
    case ALL_ARTICLES_LOADED:
      return Object.assign({}, state, {
        allArticlesLoaded: true
      })
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetchingSetOfArticles: true,
        totalSources: null,
        sourcesLoaded: 0,
        allArticlesLoaded: false
      })
    case RECEIVE_ARTICLES:
      console.log("AHHHH");
      console.log(action.articles);
      let objectified = action.articles.map(child => {return {
        source: action.source,
        title: child.title,
        url: child.url
      }});
      let concatArray = [];

      if (state.sourcesLoaded === 0) {
        concatArray = objectified;
      } else {
        concatArray = state.articles.concat(objectified);
      }

      let sourcesLoaded = state.sourcesLoaded + 1;

      return Object.assign({}, state, {
        isFetchingSetOfArticles: false,
        totalSources: action.totalSources,
        sourcesLoaded: sourcesLoaded,
        articles: concatArray
      })
    default:
      return state
  }
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

function articlesByCategory(state = {}, action) {
  switch(action.type) {
    case ALL_ARTICLES_LOADED:
    case INVALIDATE_CATEGORY:
    case RECEIVE_ARTICLES:
    case REQUEST_ARTICLES:
      // console.log("here at articlesByCategory()");
      // console.log(state);
      return Object.assign({}, state, {
        [action.category]: articles(state[action.category], action),
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sourcesByCategory,
  selectedCategory,
  articlesByCategory
});

export default rootReducer;
