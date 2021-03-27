import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signOut } from 'firebase-react-hooks';

firebase.initializeApp({
  apiKey: "AIzaSyC6Huxd6r27tWbeu9ah7j94FyvRCyPHUSo",
  authDomain: "chatter-ae437.firebaseapp.com",
  projectId: "chatter-ae437",
  storageBucket: "chatter-ae437.appspot.com",
  messagingSenderId: "912557874646",
  appId: "1:912557874646:web:8b4470e15a49a463151877",
  measurementId: "G-331QFBZE2R"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

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
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() = auth.signOut()}>
      Sign Out
    </button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
}

export default App;
