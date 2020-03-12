import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal, ModalBody, Form, FormGroup, Button } from 'react-bootstrap';
import './Login.css';

export class Register extends Component {

    constructor() {
        super();
        this.state = {
        
        }
    }

    render() {
        return (
            <Modal 
                show={this.props.show} 
                onHide={ this.props.hide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>

                <ModalBody>
                <Form>
                    <FormGroup controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </FormGroup>

                    <FormGroup controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </FormGroup>

                    <FormGroup controlId="formBasicPassword2">
                        <Form.Label>Enter Password Again</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </FormGroup>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                </ModalBody>
            </Modal>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = state => {
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
