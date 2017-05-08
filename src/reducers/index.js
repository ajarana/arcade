import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_SOURCES, RECEIVE_SOURCES
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
  items: []
}, action) {
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
        items: action.sources,
        lastUpdated: action.receivedAt
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
        [action.category]: sources(state[action.category], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sourcesByCategory,
  selectedCategory
});

export default rootReducer;
