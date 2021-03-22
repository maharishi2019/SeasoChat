import React, {Component} from "react"; 

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
import firebase from "./Firebase";
import MainNavbar from "./MainNavbar"; 
const db = firebase.firestore();

export default class Home extends Component {
    constructor(props){
        super(props); 

        this.state = {
            groups: []
        }
        this.renderGroups = this.renderGroups.bind(this);
    }

    componentDidMount(){
        if(this.props.loggedIn){
            this.renderGroups();
        }
    }

    async removeGroup(groupName){
        await db.collection("users").doc(this.props.currentUser.email).update({
            savedGroups: firebase.firestore.FieldValue.arrayRemove(groupName)
        })

        window.location.reload(); 
    }

    //rendering the groups into links
    async renderGroups(){
        var savedGroups = []; 
        await db.collection("users").doc(this.props.currentUser.email).get().then(
            (response) => {
                savedGroups = response.data().savedGroups; 
            }
        )
 
        var links = []; 
        savedGroups.forEach(
            (joinedGroupName) => {
                var targetLink = "/"+joinedGroupName; 
                links.push(
                    <div className="grouplink" key={joinedGroupName}>
                        <Link className="groupslink" to={targetLink}>{joinedGroupName}</Link>
                        <div className="sidebutton">
                            <button className="btn btn-dark" onClick={() => this.removeGroup(joinedGroupName)}>Remove</button>
                        </div>
                    </div>
                ); 
            }
        )

        this.setState({groups: links}); 
    }

    //rendering the content
    renderContent(){
        if(this.props.loggedIn){
            return(
                <div>
                    <MainNavbar></MainNavbar>
                    <div className="savedgroupdiv">
                        <center><h1>Saved Groups</h1></center>
                        <div className="groupdisplay">
                            <center>{this.state.groups}</center>
                        </div>
                    </div>
                </div>
            ); 
        }else{
            return(
                <div className="centerdiv">
                    <center><h1>SeasoChat</h1></center>
                    <center><Link className="loginLink" to="/login">Login</Link></center>
                </div>
            ); 
        }
    }
    render(){
        return(
            <div>

                {this.renderContent()}
            </div>
        ); 
    }
}