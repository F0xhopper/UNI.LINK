import { useState } from "react";
import MyLists from "./Lists";
import OpenList from "./openList";
import AccountSettings from "./accountSetting";

const Content = (props) => {
  const [creatingList, setCreatingList] = useState();
  return (
    <div className="content">
      {props.accountSettingsOpen && (
        <AccountSettings
          setAccountSettingsOpen={props.setAccountSettingsOpen}
          accountSettingsOpen={props.accountSettingsOpen}
        />
      )}
      {props.listOpen ? (
        <OpenList
          setListOpen={props.setListOpen}
          listOpen={props.listOpen}
          setCreatingList={setCreatingList}
          creatingList={creatingList}
        />
      ) : (
        <MyLists
          listsPageOpen={props.listsPageOpen}
          setCreatingList={setCreatingList}
          setListOpen={props.setListOpen}
        />
      )}
    </div>
  );
};

export default Content;
