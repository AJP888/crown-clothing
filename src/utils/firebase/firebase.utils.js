import { initializeApp } from "firebase/app"; //
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // providea authentication services

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// apiKey allows us to do CRUDE actions.
const firebaseConfig = {
  apiKey: "AIzaSyC9wRhGWf8YPmBWaW2FJfgStR859EttY6s",
  authDomain: "crown-store-clothing.firebaseapp.com",
  projectId: "crown-store-clothing",
  storageBucket: "crown-store-clothing.appspot.com",
  messagingSenderId: "481098043565",
  appId: "1:481098043565:web:83c6b86a11c66101fe7624",
  measurementId: "G-636FHRZ0LR",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

// EveryTime someone interacts we a provider we force them to select an account / i.e.e a google account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// this providers authentication
export const auth = getAuth();

// This provides us with a Google pop up provider and provides the authentication and the provider.
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// connects out data base to firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); // userAuth.id gets us a unqiue id documnet refference

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
