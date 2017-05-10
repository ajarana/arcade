import React, { Component, PropTypes } from 'react';

// function Filter(props) {
//   return (
//     <div id="filterWrapper">
//     <div id="filterContainer">
//       <button disabled={(props.firstStageLength) ? true : false} onClick={() => props.clickHandler("technology")} id="filter1" className={(props.firstButtonSelected) ? "filter selected1" : "filter"}>Tech</button>
//       <button disabled={(props.firstStageLength) ? true : false} onClick={() => props.clickHandler("gaming")} id="filter2" className={(props.secondButtonSelected) ? "filter selected2" : "filter"}>Gaming</button>
//       <button disabled={(props.firstStageLength) ? true : false} onClick={() => props.clickHandler("science-and-nature")} id="filter3" className={(props.thirdButtonSelected) ? "filter selected3" : "filter"}>Science</button>
//     </div>
//     </div>
//   );
// }
export default class Picker extends Component {
  render() {
    const { value, onClick, options } = this.props;

    return (
      <div id="filterWrapper">
        <div id="filterContainer">
          <button onClick={e => onClick('technology')} id="filter1">Tech</button>
          <button onClick={e => onClick('gaming')} id="filter2">Gaming</button>
          <button onClick={e => onClick('science-and-nature')} id="filter3">Science</button>
          <button onClick={e => onClick('business')} id="filter2">Business</button>
        </div>
      </div>
    );
  }
}

// export default class Picker extends Component {
//   render() {
//     const { value, onChange, options } = this.props;
//
//     return (
//       <span>
//         <h1>{value}</h1>
//         <select onChange={e => onChange(e.target.value)} value={value}>
//           {options.map(option =>
//           <option value={option} key={option}>
//             {option}
//           </option>)
//           }
//         </select>
//       </span>
//     )
//   }
// }

Picker.propTypes = {
  // options: PropTypes.arrayOf(
    // PropTypes.string.isRequired
  // ).isRequired,
  // value: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired
  onClick: PropTypes.func.isRequired
}
