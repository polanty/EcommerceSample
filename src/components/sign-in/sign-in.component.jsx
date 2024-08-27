import { useState } from "react"; // have to import useeffect if you wanna make use of getRedirectResult below
import { useDispatch } from "react-redux";
import { onGoogleUserSignIn } from "../../store/user/use.saga";

import {
  // auth,
  signInWithGooglePopUp,
  //createUserDocumentFromPopUp,
  signInWithEmailAndPass,
} from "../../utils/firebase/firebase.utils";

import "../sign-in/sign-in.styles.scss";
import FormEntry from "../../components/form-entry/form.component";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.styles";

import {
  googleSignInStart,
  emailSignStart,
} from "../../store/userDispatch.action";

const defaultDetails = {
  email: "",
  passWord: "",
};

const SingIn = () => {
  const dispatch = useDispatch();

  const [formField, setFormFields] = useState(defaultDetails);

  const { email, passWord } = formField;

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormFields({ ...formField, [name]: value });
    console.log(formField);
  };

  const signInWithGoogle = async () => {
    //await signInWithGooglePopUp();
    dispatch(googleSignInStart());
  };

  const resetSignInFields = () => {
    setFormFields(defaultDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // dispatch(emailSignStart(email, passWord));
      resetSignInFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("this password is wrong");
          break;
        case "auth/wrong-password":
          alert("this email is wrong");
          break;
        default:
          console.log(error, "this is the error reveived");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h1>I already have an account </h1>
      <h3>sign in with email and passWord</h3>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button
            onClick={signInWithGoogle}
            type="button"
            buttonType={`${BUTTON_TYPE_CLASSES.google}`}
            style={{ fontSize: 11 }}
          >
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SingIn;
