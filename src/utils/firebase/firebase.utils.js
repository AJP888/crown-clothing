import { initializeApp } from "firebase/app"; //
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

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

// we createAuthUserWithEmailAndPassword / if the passowrd and email is wrong then return
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  // we await if its correct create new User
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// Always waiting to see if the auth state is changing
export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);
