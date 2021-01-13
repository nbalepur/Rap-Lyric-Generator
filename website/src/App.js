import React, { Component } from "react";

import "antd/dist/antd.css";

import Header from "./components/header.js";
import Loading from "./components/loading.js";
import Lyric from "./components/lyric.js";
import Error from "./components/error.js";

import axios from "axios";

import { dark, light } from "./themes.js";

import "./App.css";

class App extends Component {
  state = {
    lyrics: "",
    numWords: 10,
    componentState: "begin",

    theme: dark,
  };

  switchTheme = () => {
    this.setState({ theme: this.state.theme === dark ? light : dark });
    this.changeMainColor(
      this.state.theme === dark ? light.mainBG : dark.mainBG
    );
  };

  handleAPI = () => {
    let startText = document.getElementById("start-text").value.trim();

    if (startText.length === 0) {
      alert("Please fill out the field 'Starting Text' before generating text");
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

    axios
      .post("https://kanye-lyric-generator.herokuapp.com/generate", obj)
      .then((response) => {
        if (response.data === "error") {
          this.setState({ componentState: "error" });
          return;
        }

        this.setState({ lyrics: response.data });
        this.setState({ componentState: "lyrics" });
      });
  };

  getComponentFromState = () => {
    let compState = this.state.componentState;

    if (compState === "begin") {
      return "";
    }
    if (compState === "loading") {
      return <Loading theme={this.state.theme} />;
    }
    if (compState === "lyrics") {
      return <Lyric theme={this.state.theme} lyric={this.state.lyrics} />;
    }
    if (compState === "error") {
      return <Error theme={this.state.theme} />;
    }
  };

  componentDidMount() {
    this.changeMainColor(this.state.theme.mainBG);
  }

  changeMainColor = (col) => {
    document.body.style = "background: " + col;
  };

  render() {
    return (
      <div>
        <Header
          switchTheme={this.switchTheme}
          handleAPI={this.handleAPI}
          numWords={this.state.numWords}
          setNumWords={(val) => {
            this.setState({ numWords: val });
          }}
          theme={this.state.theme}
        />
        <div>
          <br></br>
          <br></br>
          {this.getComponentFromState()}
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default App;
