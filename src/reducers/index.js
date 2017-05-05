import { combineReducers } from 'redux';
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_ARTICLES, RECEIVE_ARTICLES
} from '../actions';

// function isButtonToggled(state = { aBool:true }, action) {
//   switch (action.type) {
//     case 'setFalse':
//       // console.log(state.aBool);
//       return {
//         aBool: action.theAction
//       }
//
//     default:
//       return state
//   }
// }

function selectedCategory(state = '', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function articles(state = {
  isFetching: false,
  didInvalidate: false,
  articles: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        articles: action.articles,
        lastUpdate: action.recievedAt
      })
    default:
      return state
  }
}

function articlesByCategory(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_ARTICLES:
    case REQUEST_ARTICLES:
      return Object.assign({}, state, {
        [action.category]: articles(state[action.category], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  articlesByCategory,
  selectedCategory
});

export default rootReducer;
