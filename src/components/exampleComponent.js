import React, { PropTypes } from 'react';

const Button = ({ onClick, aBool }) => (
  <div>
    {/* {console.log("Currently at Button")}
    {console.log(aBool)} */}
    <button onClick={onClick}>
      Add Todo
    </button>
    <p>{ (aBool) ? "Button is toggled on" : "Button is toggled off" }</p>
  </div>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Button;
