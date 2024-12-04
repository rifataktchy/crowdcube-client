// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNNWLz8OLEBDIeiwxHqDa0FlWV6zvqmKA",
  authDomain: "crowdcube-project.firebaseapp.com",
  projectId: "crowdcube-project",
  storageBucket: "crowdcube-project.firebasestorage.app",
  messagingSenderId: "424113969207",
  appId: "1:424113969207:web:5da3c0e109577e061647b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;