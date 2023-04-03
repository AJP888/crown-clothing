import { initializeApp } from "firebase/app"; //
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

// EveryTime someone interacts we a provider we force them to select an account / i.e.e a google account
provider.setCustomParameters({
  prompt: "select_account",
});

// this providers authentication
export const auth = getAuth();

// This provides us with a Google pop up provider and provides the authentication and the provider.
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// connects out data base to firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); // userAuth.id gets us a unqiue id documnet refference

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists()); // .exists() checks to see if the data in the database exists

  // if user data does not exists

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;

  // if user data does  exist
};
