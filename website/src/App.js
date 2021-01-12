import React, { Component } from "react";

import "antd/dist/antd.css";

import Header from "./components/header.js";
import Loading from "./components/loading.js";
import Lyric from "./components/lyric.js";
import Error from "./components/error.js";

class App extends Component {
  state = {
    lyrics: "Kanye Kanye Kanye Kanye Kanye Kanye Kanye Kanye Kanye Kanye",
    numWords: 10,
    componentState: "begin",
  };

  handleAPI = () => {
    let startText = document.getElementById("start-text").value.trim();
    let numWords = this.state.numWords;
    let censor = document.getElementById("censor").checked;
    let randomize = document.getElementById("randomize").checked;
  };

  getComponentFromState = () => {
    let compState = this.state.componentState;

    if (compState === "begin") {
      return "";
    }
    if (compState === "loading") {
      return <Loading />;
    }
    if (compState === "lyrics") {
      return <Lyric />;
    }
    if (compState === "error") {
      return <Error />;
    }
  };

  render() {
    return (
      <div>
        <Header
          handleAPI={this.handleAPI}
          numWords={this.state.numWords}
          setNumWords={(val) => {
            this.setState({ numWords: val });
          }}
        />
        <div>
          <br></br>
          <br></br>
          <Error />
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default App;
