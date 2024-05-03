import { useCallback, useState } from "react";
import logo from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/UNI.LINK-logo.png";
import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import profilePicture from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/profile-picture.png";
const Header = (props) => {
  const [accountDropdownVisible, setAccountDropdownVisible] = useState(true);
  return (
    <div className="header">
      <div>
        <img src={logo} className="logoImage"></img>
      </div>
      {accountDropdownVisible ? (
        <div className="userAccountContainer">
          <img className="profilePictureImage" src={profilePicture}></img>
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
            <h2 className="usernameText">Foxhopper</h2>
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
          <h2 className="userAccountDropdownOptionText">Log out →</h2>
        </div>
      )}
    </div>
  );
};

export default Header;
