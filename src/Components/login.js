import { useState } from "react";
import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";

const Login = () => {
  const [creatingAccount, setCreatingAccount] = useState(false);

  return (
    <div className="loginMainContainer">
      <img src={logo} className="loginLogoImage"></img>
      {creatingAccount ? (
        <div>
          <div>
            <input className="usernameInput" placeholder="Username"></input>
          </div>
          <div>
            <input className="emailInput" placeholder="Email"></input>
          </div>{" "}
          <div>
            <input className="passwordInput" placeholder="Password"></input>
          </div>
          <div>
            <input
              className="passwordInputError"
              placeholder="Confirm Password"
            ></input>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              className="createAccountButton"
              onClick={() => {
                setCreatingAccount(!creatingAccount);
              }}
            >
              Create Account
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <input
              className="usernameInput"
              placeholder="Username or Email"
            ></input>
          </div>
          <div>
            <input className="passwordInput" placeholder="Password"></input>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              className="createAccountButton"
              onClick={() => {
                setCreatingAccount(!creatingAccount);
              }}
            >
              Create Account
            </div>
            <div className="LogInButton"> Log In</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
