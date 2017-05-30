import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchSourcesIfNeeded, invalidateCategory, allArticlesAreLoaded } from '../actions';
import Picker from '../components/Picker';
import Sources from '../components/Sources';
import ProgressBar from '../components/ProgressBar';
import Refresh from '../components/Refresh';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props;
    dispatch(fetchSourcesIfNeeded(selectedCategory));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, selectedCategory, allArticlesLoaded, totalSources, sourcesLoaded } = this.props;

    if (selectedCategory !== selectedCategory) {
      dispatch(fetchSourcesIfNeeded(selectedCategory))
    }

    if (sourcesLoaded === totalSources && !allArticlesLoaded) {
      setTimeout(() => dispatch(allArticlesAreLoaded(selectedCategory)), 500);

      setTimeout(() => dispatch(invalidateCategory(selectedCategory)), 750);
    }
  }

  handleClick(nextCategory) {
    // this.props.dispatch(invalidateCategory(this.props.selectedCategory))
    this.props.dispatch(selectCategory(nextCategory));
    this.props.dispatch(fetchSourcesIfNeeded(nextCategory));
  }

  handleRefreshClick(e) {
    const { dispatch, selectedCategory } = this.props;

    // e.preventDefault();

    dispatch(selectCategory(selectedCategory));
    dispatch(fetchSourcesIfNeeded(selectedCategory));
  }

  render() {
    const {
      selectedCategory,
      sources,
      articles,
      isFetchingSources,
      // lastUpdated,
      totalSources,
      sourcesLoaded,
      allArticlesLoaded,
      didInvalidate } = this.props
    return (
      <div>
        <div id="filterWrapper" className="mainContainer">
          <Picker
                onClick={this.handleClick}
                selectedCategory={selectedCategory}
          />

          <Refresh onClick={this.handleRefreshClick} />
        </div>

        <ProgressBar totalSources={totalSources} sourcesLoaded={sourcesLoaded} allArticlesLoaded={allArticlesLoaded} didInvalidate={didInvalidate} selectedCategory={selectedCategory} />

        {isFetchingSources && sources.length === 0 &&
          <h2 className="mainContainer standByMessage">Loading...</h2>
        }
        {!isFetchingSources && sources.length === 0 &&
          <h2 className="mainContainer standByMessage">Empty.</h2>
        }

        {sources.length > 0 &&
          <div style={{ opacity: isFetchingSources ? 0.5 : 1 }}>
            <Sources sources={sources} articles={articles} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
  isFetchingSources: PropTypes.bool.isRequired,
  // lastUpdated: PropTypes.number,
  totalSources: PropTypes.number,
  sourcesLoaded: PropTypes.number,
  allArticlesLoaded: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  didInvalidate: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  const { selectedCategory, sourcesByCategory, articlesByCategory } = state;
  const {
    isFetchingSources,
    // lastUpdated,
    sources,
    didInvalidate
  } = sourcesByCategory[selectedCategory] || {
    didInvalidate: false,
    isFetchingSources: true,
    sources: []
  };
  const {
    // isFetchingSetOfArticles,
    allArticlesLoaded,
    totalSources,
    sourcesLoaded,
    articles
  } = articlesByCategory[selectedCategory] || {
    // isFetchingSetOfArticles: true,
    allArticlesLoaded: false,
    totalSources: null,
    sourcesLoaded: 0,
    articles: []
  };

  return {
    selectedCategory,
    sources,
    isFetchingSources,
    // lastUpdated,
    didInvalidate,

    allArticlesLoaded,
    totalSources,
    sourcesLoaded,
    articles
  }
}

export default connect(mapStateToProps)(AsyncApp)
