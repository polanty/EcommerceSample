import { useState } from "react";
import {
  createUserWithEmailAndPass,
  createUserDocumentFromPopUp,
} from "../../utils/firebase/firebase.utils";
import FormEntry from "../form-entry/form.component";
import "../signIn-form/signUp.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.styles.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  passWord: "",
  confirmPass: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, passWord, confirmPass } = formFields;

  //console.log("hit");
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passWord !== confirmPass) {
      console.log("This cannot be mounted due to the error");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPass(email, passWord);

      await createUserDocumentFromPopUp(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("this email is already in use");
      } else {
        console.log("this encontered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <h1>Sign up with your Email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormEntry
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormEntry
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormEntry
          label="password"
          type="password"
          required
          onChange={handleChange}
          name="passWord"
          value={passWord}
        />

        <FormEntry
          label="confirm password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPass"
          value={confirmPass}
        />

        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
