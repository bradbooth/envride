import React, { Component } from 'react';
import { Container, Row, Col, Table } from "reactstrap";
import { connect } from "react-redux";
import Chart from "./Chart"
import './Info.css'

export class Info extends Component {

  constructor() {
    super();
    this.state = {
     }
  }


  render() {
    return (
      <div className="info">
        <Container className="info-container">
          <Row>
            
            <Col>
              <h1>Information</h1>
              <p>Here we can display information such as the community charts</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Chart />
            </Col>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>kg/Co2 Saved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Bob</td>
                    <td>25kg</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Alice</td>
                    <td>20kg</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Eve</td>
                    <td>12kg</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default connect()(Info);
