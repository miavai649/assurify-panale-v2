import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC6b_QCN1iyMvv_ZfyfPyfW7felcqEHJpU',
  authDomain: 'panel-4ae70.firebaseapp.com',
  projectId: 'panel-4ae70',
  storageBucket: 'panel-4ae70.firebasestorage.app',
  messagingSenderId: '1088230739395',
  appId: '1:1088230739395:web:081c348ac19fce8b52c176',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
