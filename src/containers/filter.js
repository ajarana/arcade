import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchSourcesIfNeeded, invalidateCategory } from '../actions'
import Picker from '../components/Picker'
import Sources from '../components/Sources'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    // console.log("Hello, Andres. The value for 'this.props.sources' at 'componentDidMount()' is:");
    // console.log(this.props.sources);
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchSourcesIfNeeded(selectedCategory))
  }

  componentDidUpdate(prevProps) {
    // console.log("Hello, Andres. The value for 'this.props.sources' at 'componentDidUpdate()' is:");
    // console.log(this.props.sources);
    if (this.props.selectedCategory !== prevProps.selectedCategory) {
      const { dispatch, selectedCategory } = this.props
      dispatch(fetchSourcesIfNeeded(selectedCategory))
    }
  }

  handleChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(fetchSourcesIfNeeded(nextCategory))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedCategory } = this.props
    dispatch(invalidateCategory(selectedCategory))
    dispatch(fetchSourcesIfNeeded(selectedCategory))
  }

  render() {
    const { selectedCategory, sources, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Picker value={selectedCategory}
                onChange={this.handleChange}
                options={[ 'technology', 'gaming' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && sources.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && sources.length === 0 &&
          <h2>Empty.</h2>
        }
        {sources.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Sources sources={sources} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  // console.log('THIS IS STATE');
  // console.log(state);
  const { selectedCategory, sourcesByCategory } = state
  const {
    isFetching,
    lastUpdated,
    items: sources
    // items: articles
  } = sourcesByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
  if (sourcesByCategory[selectedCategory]) {
    // console.log("hello");
    // console.log(sourcesByCategory[selectedCategory].items);
  }
  return {
    selectedCategory,
    sources,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
