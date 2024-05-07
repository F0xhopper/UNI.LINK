import React, { useState, useEffect } from "react";

const AccountSettings = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  function saveSettings() {
    const userId = localStorage.getItem("userId");
    let userDataCurrent;
    // Fetch user data based on user ID
    fetch(`http://localhost:3013/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        userDataCurrent = data;

        // Comparison logic inside the .then() block

        if (
          userData.username !== userDataCurrent.username ||
          userData.password !== userDataCurrent.password
        ) {
          console.log("different");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
  useEffect(() => {
    function getAccountDetails() {
      const userId = localStorage.getItem("userId");

      // Fetch user data based on user ID
      fetch(`http://localhost:3013/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          // Set user data fetched from the server
          setUserData({
            ...userData,
            username: data.username,
            password: data.password, // Assuming username is provided in the response
          });
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
    }

    // Fetch user data on component mount
    getAccountDetails();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="changeAccountSettingsContainer">
      <div className="accountSettingsInputNameContainer">
        <div className="accountSettingsInputName">Username</div>
        <input
          className="accountSettingsInput"
          value={userData.username} // Set input value to the fetched username
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          } // Update username in state on input change
        />
      </div>
      <div className="accountSettingsInputNameContainer">
        <div className="accountSettingsInputName">Password</div>
        <input
          className="accountSettingsInput"
          value={userData.password} // Set input value to the fetched password
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          } // Update password in state on input change
        />
      </div>
      <div className="accountSettingsInputNameContainer">
        <div className="accountSettingsInputName">Confirm Password Change</div>
        <input
          className="accountSettingsInput"
          value={userData.confirmPassword} // Set input value to the fetched confirm password
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
          } // Update confirm password in state on input change
        />
      </div>
      <div className="accountSettingsButtonContainer">
        <div className="accountSettingsDeleteButton">Delete Account</div>
        <div
          className="accountSettingsSaveButton"
          onClick={() => {
            saveSettings();
          }}
        >
          Save Settings
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
