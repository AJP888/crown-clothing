import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

// sign in form / not sign up form
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // useState for changing state adn set state imformation
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; // forFields holds the value of defaultFormFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // Submit Form for onSubmit
  const handleSumbit = async (event) => {
    event.preventDefault(); // dont go to default we will hand everything in the form

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // UseContext holding user

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  //
  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSumbit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
