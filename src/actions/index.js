import { key } from '../api/api-key.js';

export const REQUEST_SOURCES = 'REQUEST_SOURCES';
export const RECEIVE_SOURCES = 'RECEIVE_SOURCES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY';

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';

export const ALL_ARTICLES_LOADED = 'ALL_ARTICLES_LOADED';

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

export function allArticlesAreLoaded(category) {
  return {
    type: ALL_ARTICLES_LOADED,
    category
  }
}

function requestSources(category) {
  return {
    type: REQUEST_SOURCES,
    category
  }
}

function requestArticles(category, sources) {
  return {
    type: REQUEST_ARTICLES,
    category,
    sources
  }
}

function receiveSources(category, json) {
  return {
    type: RECEIVE_SOURCES,
    category,
    sources: json.sources.map(child => child.id),
    receivedAt: Date.now()
  }
}

function receiveArticles(category, totalSources, json) {
  return {
    type: RECEIVE_ARTICLES,
    category,
    source: json.source,
    totalSources,
    articles: json.articles
  }
}

function fetchArticles(category, sources) {
  return dispatch => {
    dispatch(requestArticles(category, sources));

    return sources.map(source => fetch(`https://newsapi.org/v1/articles?source=${source}&apiKey=` + key).then(response => response.json()).then(json => dispatch(receiveArticles(category, sources.length, json))));
  }
}

function fetchSources(category) {
  return dispatch => {
    dispatch(requestSources(category));

    return fetch(`https://newsapi.org/v1/sources?language=en&category=${category}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSources(category, json))).then(obj => dispatch(fetchArticles(category, obj.sources)));
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
