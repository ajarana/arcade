import React, { PropTypes } from 'react';

export default function ProgressBar(props) {
  const { allArticlesLoaded, sourcesLoaded, totalSources, didInvalidate, selectedCategory } = props;
  let visible, width, className;
  console.log("this is props.didInvalidate");
  console.log(didInvalidate);
  console.log("this is allArticlesLoaded");
  console.log(allArticlesLoaded);
  console.log("this is sourcesLoaded");
  console.log(sourcesLoaded);
  console.log("this is totalSources");
  console.log(totalSources);
  console.log("this is selectedCategory");
  console.log(selectedCategory);
  (allArticlesLoaded) ? visible = 0 : visible = 1;

  if (totalSources && !didInvalidate) {
    className = 'progressBar';
    width = ((sourcesLoaded/totalSources)*90) + 10 + "%";
  } else {
    className = 'hiddenBar';
    width = '10%';
  }

  return (
    <div className={className + " " + selectedCategory} style={{opacity: visible, width: width}}></div>
  );
}

ProgressBar.propTypes = {
  totalSources: PropTypes.number,
  sourcesLoaded: PropTypes.number,
  allArticlesLoaded: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  selectedCategory: PropTypes.string.isRequired
}
