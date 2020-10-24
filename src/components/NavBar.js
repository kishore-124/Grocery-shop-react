import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {

    constructor(props) {
        super(props)
        this.handlelogout = this.handlelogout.bind(this);
        this.handleHome = this.handleHome.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
    }

    handleHome() {
        this.props.history.push('/');
    }

    handleProfile() {
        this.props.history.push('/account');
    }

    handlelogout() {
        localStorage.removeItem('access-token')
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/" onClick={this.handleHome} >Grocery-shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" onClick={this.handleHome}>Home</Nav.Link>
                        </Nav>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/account" onClick={this.handleProfile}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.handlelogout} >Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

}
export default withRouter(NavBar)