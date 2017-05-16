import React, { PropTypes } from 'react';

export default function Picker(props) {
  const { onClick, selectedCategory } = props;

  return (
    <div id="filterContainer">
      <div id="filterButtonWrapper">
        <button className={(selectedCategory === 'technology') ? 'filter selected ' + selectedCategory : 'filter'} onClick={() => onClick('technology')}>Tech</button>
        <button className={(selectedCategory === 'gaming') ? 'filter selected ' + selectedCategory : 'filter'} onClick={() => onClick('gaming')}>Gaming</button>
        <button className={(selectedCategory === 'science-and-nature') ? 'filter selected ' + selectedCategory : 'filter'} onClick={() => onClick('science-and-nature')}>Science</button>
        {/* <button className={(selectedCategory === 'business') ? 'filter selected ' + selectedCategory : 'filter'} onClick={() => onClick('business')}>Business</button> */}
    </div>
    </div>
  );
}

Picker.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired
}
