import React, {Component} from "react"; 

import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";

import Home from "./Home"; 
import Login from "./Login"; 
import Group from "./Group";
import CreateGroup from "./CreateGroup"; 
import ExploreGroup from "./ExploreGroup"; 

export default class App extends Component {
    constructor(props) {
        super(props);
        this.authenticated = this.authenticated.bind(this);
        this.logOut = this.logOut.bind(this);
        var localUser = localStorage.getItem('user');
        this.state = { loggedIn: (localStorage.getItem('loggedIn') === 'true' ? true : false), user: (localUser ? JSON.parse(localUser) : null) };

    }

    authenticated(currentUser) {
        this.setState({ loggedIn: true, user: currentUser });
        localStorage.setItem('loggedIn', this.state.loggedIn);
        localStorage.setItem('user', JSON.stringify(this.state.user));
        window.location.reload(); 
    }

    logOut() {
        this.setState({ loggedIn: false });
        localStorage.setItem('loggedIn', false);
        window.location.reload();
    }

    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props} loggedIn={this.state.loggedIn} logOut={this.logOut} currentUser={this.state.user} />} />
                    <Route exact path="/login" render={(props) => <Login {...props} authenticated={this.authenticated} />} />
                    <Route exact path="/exploregroup" render={(props) => <ExploreGroup {...props} loggedIn={this.state.loggedIn} logOut={this.logOut} currentUser={this.state.user} />} />
                    <Route exact path="/creategroup" render={(props) => <CreateGroup {...props} loggedIn={this.state.loggedIn} logOut={this.logOut} currentUser={this.state.user} />} />
                    <Route exact path="/:group" render={(props) => <Group {...props} loggedIn={this.state.loggedIn} currentUser={this.state.user}/>} />          
                </Switch>
            </Router >
        ); 
    }
}