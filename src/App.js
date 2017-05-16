import React, { Component } from 'react';
import './css/App.css';
import {key} from './api-key.js';
import Filter2 from './containers/Filter';
import AsyncApp from './containers/Filter';

function Filter(props) {
  return (
    <div id="filterWrapper">
    <div id="filterContainer">
      <button disabled={(props.firstStageLength) ? true : false} onClick={() => props.clickHandler("technology")} id="filter1" className={(props.firstButtonSelected) ? "filter selected1" : "filter"}>Tech</button>
      <button disabled={(props.firstStageLength) ? true : false} onClick={() => props.clickHandler("gaming")} id="filter2" className={(props.secondButtonSelected) ? "filter selected2" : "filter"}>Gaming</button>
      <button disabled={(props.firstStageLength) ? true : false} onClick={() => props.clickHandler("science-and-nature")} id="filter3" className={(props.thirdButtonSelected) ? "filter selected3" : "filter"}>Science</button>
    </div>
    </div>
  );
}

function ProgressBar(props) {
  return (
    <div id="progressBarWrapper" style={{opacity: (props.currentlyLoading) ? 1 : 0}}>
      <div id="progressBar1" className={(props.currentlyLoading) ? ("progressBar "+props.currentCategory) : ("hiddenBar "+props.currentCategory)} style={{width: (props.firstStageLength) ? props.firstStageLength + "%" : 0}}>
      </div>

      <div id="progressBar2" className={(props.currentlyLoading) ? ("progressBar "+props.currentCategory) : ("hiddenBar "+props.currentCategory)} style={{width: (props.actualLength/(props.totalLength)) ? (props.actualLength)/(props.totalLength)*80+"%" : '50%'}}>
      </div>
    </div>
  );
}

function Article(props) {
  var background = ((props.number % 2 === 0)) ? "background-white" : "background-grey";
  return (
    <div className={"article "+background}>
      <div className="titleWrapper">
        <span className="numbering">{props.number}</span>
        <h3 className="titles">
          <a href={props.url} className="plainLinks" target="_blank">
            {props.title}
          </a>
        </h3>
      </div>
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
        articles.push(<Article key={articles.length} number={articles.length+1} url={result[i].articles[k].url} title={result[i].articles[k].title} image={result[i].articles[k].urlToImage} />);
      }
    }
  }
  // console.log("AjaxResultHandler articles.length: ");
  // console.log(articles.length);
  return (
    <div>
      {/* <ProgressBar totalLength={props.totalLength} actualLength={props.actualLength} fakeLength={100} /> */}
      {articles}
    </div>
  );
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      "currentlyLoading": false,
      "sources": [],
      "totalSourcesLoaded": null,
      "actualSourcesLoaded": 0,
      "firstStageLength": null,
      "firstButtonSelected": true,
      "currentCategory": null,
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.clickHandler("technology");
  }

  ajax(url, stateName) {
    // console.log("ajax called with: "+url);
    // console.log(url);
    var aRequest = new XMLHttpRequest();

    aRequest.onload = () => {
      if (stateName) {
        const anArray = this.state[stateName].slice();
        anArray.push(aRequest.responseText)

        this.setState((prevState) => {
          return {[stateName]: anArray, "actualSourcesLoaded": prevState.actualSourcesLoaded + 1}
        });
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

    this.setState({"totalSourcesLoaded": response.sources.length});

    for (var i = 0; i < response.sources.length; i++) {
      var firstAvailableSort = response.sources[i].sortBysAvailable[0];

      responseSources.push("https://newsapi.org/v1/articles?source=" + response.sources[i].id + "&sortBy=" + firstAvailableSort + "&apiKey=");

      // this.setState({"totalSourcesLoaded": response.sources.length, "actualSourcesLoaded": i+1});
      this.ajax(responseSources[i], "sources");
    }
    // console.log("HERE I AM");
    // console.log(response.sources.length);
    // console.log(response.sources);
  }

  // shouldComponentUpdate() {
  //   return this.state["sources"].length > 0;
  // }
  componentDidUpdate() {
    // console.log("componentdidupdate called");
    if (this.state.actualSourcesLoaded === this.state.totalSourcesLoaded && this.state.currentlyLoading === false) {
      setTimeout(() => {
        // console.log("FIRST SETTIMEOUT");
        this.setState({"totalSourcesLoaded": null, "actualSourcesLoaded": 0, "firstStageLength": 0})
      }, 200);
    }
    else if (this.state.actualSourcesLoaded === this.state.totalSourcesLoaded) {
      setTimeout(() => {
        // console.log("SECOND SETTIMEOUT");
        this.setState({"currentlyLoading": false})
      }, 500);
    }
  }

  clickHandler(category) {
    // console.log("clickhandler called");
    if (category === "technology") {
      this.setState({"currentlyLoading": true, "loadingAnimationNotRunning": false, "sources": [], "firstStageLength": 20, "firstButtonSelected": true, "secondButtonSelected": false, "thirdButtonSelected": false, "currentCategory": category});
    }
    else if (category === "gaming") {
      this.setState({"currentlyLoading": true, "loadingAnimationNotRunning": false, "sources": [], "firstStageLength": 20, "firstButtonSelected": false, "secondButtonSelected": true, "thirdButtonSelected": false, "currentCategory": category});
    } else {
      this.setState({"currentlyLoading": true, "loadingAnimationNotRunning": false, "sources": [], "firstStageLength": 20, "firstButtonSelected": false, "secondButtonSelected": false, "thirdButtonSelected": true, "currentCategory": category});
    }

    // this.setState({"currentlyLoading": true, "loadingAnimationNotRunning": false, "sources": [], "firstStageLength": 20, "firstButtonSelected": true});

    this.ajax("https://newsapi.org/v1/sources?language=en&category=" + category);
  }

  loadHandler() {
    console.log("rofl");
  }

  render() {
    // console.log("render called with this.state.sources.length as: ")
    // console.log(this.state.sources.length);
    // // console.log("render called with this.state.sources as: ")
    // // console.log(this.state.sources);
    // console.log("render called with this.state.totalSourcesLoaded as: ")
    // console.log(this.state.totalSourcesLoaded);
    // console.log("first stage length is: ");
    // console.log(this.state.firstStageLength);
    return (
      <div className="App">
        <div id="contentWrapper">
        <AsyncApp />

        {/* <Filter clickHandler={this.clickHandler} firstStageLength={this.state.firstStageLength} firstButtonSelected={this.state.firstButtonSelected} secondButtonSelected={this.state.secondButtonSelected} thirdButtonSelected={this.state.thirdButtonSelected} /> */}

        {/* <ProgressBar totalLength={this.state.totalSourcesLoaded} actualLength={this.state.sources.length} fakeLength={100} /> */}
        {/* <ProgressBar totalLength={this.state.totalSourcesLoaded} actualLength={this.state.actualSourcesLoaded} firstStageLength={this.state.firstStageLength} currentlyLoading={this.state.currentlyLoading} currentCategory={this.state.currentCategory} /> */}

        {/* <AjaxResultHandler result={this.state.sources} /> */}
        </div>
      </div>
    );
  }
}

export default App;
