import React, { Component } from "react";

import { Row, Col } from "antd";

import Kanye from "../images/kanye.png";

class Lyric extends Component {
  state = {};

  componentDidMount() {
    this.typeWriter(0);
  }

  typeWriter = (index) => {
    let lyric = this.props.lyric;

    if (index >= lyric.length) {
      return;
    }

    if (
      document.getElementById("lyric") === null ||
      document.getElementById("lyric") === undefined
    ) {
      return;
    }

    document.getElementById("lyric").innerHTML += lyric.charAt(index);
    setTimeout(() => {
      this.typeWriter(index + 1);
    }, 50);
  };

  render() {
    return (
      <Row justify="middle">
        <Col md={2}></Col>
        <Col md={4}>
          <img
            alt="kanye"
            src={Kanye}
            style={{
              width: 200,
              height: 200,
              border: "3px solid " + this.props.theme.primary,
              borderRadius: "50%",
            }}
          ></img>
        </Col>
        <Col md={1}></Col>
        <Col md={15}>
          <div
            id="textbox"
            style={{
              backgroundColor: this.props.theme.primary,

              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 50,
              paddingBottom: 50,
              borderRadius: 15,
            }}
          >
            <h1 id="lyric" style={{ color: "black" }}>
              {""}
            </h1>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

export default Lyric;
