// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHsIykks16URLGmWo2IQWtK4uToofpamI",
  authDomain: "react-todo-ee7b1.firebaseapp.com",
  databaseURL: "https://react-todo-ee7b1-default-rtdb.firebaseio.com",
  projectId: "react-todo-ee7b1",
  storageBucket: "react-todo-ee7b1.appspot.com",
  messagingSenderId: "693640488103",
  appId: "1:693640488103:web:8ce0d9b606c21e5e136782"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;