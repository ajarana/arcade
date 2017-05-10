import React, { PropTypes, Component } from 'react';

export default function Sources(props) {
  return (
    <ul>
      {props.articles.map((child, i) =>
        <li key={i}>{child.title}</li>
      )}
    </ul>
  )

}

Sources.propTypes = {
  sources: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired
}
