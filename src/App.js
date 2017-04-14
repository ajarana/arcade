import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {key} from './api-key.js';

function AjaxResultHandler(props) {
  // document.getElementById("firstImage").src = result.articles[0].urlToImage;
  // document.getElementById("testing").innerHTML = result.articles[0].title;
  console.log("AjaxResultHandler called with "+props);

  var aDescription = props.result;
  return (
    <div>
      <img alt="Abandoned machines." id="firstImage" />
      <p id="testing">{aDescription}</p>
    </div>
  );
}

class App extends Component {
  constructor() {
    console.log("constructor in App called");
    super();

    this.state = {result: this.ajax(AjaxResultHandler)};
    console.log(this.state.result);
  }


  ajax(callback) {
    var aRequest = new XMLHttpRequest();
    console.log("ajax(callback) was called");
    aRequest.onreadystatechange = () => {
      if (aRequest.readyState === XMLHttpRequest.DONE) {
        if (aRequest.status === 200) {
          var parsedData = JSON.parse(aRequest.responseText);
          var aTitle = parsedData.articles[0].title;
          var anImage = parsedData.articles[0].urlToImage;

          this.setState({result: aTitle});
        }
      }
    }

    aRequest.open("GET", "https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=" + key, true);
    aRequest.send();
  }

  render() {
    console.log("render in App was called");
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => buttonClicker()}>just click me</button>
        <AjaxResultHandler result={this.state.result} />
      </div>
    );
  }
}
// <AjaxResultHandler result={this.state.result} />

// (function testing() {
//   theRealTest();
// })();
//
// function theRealTest() {

// }

function buttonClicker() {

}

// function AjaxResultHandler(result) {
//   // var aTitle = result.articles[3].title;
//   console.log(result);
//   // document.getElementById("firstImage").src = result.articles[0].urlToImage;
//   document.getElementById("testing").innerHTML = result.articles[0].title;
// }

// (function ajax(callback) {
//   var aRequest = new XMLHttpRequest();
//
//   aRequest.onreadystatechange = onReadyStateChangeHandler;
//
//   aRequest.open("GET", "https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=" + key, true);
//   aRequest.send();
//
//
//   function onReadyStateChangeHandler() {
//     if (aRequest.readyState === XMLHttpRequest.DONE) {
//       if (aRequest.status === 200) {
//         callback(JSON.parse(aRequest.responseText));
//       }
//     }
//   }
// })(AjaxResultHandler);

export default App;
