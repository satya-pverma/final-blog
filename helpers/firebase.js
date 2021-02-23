import  firebase from 'firebase'
const config={
    apiKey: "AIzaSyDgu47pgygt7Ni8AO90rgrlku86jxZ5seM",
    authDomain: "mobile-auth-f8c9f.firebaseapp.com",
    projectId: "mobile-auth-f8c9f",
    storageBucket: "mobile-auth-f8c9f.appspot.com",
    messagingSenderId: "1015943524073",
    appId: "1:1015943524073:web:6c204c5b9d023904738a78"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }else {
    firebase.app(); 
 }
export default firebase