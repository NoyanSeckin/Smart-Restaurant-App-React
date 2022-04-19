// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfmD4W3vRRiG-gJeWrRkyC7qbr29DLlrE",
  authDomain: "smart-restaurant-app-react.firebaseapp.com",
  projectId: "smart-restaurant-app-react",
  storageBucket: "smart-restaurant-app-react.appspot.com",
  messagingSenderId: "99882930816",
  appId: "1:99882930816:web:7e91531ca274addb584c65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;