import { useCallback, useState, useEffect } from "react";
import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";
import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import profilePicture from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/profile-picture.png";
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
    fetch(`http://localhost:3013/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Failed to fetch user data:", error));
  }, []);

  return (
    <div className="header">
      <div>
        <img src={logo} className="logoImage"></img>
      </div>
      {accountDropdownVisible ? (
        <div className="userAccountContainer">
          <div className="profilePictureCircle">
            {user ? user.username.substring(0, 1) : ""}
          </div>
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
            <h2 className="usernameText">{user.username}</h2>
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
