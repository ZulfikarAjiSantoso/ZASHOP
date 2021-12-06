import { useEffect, useState } from "react";
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS5E0EflwPsqlGTJ0e0DszwoRq-Jv6tGc",
  authDomain: "ecom-bf2f6.firebaseapp.com",
  projectId: "ecom-bf2f6",
  storageBucket: "ecom-bf2f6.appspot.com",
  messagingSenderId: "656061616681",
  appId: "1:656061616681:web:acd1f92749cdc399194238"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export {auth, db, storage};