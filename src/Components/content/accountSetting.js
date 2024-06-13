import React, { useState, useEffect } from "react";

const AccountSettings = (props) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_pic: "",
    theme: { themeDisplayName: "", themeClass: "" },
  });

  const themesArray = [
    {
      themeDisplayName: "Light",
      themeClass: "lightTheme",
    },
    {
      themeDisplayName: "Dark",
      themeClass: "darkTheme",
    },
  ];

  const updateAccountDetails = async () => {
    try {
      const response = await fetch(
        `https://uni-link-api-with-ssl.onrender.com/users/${localStorage.getItem(
          "userId"
        )}/update`,
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
            theme: userData.theme,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update list details");
      }

      // Reset form fields and display success message
    } catch (error) {
      console.error("Error updating account details:", error);
    }
  };

  const saveSettings = async () => {
    try {
      await updateAccountDetails();
      props.setAccountSettingsOpen(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData((prevState) => ({
        ...prevState,
        profile_pic: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleThemeChange = (event) => {
    const selectedThemeObj = themesArray.find(
      (theme) => theme.themeDisplayName === event.target.value
    );

    setUserData((prevState) => ({
      ...prevState,
      theme: selectedThemeObj,
    }));
  };

  useEffect(() => {
    const getAccountDetails = async () => {
      const userId = localStorage.getItem("userId");

      try {
        const response = await fetch(
          `https://uni-link-api-with-ssl.onrender.com/users/${userId}`
        );
        const data = await response.json();

        const userTheme = themesArray.find(
          (theme) => theme.themeClass === data.theme.themeClass
        );

        setUserData((prevState) => ({
          ...prevState,
          username: data.username,
          password: data.password,
          profile_pic: data.profile_pic,
          theme: data.theme,
        }));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getAccountDetails();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="changeAccountSettingsContainer">
      <div className="changeAccountSettingsProfilePicInputContainer">
        <div className="changeAccountSettingsProfilePictureContainer">
          <img
            className="changeAccountSettingsProfilePictureImage"
            src={userData.profile_pic}
            alt="Profile"
          />
          <div
            className=""
            style={{
              opacity: userData.profile_pic === "" ? "1" : undefined,
            }}
          >
            <label
              htmlFor="listImage"
              style={{ opacity: !userData.profile_pic ? "1" : undefined }}
              className="changeAccountSettingsProfilePictureOverlayText"
            >
              {userData.profile_pic === ""
                ? "Add profile pic"
                : "Change profile pic"}
              <input
                className="changeAccountSettingsProfilePictureImageInput"
                id="listImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div className="accountSettingsInputNameContainer">
          <div className="accountSettingsInputName">Password</div>
          <input
            className="accountSettingsInput"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="accountSettingsInputNameContainer">
          <div className="accountSettingsInputName">
            Confirm Password Change
          </div>
          <input
            className="accountSettingsInput"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="accountSettingsInputNameContainer">
          <div className="accountSettingsInputName">Theme</div>
          <select
            value={userData.theme.themeDisplayName}
            onChange={handleThemeChange}
            className={`accountSettingsThemeDropdown ${
              userData.theme ? userData.theme.themeClass : ""
            }`}
          >
            {themesArray.map((theme) => (
              <option
                key={theme.themeDisplayName}
                value={theme.themeDisplayName}
              >
                {theme.themeDisplayName}
              </option>
            ))}
          </select>
        </div>
        <div className="accountSettingsButtonContainer">
          <div className="accountSettingsDeleteButton">Delete Account</div>
          <div className="accountSettingsSaveButton" onClick={saveSettings}>
            Save Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
