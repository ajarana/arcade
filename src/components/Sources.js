import React, { PropTypes, Component } from 'react';

export default class Sources extends Component {
  render() {
    return (
      <ul>
        {this.props.sources.map((source, i) =>
          <li key={i}>{source}</li>
        )}
      </ul>
    )
  }
}

Sources.propTypes = {
  sources: PropTypes.array.isRequired
}
