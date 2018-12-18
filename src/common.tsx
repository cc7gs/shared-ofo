import React from 'react';
import { Row, Col } from 'antd';
import Header from './components/Header';
import './assets/css/common.less';
const Comm = (props: any) => {
  return (
    <>
      <Row className="comm-header">
        <Header type='subNav' />
      </Row>
      <Row className="comm-content">{props.children}</Row>
    </>
  );
};

export default Comm;
