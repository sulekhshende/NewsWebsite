import firebase from 'firebase/compat/app';
import "firebase/compat/storage"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCnsJaXq_F79c0G9FS5HHecprhjMMm_df0",
    authDomain: "newsblogupload.firebaseapp.com",
    projectId: "newsblogupload",
    storageBucket: "newsblogupload.appspot.com",
    messagingSenderId: "285963662508",
    appId: "1:285963662508:web:0c4b2920ee5978bee61b09",
    measurementId: "G-7XC6WX5G20"
};

firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage()

export default firebase