import React, { Component } from "react";

import { Row, Col, Space } from "antd";

class Error extends Component {
  state = {};
  render() {
    return (
      <div>
        <Row justify="center">
          <Col>
            <Space>
              <h1>Error: One of your words in "Starting Text" is invalid</h1>
              <h1>Please try again with more common words</h1>
            </Space>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Error;
