import React, { PropTypes } from 'react';

export default function Sources(props) {
  return (
    <div>
      {props.articles.map((child, i) => {
        let background;
        (i % 2 === 0) ? background = "background-grey" : background = "background-white";

        return <div key={i} className={"article " + background}>
          <div className="titleWrapper">
            <span className="numbering">{i + 1}</span>
            <h3 className="titles">
              <a href={child.url} className="plainLinks" target="_blank">{child.title}</a>
            </h3>
          </div>
          <div className="articleSource">{child.source}</div>
        </div>
        }
      )}
    </div>
  )
}

Sources.propTypes = {
  sources: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired
}
