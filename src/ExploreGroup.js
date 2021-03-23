import React, { useEffect, useState, useRef } from "react";

import {
    Link
} from "react-router-dom"; 

import MainNavbar from "./MainNavbar"; 
import firebase from "./Firebase";
const db = firebase.firestore();

export default function JoinGroup(props) {
    const [groups, setGroups] = useState([])
    const groupRef = db.collection("groups");
    const userRef = db.collection("users").doc(props.currentUser.email); 
    function getGroups(){
        groupRef.onSnapshot((snapshot) => {
                var groups = []; 
                snapshot.forEach(
                    (group) => {
                        groups.push(group.id); 
                    }
                ) 
                setGroups(groups); 
        })
    }

    useEffect(() => {
        getGroups(); 
    }, []); 

    async function saveGroup(group){
        await userRef.update({
            savedGroups: firebase.firestore.FieldValue.arrayUnion(group)
        })

       props.history.push("/");  
    }

    function handleLogout(){
        props.logOut(); 
    }

    return (
        <div>
            <MainNavbar logOut={handleLogout}></MainNavbar>
            <div className="savedgroupdiv">
                <center><h1>Explore Groups</h1></center>
                <center>
                    {groups.map(
                        (group) => {
                            return (
                                <div key={group}>
                                    <Link className="groupslink" to={group}>{group}</Link>
                                    <div className="sidebutton">
                                        <button className="btn btn-dark" onClick={() => saveGroup(group)}>Save</button>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </center>
            </div>
        </div>
        
    );
}