// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCHZjY80A-q8FKtIzvkmPbPp6TSWqNRcAo',
  authDomain: 'glittergallery-1fb3a.firebaseapp.com',
  projectId: 'glittergallery-1fb3a',
  storageBucket: 'glittergallery-1fb3a.firebasestorage.app',
  messagingSenderId: '639464477757',
  appId: '1:639464477757:web:5c33fd05df0d388ab1c654',
  measurementId: 'G-BGN79VPFB5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
