import React, {useEffect, useState, useRef} from "react"; 

import firebase from "./Firebase"; 
import MainNavbar from "./MainNavbar"; 
const db = firebase.firestore(); 

export default function CreateGroup(props){
    const [newGroupName, setNewGroupName] = useState("")
    const groupRef = db.collection("groups"); 

    async function handleSubmit(event){
        event.preventDefault(); 
        await groupRef.doc(newGroupName).set({
            name: newGroupName
        })
        
        await groupRef.doc(newGroupName).collection("messages").add({
            content: "The start of a new group!", 
            sentBy: "The Gods of SeasoChat", 
            time: firebase.firestore.Timestamp.now()
        })

        props.history.push("/exploregroup"); 
    }

    function handleChange(event){
        setNewGroupName(event.target.value); 
    }

    function handleLogout() {
        props.logOut();
    }

    return(
        <div>
            <MainNavbar logOut={handleLogout}></MainNavbar>
            <div className="savedgroupdiv">
                <center>
                    <h1>Create Group</h1>
                    <form className="creategroupform" onSubmit={handleSubmit}>
                        <input type="text" onChange={handleChange}></input>
                        <div className="creategroupbutton">
                            <input className="btn btn-dark" type="submit" value="Create Group"></input>
                        </div>
                    </form>
                </center>
            </div>
        </div>
    ); 
}