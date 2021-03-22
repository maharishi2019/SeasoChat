import React, { Component } from "react";

import firebase from "./Firebase";
import "firebase/auth";

export default class Home extends Component {
    constructor(props) {
        super(props);

    }

    onSubmit = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                var credential = result.credential;
                var token = credential.accessToken;

                var user = result.user;

                this.props.history.push("/");
                this.props.authenticated(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                var email = error.email;

                var credential = error.credential;
                alert(errorMessage);
            });
    }

    render() {
        return (
            <div className="centerdiv">
                <center><button className="btn-primary"onClick={this.onSubmit}>Google Login</button></center>
            </div>
        );
    }
}