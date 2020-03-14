import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';

export default class Navigation extends Component {

    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('https://morning-brushlands-95842.herokuapp.com/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }
    
    render() {
        const loggedIn = this.props.loggedIn;
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <div>
                {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>
                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="text-secondary">login</span>
				</Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="text-secondary">sign up</span>
				</Link>
                                </section>
                            )}
                    
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav><p>{this.props.loggedInName}</p></Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Food Log</Nav.Link>
                        <Nav.Link href="/create">Add Food</Nav.Link>
                        {/* need to put conditional if user is logged in then add link to logout else login */}


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}