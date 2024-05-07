import { useState } from "react";
import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";

const Login = (props) => {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [usernameInput, setUsernameInput] = useState();
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [passwordConfirmInput, setPasswordConfirmInput] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3012/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const data = await response.json();
      console.log(data); // Assuming the response contains userId
      localStorage.setItem("userId", data.userId);

      props.setLoggedIn(true);
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error("Login failed:", error.message);
      // Set state to display error message on the UI
    }
  };
  const createAccount = async (e) => {
    try {
      if (
        !usernameInput ||
        !emailInput ||
        !passwordInput ||
        !passwordConfirmInput
      ) {
        console.log("Please fill in all fields.");
        return;
      }
      if (passwordInput !== passwordConfirmInput) {
        console.log("Passwords do not match.");
        return;
      }
      const response = await fetch("http://localhost:3012/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          email: emailInput,
          password: passwordInput,
        }),
      });
      if (response.ok) {
        console.log("User created successfully!");
        // Optionally, reset the form fields after successful submission
      } else {
        console.log("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      console.log("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="loginMainContainer">
      <img src={logo} className="loginLogoImage"></img>
      {creatingAccount ? (
        <div>
          <div>
            <input
              value={usernameInput}
              className="usernameInput"
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
              placeholder="Username"
            ></input>
          </div>
          <div>
            <input
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              className="emailInput"
              placeholder="Email"
            ></input>
          </div>{" "}
          <div>
            <input
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
              className="passwordInput"
              placeholder="Password"
            ></input>
          </div>
          <div>
            <input
              value={passwordConfirmInput}
              onChange={(e) => {
                setPasswordConfirmInput(e.target.value);
              }}
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
                createAccount();
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
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
              className="usernameInput"
              placeholder="Username or Email"
            ></input>
          </div>
          <div>
            <input
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
              className="passwordInput"
              placeholder="Password"
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
            <div className="LogInButton" onClick={handleSubmit}>
              {" "}
              Log In
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
