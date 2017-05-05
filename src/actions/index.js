import fetch from 'isomorphic-fetch';

export function anAction(theAction) {
  return {
    type: 'setFalse',
    theAction
  }
}

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

//refresh to update
export function invalidatecategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'

function requestArticles(category) {
  return {
    type: REQUEST_ARTICLES,
    category
  }
}

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'

function receiveArticles(category, json) {
  return {
    type: RECEIVE_ARTICLES,
    category,
    articles: json.sources.map(child => child.id),
    receivedAt: Date.now()
  }
}

export function fetchArticles(category) {
  return function (dispatch) {
    dispatch(requestArticles(category))

    return fetch(`https://newsapi.org/v1/sources?language=en&category=${category}`).then(response => response.json()).then(json =>
      dispatch(receiveArticles(category, json))
      // {console.log("Hello, Andres. Here is json:")+console.log(json)}
    )
  }
}
