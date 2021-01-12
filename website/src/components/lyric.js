import React, { Component } from "react";

import { Row, Col } from "antd";

import Kanye from "../images/kanye.png";

class Lyric extends Component {
  state = {};
  render() {
    return (
      <Row justify="middle">
        <Col md={2}></Col>
        <Col md={4}>
          <img src={Kanye} style={{ width: 200, height: 200 }}></img>
        </Col>
        <Col md={1}></Col>
        <Col
          md={15}
          style={{
            backgroundColor: "lightgray",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 50,
            paddingBottom: 50,
            borderRadius: 15,
          }}
        >
          <h1>{this.props.lyric}</h1>
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

export default Lyric;
