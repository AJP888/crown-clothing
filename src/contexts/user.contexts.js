import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // onAuthStateChangeListner  passes back a callback function

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListner((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubcribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// UserContext

// we need to import {createContext, useState} from 'react';

// we then create a UserContext and a UserProivder

// The UserContext hods the createContext that then holds currentUser and setCurrent users with both having the values of null

// we then create a UserProvier that holds the children prop/
// Inside the UserProvider we have the currentUser and setCurrentUser useState which holds a value of null
// we next have a value that holds both currentUser and setCurentUser
// we then return the UserContext.Provideer inclosed around {children} the UserContext.Provider has a value={value} the value holds the value which contains currentUser and setCurrentUser
