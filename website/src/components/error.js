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
              style={{ fontSize: 75, marginRight: 15 }}
            />{" "}
            <Col>
              <h1>Error: One of your words in "Starting Text" is invalid</h1>
              <h1 style={{ marginTop: -15 }}>
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
