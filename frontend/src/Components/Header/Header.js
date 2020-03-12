import React, { Component } from 'react';
import { connect } from "react-redux";
import { Navbar, Nav } from 'react-bootstrap';
import { Login } from '../Login/Login';
import { Register } from '../Login/Register';

import './Header.css';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showLogin: false,
          showRegister: false
        }
    }

    showLogin = () => { this.setState({ showLogin: true }) }
    hideLogin = () => { this.setState({ showLogin: false }) }
    
    showRegister = () => { this.setState({ showRegister: true }) }
    hideRegister = () => { this.setState({ showRegister: false }) }

    toggle = () => { console.log('toggle')}

    render() {
      return (
        <div>

            <Navbar className="header "  expand="lg">
                <Navbar.Brand href="/">GreenGo</Navbar.Brand>
                <div className="nav-links-container">
                    <Nav className="nav-links">
                        <Nav.Link onClick={ this.showRegister }>Register</Nav.Link>
                        <Nav.Link onClick={ this.showLogin }>Login</Nav.Link>
                    </Nav>
                </div>
            </Navbar>

          {/* Login/Signup Modals triggered by Navbar */}

          <Login 
            show={ this.state.showLogin }
            hide={ this.hideLogin } />

          <Register 
            show={ this.state.showRegister }
            hide={ this.hideRegister } />

        </div>
      );
    }

}

const mapDispatchToProps = (dispatch) => ({
});

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
