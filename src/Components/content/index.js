import { useState } from "react";
import MyLists from "./myLists";
import OpenList from "./openList";
const Content = () => {
  const [listOpen, setListOpen] = useState(true);
  return <div className="content">{listOpen ? <OpenList /> : <MyLists />}</div>;
};

export default Content;
