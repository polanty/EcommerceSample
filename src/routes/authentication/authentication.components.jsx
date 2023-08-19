import SignUpForm from "../../components/signIn-form/signUp.component";
import SingIn from "../../components/sign-in/sign-in.component";
import "../authentication/authentication.styles.scss";

const Auth = () => {
  return (
    <div className="authentication-container">
      <SingIn />
      <SignUpForm />
    </div>
  );
};

export default Auth;
