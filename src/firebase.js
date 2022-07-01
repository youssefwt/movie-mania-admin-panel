import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "movie-mania-f505c.firebaseapp.com",
  projectId: "movie-mania-f505c",
  storageBucket: "movie-mania-f505c.appspot.com",
  messagingSenderId: "389218573424",
  appId: "1:389218573424:web:db329665ba6e42d1c768b5",
  measurementId: "G-9RGBXH9ZJ1",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
