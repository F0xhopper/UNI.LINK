import { useCallback, useState, useEffect } from "react";
import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";
import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import profilePicture from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/png-transparent-computer-icons-user-profile-login-my-account-icon-heroes-black-user (1) (1).png";
const Header = (props) => {
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(true);
  const [user, setUser] = useState();
  function logOut() {
    localStorage.removeItem("userId");
    props.setLoggedIn(false);
  }

  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem("userId");

    // Fetch user data based on user ID
    fetch(`https://uni-link-api-with-ssl.onrender.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Failed to fetch user data:", error));
  }, [user]);

  return (
    <div className="header">
      <div>
        <img src={logo} className="logoImage"></img>
      </div>
      {accountDropdownVisible ? (
        <div className="userAccountContainer">
          <img
            className="profilePictureCircle"
            src={user?.profile_pic ? user.profile_pic : profilePicture}
          ></img>
          <img
            className="userDownArrowImage"
            onClick={() => {
              setAccountDropdownVisible(!accountDropdownVisible);
            }}
            src={downArrow}
          ></img>
        </div>
      ) : (
        <div className="userAccountDropdownContainer">
          <div className="userAccountDropdownNameArrowContainer">
            <img
              className="profilePictureCircle"
              src={user?.profile_pic ? user.profile_pic : profilePicture}
            ></img>

            <h2 className="usernameText">{user.username && user.username}</h2>
            <img
              className="userDownArrowImage"
              onClick={() => {
                setAccountDropdownVisible(!accountDropdownVisible);
              }}
              style={{
                transform: "rotate(180deg)",
              }}
              src={downArrow}
            ></img>
          </div>{" "}
          <h2
            className="userAccountDropdownOptionText"
            onClick={() => {
              setAccountDropdownVisible(!accountDropdownVisible);
              props.setAccountSettingsOpen(!props.accountSettingsOpen);
            }}
          >
            Change Account Details
          </h2>
          <h2 className="userAccountDropdownOptionText" onClick={logOut}>
            Log out →
          </h2>
        </div>
      )}
    </div>
  );
};

export default Header;
