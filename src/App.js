import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {key} from './api-key.js';

function Filter(props) {
  return (
    <div>
    {/* <input placeholder="Search..." className="searchBar" /> */}
    <div id="filterContainer">
      <button onClick={() => props.clickHandler("technology")} id="filter1" className="filters">Technology</button>
      <button onClick={() => props.clickHandler("gaming")} id="filter2" className="filters">Gaming</button>
      <button onClick={() => props.clickHandler("science")} id="filter3" className="filters">Science</button>
    </div>
    </div>
  );
}

function Article(props) {
  if (document.getElementsByClassName("images")[0]) {
    var lol = document.getElementsByClassName("images")[0];
    console.log(lol.naturalWidth);
  }
  // console.log(prop)
  return (
    <div className="articles">
      <img src={props.image} className="images" alt="From various news sources." />
      <h3 className="titles">
        <a href={props.url} className="plainLinks" target="_blank">
          {props.title}
        </a>
      </h3>
    </div>
  )
}

function AjaxResultHandler(props) {
  var articles = [];

  if (props.result[0]) {
    var result = [];

    for (var i = 0; i < props.result.length; i++) {
      result.push(JSON.parse(props.result[i]));

      for (var k = 0; k < result[i].articles.length; k++) {
        articles.push(<Article key={articles.length} url={result[i].articles[k].url} title={result[i].articles[k].title} image={result[i].articles[k].urlToImage} />);
      }
    }
  }

  return (
    <div>
      {articles}
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      "sources": [],
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  ajax(url, stateName) {
    console.log("ajax called");
    var aRequest = new XMLHttpRequest();

    aRequest.onload = () => {
      if (stateName) {
        const anArray = this.state[stateName].slice();
        anArray.push(aRequest.responseText)
        this.setState({[stateName]: anArray});
      } else {
        this.sourceParser(aRequest.responseText);
      }
    }

    if (stateName) {
      aRequest.open("GET", url + key, true);
    } else {
      aRequest.open("GET", url, true);
    }

    aRequest.send();
  }

  sourceParser(responseText) {
    const response = JSON.parse(responseText);
    const responseSources = [];
    console.log("sourceparser called");
    for (var i = 0; i < response.sources.length; i++) {
      var firstAvailableSort = response.sources[i].sortBysAvailable[0];

      responseSources.push("https://newsapi.org/v1/articles?source=" + response.sources[i].id + "&sortBy=" + firstAvailableSort + "&apiKey=");

      this.ajax(responseSources[i], "sources");
    }
  }

  clickHandler(category) {
    const clearAll = [];
    this.setState({["sources"]: clearAll});

    if (category === "technology") {
      this.ajax("https://newsapi.org/v1/sources?category=technology");
    } else if (category === "gaming") {
      this.ajax("https://newsapi.org/v1/sources?category=gaming");
    } else if (category === "science") {
      this.ajax("https://newsapi.org/v1/sources?category=science-and-nature");
    }
  }

  render() {
    console.log("render was called");

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TextNews</h2>
        </div>

        <Filter clickHandler={this.clickHandler} />
        <AjaxResultHandler result={this.state.sources} />
      </div>
    );
  }
}

export default App;
