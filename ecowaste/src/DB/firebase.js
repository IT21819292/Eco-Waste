// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUBNXg5EgOeGQ4KcVABibnlNarRGvAHgY",
  authDomain: "eco-waste-88f66.firebaseapp.com",
  projectId: "eco-waste-88f66",
  storageBucket: "eco-waste-88f66.appspot.com",
  messagingSenderId: "720457514434",
  appId: "1:720457514434:web:d43c3423f0b02c1fba6a5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;
