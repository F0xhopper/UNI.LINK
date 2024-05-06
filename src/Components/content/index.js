import { useState } from "react";
import MyLists from "./myLists";
import OpenList from "./openList";
import AccountSettings from "./accountSetting";

const Content = (props) => {
  const [listOpen, setListOpen] = useState();

  return (
    <div className="content">
      {props.accountSettingsOpen && (
        <AccountSettings
          setAccountSettingsOpen={props.setAccountSettingsOpen}
          accountSettingsOpen={props.accountSettingsOpen}
        />
      )}
      {listOpen ? <OpenList /> : <MyLists setListOpen={setListOpen} />}
    </div>
  );
};

export default Content;
