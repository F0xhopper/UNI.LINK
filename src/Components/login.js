import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";

const Login = () => {
  return (
    <div className="loginMainContainer">
      <img src={logo} className="loginLogoImage"></img>
      <div>
        <input className="loginInput"></input>
      </div>
      <div>
        <input className="loginInput"></input>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div className="createAccountLogInButton">Create Account</div>
        <div className="createAccountLogInButton"> Log In</div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;
