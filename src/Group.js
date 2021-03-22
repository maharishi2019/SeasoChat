import React, {useState, useRef, useEffect} from "react"; 

import firebase from "./Firebase"; 
const db = firebase.firestore(); 

export default function Group(props){
    const [group, setGroup] = useState(props.match.params.group); 
    const [messages, setMessages] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [message, setMessage] = useState(""); 
    const messageEl = useRef(null);

    const messageRef = db.collection("groups").doc(group).collection("messages"); 

    async function getMessages(){
        messageRef.orderBy("time", "asc").onSnapshot((snapshot) => {
            var updatedMessages = [];
            snapshot.forEach((message) => {
                updatedMessages.push(message);
            })
            setMessages(updatedMessages); 
        })
    }

    useEffect(() => {
        getMessages();
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, []); 

    function handleSubmit(event){
        event.preventDefault(); 

        messageRef.add({
            content: message,
            sentBy: props.currentUser.displayName, 
            time: firebase.firestore.Timestamp.now()
        }).catch((error) => console.log(error)); 
    }

    function handleChange(event){
        setMessage(event.target.value); 
    }

    return (
        <div className="messagediv">
            <center><h1>{group}</h1>
            <div className="messageBox" ref={messageEl}>
                {messages.map(
                    (message) => {
                        const sentBy = message.data().sentBy; 
                        const content = message.data().content; 
                        if(sentBy === props.currentUser.displayName){
                            return (<div className="sentByUser" key={message.id}>
                                <p>{content}</p>
                                <p>Sent by you</p>
                            </div>);
                        }else{
                            return (<div className="recievedByUser" key={message.id}>
                                <p>{content}</p>
                                <p>Sent by {sentBy}</p>
                            </div>);
                        }

                    }
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange}></textarea>
                <input type="submit" value="Send"></input>
                </form></center>
        </div>
    ); 
}
