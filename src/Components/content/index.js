import { useState } from "react";
import MyLists from "./myLists";
import OpenList from "./openList";
import AccountSettings from "./accountSetting";

const Content = (props) => {
  const [listOpen, setListOpen] = useState();
  const [creatingList, setCreatingList] = useState();

  return (
    <div className="content">
      {props.accountSettingsOpen && (
        <AccountSettings
          setAccountSettingsOpen={props.setAccountSettingsOpen}
          accountSettingsOpen={props.accountSettingsOpen}
        />
      )}
      {listOpen ? (
        <OpenList
          setListOpen={setListOpen}
          listOpen={listOpen}
          setCreatingList={setCreatingList}
          creatingList={creatingList}
        />
      ) : (
        <MyLists setCreatingList={setCreatingList} setListOpen={setListOpen} />
      )}
    </div>
  );
};

export default Content;
