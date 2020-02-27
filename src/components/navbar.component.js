import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export default class Navigation extends Component {
    
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">Exercise Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Exercises</Nav.Link>
                        <Nav.Link href="/create">Create Exercises</Nav.Link>
                        <Nav.Link href="/user">Create User</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            //     <Link to="/" className="navbar-brand">ExerTracker</Link>
            //     <div className="collapse navbar-collapse">
            //         <ul className="navbar-nav mr-auto">
            //             <li className="navbar-item">
            //                 <Link to="/" className="nav-link">Exercises</Link>
            //             </li>
            //             <li className="navbar-item">
            //                 <Link to="/create" className="nav-link">Create Exercise Log</Link>
            //             </li>
            //             <li className="navbar-item">
            //                 <Link to="/user" className="nav-link">Create User</Link>
            //             </li>
            //         </ul>
            //     </div>
            // </nav>
        )
    }
}