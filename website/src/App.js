import React, { Component } from "react";

import "antd/dist/antd.css";

import Header from "./components/header.js";
import Loading from "./components/loading.js";
import Lyric from "./components/lyric.js";
import Error from "./components/error.js";

import axios from "axios";

class App extends Component {
  state = {
    lyrics: "",
    numWords: 10,
    componentState: "begin",
  };

  handleAPI = () => {
    let startText = document.getElementById("start-text").value.trim();

    if (startText.length === 0) {
      alert("Please fill out the field 'Starting Text' before generating");
      return;
    }

    this.setState({ componentState: "loading" });

    let numWords = this.state.numWords;
    let censor = document.getElementById("censor").checked;
    let randomize = document.getElementById("randomize").checked;

    let obj = {
      start_text: startText,
      censor: censor,
      num_words: numWords,
      use_random: randomize,
    };

    axios.post("http://127.0.0.1:5000/generate", obj).then((response) => {
      this.setState({ componentState: "lyrics" });
      this.setState({ lyrics: response.data });
    });
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
      return <Lyric lyric={this.state.lyrics} />;
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
          {this.getComponentFromState()}
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default App;
