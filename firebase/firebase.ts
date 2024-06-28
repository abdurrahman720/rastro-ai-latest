
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const FirebaseConfig = {
    apiKey: "AIzaSyArFLXuyzw9sWdsCKHmnG14zG3gx0xqNtA",
    authDomain: "rastro-ai.firebaseapp.com",
    projectId: "rastro-ai",
    storageBucket: "rastro-ai.appspot.com",
    messagingSenderId: "881858706904",
    appId: "1:881858706904:web:8a06a84fc1cd5feafb06ad",
    measurementId: "G-F07FFNEN9N"
  };

const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);

export { auth };