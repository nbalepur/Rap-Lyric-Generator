import React, { Component } from "react";

import { Row, Col, Space } from "antd";

import { ExclamationCircleOutlined } from "@ant-design/icons";

class Error extends Component {
  state = {};
  render() {
    return (
      <div>
        <Row justify="center">
          <Space justify="center">
            <ExclamationCircleOutlined
              style={{
                fontSize: 75,
                marginRight: 15,
                color: this.props.theme.primary,
              }}
            />{" "}
            <Col>
              <h1 style={{ color: this.props.theme.text }}>
                <span style={{ color: this.props.theme.primary }}>Error</span>:
                One of your words in{" "}
                <span style={{ color: this.props.theme.primary }}>
                  Starting Text
                </span>{" "}
                is invalid
              </h1>
              <h1 style={{ marginTop: -15, color: this.props.theme.text }}>
                Please try again with more common words
              </h1>
            </Col>
          </Space>
        </Row>
      </div>
    );
  }
}

export default Error;
