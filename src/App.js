import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState, useSignInWithGithub } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAg5UqDbChb4YDsHNzwu-JqYWvpvH9yfj8",
  authDomain: "open-chat-app-a9559.firebaseapp.com",
  projectId: "open-chat-app-a9559",
  storageBucket: "open-chat-app-a9559.appspot.com",
  messagingSenderId: "611576718295",
  appId: "1:611576718295:web:20be45d62edabe4bbc6192",
  measurementId: "G-QPYTXJC0F0"
})
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const[user]= useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const useSignInWithGoogle= () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider); 
  }

  return (
   <button onClick={useSignInWithGoogle}>Sign in with Google</button> 
  )
}
function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  );
}

function ChatMeassage(props) {
const {text, uid} = props.message;

return <p>{text}</p>
}
export default App;
