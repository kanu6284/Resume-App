// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQ2jI8-ef82b0QvMQFp1gT3uCYi5DNHw0",

  authDomain: "resume-bulder-6703a.firebaseapp.com",

  projectId: "resume-bulder-6703a",

  storageBucket: "resume-bulder-6703a.appspot.com",

  messagingSenderId: "1083835709090",

  appId: "1:1083835709090:web:5abd910514621c0d1789fb",

  measurementId: "G-16CY7RH6CP"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);