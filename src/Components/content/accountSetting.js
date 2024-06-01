import React, { useState, useEffect } from "react";

const AccountSettings = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_pic: "",
  });
  const updateAccountDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3013/users/${localStorage.getItem("userId")}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            profile_pic: userData.profile_pic,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update list details");
      }

      // Reset form fields and display success message
    } catch (error) {}
  };
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
    props.setAccountSettingsOpen(false);
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData({ ...userData, profile_pic: reader.result });
      // Set the data URL
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
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
            password: data.password,
            profile_pic: data.profile_pic, // Assuming username is provided in the response
          });
        })
        .catch((error) => console.error("Failed to fetch user data:", error));
    }

    // Fetch user data on component mount
    getAccountDetails();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="changeAccountSettingsContainer">
      <div className="changeAccountSettingsProfilePicInputContainer">
        <div className="changeAccountSettingsProfilePictureContainer">
          <img
            className="changeAccountSettingsProfilePictureImage"
            src={userData.profile_pic}
          ></img>{" "}
          <div
            class=""
            style={{
              opacity: userData.profile_pic == "" && "1",
            }}
          >
            <label
              htmlFor="listImage"
              style={{ opacity: !userData.profile_pic && "1" }}
              className="changeAccountSettingsProfilePictureOverlayText"
            >
              {userData.profile_pic == ""
                ? "Add profile pic"
                : "Change profile pic"}
              <input
                className="changeAccountSettingsProfilePictureImageInput"
                id="listImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange} // Handle image upload
              />
            </label>
          </div>
        </div>
      </div>
      <div className="changeAccountSettingsTextInputsContainer">
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
          <div className="accountSettingsInputName">
            Confirm Password Change
          </div>
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
              updateAccountDetails();
              saveSettings();
            }}
          >
            Save Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
