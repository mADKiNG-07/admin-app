import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyACoBDkbjtBN8e61Fsw47db7XZ7b4dGID4",
  authDomain: "thecapinvestment.firebaseapp.com",
  projectId: "thecapinvestment",
  storageBucket: "thecapinvestment.appspot.com",
  messagingSenderId: "786265208546",
  appId: "1:786265208546:web:bf817557bce5c8af7cd0bb"
};

export const app = initializeApp(firebaseConfig);
