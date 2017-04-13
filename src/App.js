import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {key} from './api-key.js';
// import * from './api-key.js';
// import './api-key.js';

// var key2 = key;
// console.log(key);
function ajaxResultHandler(result) {
  // var aTitle = result.articles[3].title;
  // console.log(result);
  // console.log(key);
  document.getElementById("firstImage").src = result.articles[0].urlToImage;
  document.getElementById("testing").innerHTML = result.articles[0].title;
}

class App extends Component {
  ajax(callback) {
    var aRequest = new XMLHttpRequest();

    aRequest.onreadystatechange = onReadyStateChangeHandler;

    aRequest.open("GET", "https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=" + key, true);
    aRequest.send();


    function onReadyStateChangeHandler() {
      if (aRequest.readyState === XMLHttpRequest.DONE) {
        if (aRequest.status === 200) {
          callback(JSON.parse(aRequest.responseText));
        }
      }
    }
  }

  render() {
    this.ajax(ajaxResultHandler);

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
        <img alt="Abandoned machines." id="firstImage" />
        <p id="testing"></p>
      </div>
    );
  }
}

// (function testing() {
//   theRealTest();
// })();
//
// function theRealTest() {

// }

function buttonClicker() {

}

// function ajaxResultHandler(result) {
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
// })(ajaxResultHandler);

export default App;
