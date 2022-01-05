import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Message from "./Message";
import { useRef, useState } from "react";
import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";


function ChatScreen({chat, messages}){
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const router = useRouter();
    const EndOfMessageRef = useRef(null);
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc"))
    const [recipientSnapshot] = useCollection(db.collection("users").where("email","==", getRecipientEmail(chat.users, user)))

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                key={message.id} 
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ));
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.user} message={message}/>
            ))
        }
    };

const scrollToBottom = () => {
    EndOfMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

const sendMessage = (e) => {
    e.preventDefault();
    /* Ultima Vez activo en tiempo real*/
    db.collection("users").doc(user.uid).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    }, {merge:true});
    db.collection('chats').doc(router.query.id).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
};
console.log(recipientEmail);
const recipient = recipientSnapshot?.docs?.[0]?.data();
const recipientEmail = getRecipientEmail(chat.users, user);
    return (
        <Container>
            <Header>
                {recipient ? (<Avatar src={recipient?.photoURL}/>)
                : (<Avatar>{recipientEmail[0]}</Avatar>)
            }
                
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Ultima actividad: {' '}{recipient?.lastSeen?.toDate() ? ( 
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                        ): "No disponible"}</p>
                    ): (<p>Cargando...</p>)}
                    
                </HeaderInformation>
                <HeaderIcon>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcon>
            </Header>

            <MessageContainer>
                {showMessages()} 
                <EndOfMessage ref={EndOfMessageRef}/>
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                    <Input value={input} onChange={(e) => setInput(e.target.value)}/>
                     <button hidden disabled={!input} type="submit" onClick={sendMessage}/>
                     <MicIcon/>
                </InputContainer>
        </Container>

    )
}
export default ChatScreen

const Container = styled.div``;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100px;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;
    > h3 {
        margin-bottom: 3px;
    } 
    > p {
        font-size: 14px;
        color: gray;
    }
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    height: 100vh;
    max-height: 73vh;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /*IE y Edge*/
    scrollbar-width: none; /*FIREFOX*/
`;