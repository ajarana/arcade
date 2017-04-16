import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {key} from './api-key.js';

function Filter(props) {
  return (
    <input placeholder="Search..." className="searchBar" />
  );
}

function Article(props) {
  return (
    <div className="articles">
      <img src={props.image} className="images" alt="From ars technica." />
      <h3 className="titles">
        <a href={props.url} target="_blank">
          {props.title}
        </a>
      </h3>
    </div>
  )
}

function AjaxResultHandler(props) {
  var articles = [];

  if (props.result) {
    var result = JSON.parse(props.result);

    for (var i = 0; i < result.articles.length; i++) {
      articles.push(<Article key={i} url={result.articles[i].url} title={result.articles[i].title} image={result.articles[i].urlToImage} />);
    }
  }

  return (
    <div>
      {/* <Filter /> */}
      {articles}
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

    var techUrls = {
      arsTechnicaUrl: "https://newsapi.org/v1/articles?source=ars-technica&sortBy=top&apiKey=",
      engadgetUrl: "https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=",
      techRadarUrl: "https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=",
    }

    var gamingUrls = {
      ignUrl: "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=",
      polygonUrl: "https://newsapi.org/v1/articles?source=polygon&sortBy=top&apiKey=",
    }

    var scienceUrls = {
      newScientistUrl: "https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=",
      nationalGeographicUrl: "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=",
    }

    this.state = {
      "firstTechResult": this.ajax(techUrls.arsTechnicaUrl, "firstTechResult"),
      "secondTechResult": this.ajax(techUrls.engadgetUrl, "secondTechResult"),
      "thirdTechResult": this.ajax(techUrls.techRadarUrl, "thirdTechResult"),

      "firstGamingResult": this.ajax(gamingUrls.ignUrl, "firstGamingResult"),
      "secondGamingResult": this.ajax(gamingUrls.polygonUrl, "secondGamingResult"),

      "firstScienceResult": this.ajax(scienceUrls.newScientistUrl, "firstScienceResult"),
      "secondScienceResult": this.ajax(scienceUrls.nationalGeographicUrl, "secondScienceResult"),
    }
  }

  ajax(url, propertyName) {
    var aRequest = new XMLHttpRequest();

    aRequest.onload = () => {
      this.setState({[propertyName]: aRequest.responseText});
    }

    aRequest.open("GET", url + key, true);
    aRequest.send();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>TextNews</h2>
        </div>

        <Filter />

        <AjaxResultHandler result={this.state.firstTechResult} />
        <AjaxResultHandler result={this.state.secondTechResult} />
        <AjaxResultHandler result={this.state.thirdTechResult} />

        <AjaxResultHandler result={this.state.firstGamingResult} />
        <AjaxResultHandler result={this.state.secondGamingResult} />

        <AjaxResultHandler result={this.state.firstScienceResult} />
        <AjaxResultHandler result={this.state.secondScienceResult} />
      </div>
    );
  }
}

export default App;
