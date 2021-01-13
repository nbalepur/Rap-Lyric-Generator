import React, { Component } from "react";

import { Row, Col, Spin, Space } from "antd";

class Loading extends Component {
  state = {};
  render() {
    return (
      <Row align="center">
        <Col>
          <Space>
            <h1
              style={{
                fontSize: 40,
                marginRight: 20,
                color: this.props.theme.text,
              }}
            >
              Generating Text
            </h1>
            <Spin style={{ marginTop: -10 }} size="large"></Spin>
          </Space>
        </Col>
      </Row>
    );
  }
}

export default Loading;
