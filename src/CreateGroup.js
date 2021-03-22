import React, {useEffect, useState, useRef} from "react"; 

import firebase from "./Firebase"; 
import MainNavbar from "./MainNavbar"; 
const db = firebase.firestore(); 

export default function CreateGroup(props){
    const [newGroupName, setNewGroupName] = useState("")
    const groupRef = db.collection("groups"); 

    function handleSubmit(event){
        event.preventDefault(); 
        groupRef.doc(newGroupName).set({
            name: newGroupName
        })
        
        groupRef.doc(newGroupName).collection("messages").add({
            content: "The start of a new group!", 
            sentBy: "The Gods of SeasoChat", 
            time: firebase.firestore.Timestamp.now()
        })

        props.history.push("/"); 
    }

    function handleChange(event){
        setNewGroupName(event.target.value); 
    }

    return(
        <div>
            <MainNavbar></MainNavbar>
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