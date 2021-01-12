import React, { Component } from "react";

import { Row, Col, Input, Slider, Checkbox, Button } from "antd";

class Header extends Component {
  state = {};

  render() {
    return (
      <div style={{ backgroundColor: "lightgrey" }}>
        <br></br>
        <br></br>
        <Row>
          <Col md={2}></Col>
          <Col md={14}>
            <div>
              <h1 style={{ fontSize: 45 }}>Kanye West Lyric Generator</h1>
            </div>
            <div>
              <h1 style={{ fontSize: 25, marginTop: -20 }}>
                Fill out the information below to generate your own lyrics!
              </h1>
            </div>
          </Col>

          <Col md={24}>
            <br></br>
          </Col>

          <Col md={2}></Col>
          <Col md={10}>
            <label style={{ fontSize: 18 }}>Starting Text</label>
            <Input
              id="start-text"
              style={{ marginTop: 5 }}
              size="large"
              placeholder="'To the', 'I would', 'Kanye West', etc."
            />
          </Col>
          <Col md={12}></Col>

          <Col md={24}>
            <br></br>
          </Col>

          <Col md={2}></Col>
          <Col md={10}>
            <label style={{ fontSize: 18 }}>
              Number of Words: {this.props.numWords}
            </label>
            <Slider
              defaultValue={10}
              min={5}
              max={25}
              onChange={this.props.setNumWords}
            />
          </Col>
          <Col md={12}></Col>

          <Col md={24}>
            <br></br>
          </Col>

          <Col md={2}></Col>
          <Col md={4}>
            <Checkbox id="censor" style={{ fontSize: 18 }}>
              Censor Words?
            </Checkbox>
          </Col>
          <Col md={4}>
            <Checkbox id="randomize" style={{ fontSize: 18 }}>
              Randomize?
            </Checkbox>
          </Col>
          <Col md={2} offset={1}>
            <Button type="primary" size="large" onClick={this.props.handleAPI}>
              Generate
            </Button>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Header;
