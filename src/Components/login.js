import { useState } from "react";
import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";

const Login = (props) => {
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loginPasswordPlaceholder, setLoginPasswordPlaceholder] =
    useState("Password");
  const [loginUsernamePlaceholder, setLoginUsernamePlaceholder] =
    useState("Username");
  const [createUsernamePlaceholder, setCreateUsernamePlaceholder] =
    useState("Username");
  const [createPasswordPlaceholder, setCreatePasswordPlaceholder] =
    useState("Password");
  const [createEmailPlaceholder, setCreateEmailPlaceholder] = useState("Email");
  const [
    createPasswordConfirmPlaceholder,
    setCreatePasswordConfirmPlaceholder,
  ] = useState("Confirm Password");
  const [redPlaceholderText, setRedPlaceholderText] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!usernameInput || !passwordInput) {
        setLoginUsernamePlaceholder("Please fill in all fields");

        setLoginPasswordPlaceholder("Please fill in all fields");
        setRedPlaceholderText(true);
        setUsernameInput("");
        setPasswordInput("");
        setTimeout(() => {
          setRedPlaceholderText(false);

          setLoginUsernamePlaceholder("Username");
          setLoginPasswordPlaceholder("Password");
        }, 4000);
        console.log("Please fill in all fields.");
        return;
      }

      const response = await fetch("http://localhost:3013/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });
      setUsernameInput("");
      setPasswordInput("");
      if (!response.ok) {
        setLoginPasswordPlaceholder("Incorrect username or password");
        setRedPlaceholderText(true);
        setLoginUsernamePlaceholder("Incorrect username or password");
        setTimeout(() => {
          setRedPlaceholderText(false);
          setLoginUsernamePlaceholder("Username");
          setLoginPasswordPlaceholder("Password");
        }, 4000);

        throw new Error("Incorrect username or password");
      }
      const data = await response.json();
      console.log(data); // Assuming the response contains userId
      localStorage.setItem("userId", data.userId);

      props.setLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      if (
        !usernameInput ||
        !emailInput ||
        !passwordInput ||
        !passwordConfirmInput
      ) {
        setCreateUsernamePlaceholder("Please fill in all fields");
        setCreatePasswordPlaceholder("Please fill in all fields");
        setCreatePasswordConfirmPlaceholder("Please fill in all fields");
        setCreateEmailPlaceholder("Please fill in all fields");
        setRedPlaceholderText(true);
        setTimeout(() => {
          setRedPlaceholderText(false);
          setCreateUsernamePlaceholder("Username");
          setCreatePasswordPlaceholder("Password");
          setCreatePasswordConfirmPlaceholder("Confirm Password");
          setCreateEmailPlaceholder("Email");
        }, 4000);
        console.log("Please fill in all fields.");
        return;
      }
      if (passwordInput !== passwordConfirmInput) {
        setCreatePasswordPlaceholder("Passwords do not match");
        setCreatePasswordConfirmPlaceholder("Passwords do not match");
        setRedPlaceholderText(true);
        setTimeout(() => {
          setRedPlaceholderText(false);
          setCreatePasswordPlaceholder("Password");
          setCreatePasswordConfirmPlaceholder("Confirm Password");
        }, 4000);
        console.log("Passwords do not match.");
        return;
      }
      const response = await fetch("http://localhost:3013/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          email: emailInput,
          password: passwordInput,
          profile_pic: "",
        }),
      });
      if (response.ok) {
        console.log("User created successfully!");
      } else {
        console.log("Failed to create user.");
      }
      setUsernameInput("");
      setPasswordInput("");
      setEmailInput("");
      setPasswordConfirmInput("");
    } catch (error) {
      console.error("Error creating user:", error);
      console.log("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="loginMainContainer">
      <img src={logo} className="loginLogoImage" alt="logo" />
      {creatingAccount ? (
        <div>
          <div>
            <input
              value={usernameInput}
              className={`usernameInput ${
                redPlaceholderText && "placeholder-red"
              }`}
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
              placeholder={createUsernamePlaceholder}
            />
          </div>
          <div>
            <input
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              className={`emailInput ${
                redPlaceholderText && "placeholder-red"
              }`}
              placeholder={createEmailPlaceholder}
            />
          </div>
          <div>
            <input
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
              className={`passwordInput ${
                redPlaceholderText && "placeholder-red"
              }`}
              placeholder={createPasswordPlaceholder}
            />
          </div>
          <div>
            <input
              value={passwordConfirmInput}
              onChange={(e) => {
                setPasswordConfirmInput(e.target.value);
              }}
              className={`passwordInput ${
                redPlaceholderText && "placeholder-red"
              }`}
              placeholder={createPasswordConfirmPlaceholder}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="createAccountButton"
              onClick={(e) => {
                createAccount(e);

                setUsernameInput("");
                setPasswordInput("");
                setEmailInput("");
                setPasswordConfirmInput("");
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
              className={`usernameInput ${
                redPlaceholderText && "placeholder-red"
              }`}
              placeholder={loginUsernamePlaceholder}
            />
          </div>
          <div>
            <input
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
              className={`passwordInput ${
                redPlaceholderText && "placeholder-red"
              }`}
              placeholder={loginPasswordPlaceholder}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div
              className="createAccountButton"
              onClick={() => {
                setCreatingAccount(!creatingAccount);
                setUsernameInput("");
                setPasswordInput("");
                setEmailInput("");
                setPasswordConfirmInput("");
              }}
            >
              Create Account
            </div>
            <div className="LogInButton" onClick={handleSubmit}>
              Log In
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
