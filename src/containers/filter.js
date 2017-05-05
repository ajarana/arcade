// import React from 'react';
import { anAction } from '../actions';
import { connect } from 'react-redux';
import Button from '../components/exampleComponent'

// const mapStateToProps = (state) => {
//   // console.log("currently at mapStateToProps");
//   // console.log(state.isButtonToggled.aBool);
//   return {
//     aBool: state.isButtonToggled.aBool
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onClick: () => {
//       dispatch(anAction(false));
//     }
//   }
// }
//
// const OurConnector = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Button);

export default OurConnector;
