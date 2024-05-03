const AccountSettings = (props) => {
  return (
    <div className="changeAccountSettingsContainer">
      <div className="accountSettingsInputNameContainer">
        {" "}
        <div className="accountSettingsInputName">Username</div>
        <input className="accountSettingsInput"></input>
      </div>{" "}
      <div className="accountSettingsInputNameContainer">
        {" "}
        <div className="accountSettingsInputName">Password</div>
        <input className="accountSettingsInput"></input>
      </div>{" "}
      <div className="accountSettingsInputNameContainer">
        {" "}
        <div className="accountSettingsInputName">Confirm Password Change</div>
        <input className="accountSettingsInput"></input>
      </div>{" "}
      <div className="accountSettingsButtonContainer">
        <div className="accountSettingsDeleteButton">Delete Account</div>
        <div
          className="accountSettingsSaveButton"
          onClick={() => {
            props.setAccountSettingsOpen(!props.accountSettingsOpen);
          }}
        >
          Save Settings
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
