import React from 'react';
import { Row, Col } from 'antd';
import './assets/css/common.less';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
const Admin = (props: any) => {
  return (
    <Row className="container">
      {/* 左边 */}
      <Col span={3} className="nav-left">
        <NavLeft />
      </Col>
      {/* 右边 */}
      <Col span={21} className="main">
        <Header />
        <Row className="content">{props.children}</Row>
        <Footer />
      </Col>
    </Row>
  );
};

// class Admin extends React.Component {

//   render() {
//   console.log('111');
//     return (
//       <Row className="container">
//         {/* 左边 */}
//         <Col span={3} className="nav-left">
//           <NavLeft />
//         </Col>
//         {/* 右边 */}
//         <Col span={21} className="main">
//           <Header />
//           <Row className="content">{this.props.children}</Row>
//           <Footer />
//         </Col>
//       </Row>
//     )
//   }
// }

export default Admin;
