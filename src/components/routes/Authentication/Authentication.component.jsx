
import SignUp from "../../sign-up/sign-up.component";
import SignIn from "../../sign-in/sign-in.components";
import "./Authentication.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  )
};

export default Authentication;
