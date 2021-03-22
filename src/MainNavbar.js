import React from "react"; 

import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";

import {
    Navbar,
    Nav
} from "react-bootstrap";

export default function MainNavbar(props){
    return(
        <div>
            <Navbar className="navbar navbar-dark" bg="dark" expand="lg">
                <Navbar.Brand className="navbar-brand" href="/">SeasoChat</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/exploregroup">Explore Groups</Nav.Link>
                        <Nav.Link href="/creategroup">Create Group</Nav.Link>
                        <div className="sidebutton">
                            <button className="btn btn-primary" onClick={props.logOut}>Logout</button>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}