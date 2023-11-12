
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCNWOV91jQnXqH6P5rxMUXf6dFjZgchVsQ",
    authDomain: "chat-with-friend-15921.firebaseapp.com",
    projectId: "chat-with-friend-15921",
    storageBucket: "chat-with-friend-15921.appspot.com",
    messagingSenderId: "708574333117",
    appId: "1:708574333117:web:8d8dedef29384278b04fd4",
    measurementId: "G-DZWQJL4633",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
