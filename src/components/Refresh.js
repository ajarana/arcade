import React, { PropTypes } from 'react';

export default function Refresh(props) {
  let reload = document.getElementById('reload');

  if (reload) {
    reload.addEventListener('click', () => {
      reload.classList.add('move');
      setTimeout(() => reload.classList.remove('move'), 550);
    }, false);
  }

  return (
    <div id="refreshWrapper">
      <div id="reload" onClick={props.onClick}></div>
    </div>
  );
}

Refresh.propTypes = {
  onClick: PropTypes.func.isRequired
}
