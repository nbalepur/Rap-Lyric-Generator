import React, { Component } from "react";

import { Row, Col, Input, Slider, Checkbox, Button } from "antd";

import GithubDark from "../images/github-dark.png";
import GithubLight from "../images/github-light.png";

class Header extends Component {
  state = {};

  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.theme.headerBG,
        }}
      >
        <br></br>
        <Row align="right">
          <Col md={22}></Col>
          <Col md={1}>
            <a
              href="https://github.com/nbalepur/Kanye-Song-Generator"
              target="blank"
              rel="noreferrer"
            >
              <img
                alt="github"
                class="hover"
                src={
                  this.props.theme.text === "white" ? GithubLight : GithubDark
                }
                style={{ width: 40, height: "auto" }}
              ></img>
            </a>
          </Col>
          <Col md={1}>
            <a
              href="https://github.com/nbalepur/Kanye-Song-Generator"
              target="blank"
              rel="noreferrer"
            >
              <img
                alt="github"
                class="hover"
                src={
                  this.props.theme.text === "white" ? GithubLight : GithubDark
                }
                style={{ width: 40, height: "auto" }}
              ></img>
            </a>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={2}></Col>
          <Col md={14}>
            <div>
              <h1 style={{ fontSize: 45, color: this.props.theme.primary }}>
                Kanye West Lyric Generator
              </h1>
            </div>
            <div>
              <h1
                style={{
                  fontSize: 25,
                  marginTop: -20,
                  color: this.props.theme.text,
                }}
              >
                Fill out the information below to generate your own lyrics!
              </h1>
            </div>
          </Col>

          <Col md={24}>
            <br></br>
          </Col>

          <Col md={2}></Col>
          <Col md={10}>
            <label style={{ fontSize: 18, color: this.props.theme.text }}>
              Starting Text
            </label>
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
            <label style={{ fontSize: 18, color: this.props.theme.text }}>
              Number of Words:{" "}
              <span style={{ color: this.props.theme.primary }}>
                {this.props.numWords}
              </span>
            </label>
            <Slider
              defaultValue={10}
              min={5}
              max={25}
              onChange={this.props.setNumWords}
              tooltipPlacement="bottom"
              handleStyle={{ borderColor: this.props.theme.primary }}
              trackStyle={{
                backgroundColor: this.props.theme.primary,
              }}
            />
          </Col>
          <Col md={12}></Col>

          <Col md={24}>
            <br></br>
          </Col>

          <Col md={2}></Col>
          <Col md={4}>
            <Checkbox
              id="censor"
              style={{ fontSize: 18, color: this.props.theme.text }}
            >
              Censor Profanity?
            </Checkbox>
          </Col>
          <Col md={4}>
            <Checkbox
              id="randomize"
              style={{
                fontSize: 18,
                color: this.props.theme.text,
              }}
            >
              Randomize?
            </Checkbox>
          </Col>
          <Col md={2} offset={1}>
            <Button
              id="generate-btn"
              type="primary"
              size="large"
              onClick={this.props.handleAPI}
              style={{
                backgroundColor: this.props.theme.primary,
                borderColor: this.props.theme.primary,
                color: this.props.theme.text,
              }}
            >
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
