import { key } from '../api-key.js';

export const REQUEST_SOURCES = 'REQUEST_SOURCES'
export const RECEIVE_SOURCES = 'RECEIVE_SOURCES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}

function requestSources(category) {
  return {
    type: REQUEST_SOURCES,
    category
  }
}

function receiveSources(category, json) {
  return {
    type: RECEIVE_SOURCES,
    category,
    sources: json.sources.map(child => {return child.id}),
    receivedAt: Date.now()
  }
}

function receiveArticles(json) {
  for (let i = 0; i < json.articles.length; i++) {
    // console.log(json.articles[i].title);
  }
  // return {
  //
  // }
}

function fetchArticles(sources) {
  // console.log("Hello, Andres. fetchArticles() has been called.");
  // console.log(sources);
  for (let i = 0; i < sources.length; i++) {
    fetch(`https://newsapi.org/v1/articles?source=${sources[i]}` + '&apiKey=' + key).then(response => response.json()).then(json => receiveArticles(json));
  }
}

function fetchSources(category) {
  return dispatch => {
    dispatch(requestSources(category))
    return fetch(`https://newsapi.org/v1/sources?language=en&category=${category}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSources(category, json))).then(obj => fetchArticles(obj.sources));
  }
}

function shouldFetchSources(state, category) {
  const sources = state.sourcesByCategory[category]
  if (!sources) {
    return true
  } else if (sources.isFetching) {
    return false
  } else {
    return sources.didInvalidate
  }
}

export function fetchSourcesIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchSources(getState(), category)) {
      return dispatch(fetchSources(category))
    }
  }
}
