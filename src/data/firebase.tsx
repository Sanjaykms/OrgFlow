// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, OAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZNXLWu-G3ffRfRfJNHMEYUU86lx3vaVg",
  authDomain: "lttsorgflow.firebaseapp.com",
  projectId: "lttsorgflow",
  storageBucket: "lttsorgflow.firebasestorage.app",
  messagingSenderId: "13702674430",
  appId: "1:13702674430:web:400de233365cfc1501f2af",
  measurementId: "G-TBY8DLVK3K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const microsoftProvider = new OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  prompt: "consent", // always ask consent
});
export const auth = getAuth(app);