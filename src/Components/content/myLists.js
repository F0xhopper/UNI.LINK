import example from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/34ca39ba71e3440bb6196601075e53f5.jpg";
import example2 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/6c2844e70e7ab024197ec10a45a2d04f.jpg";
import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import React, { Fragment } from "react";

const MyLists = () => {
  return (
    <div>
      <div className="myListsSeachSortContainer">
        <div className="searchBarContainer">
          <input className="searchBarInput"></input>
          <div className="searchBarButton">
            <h2 className="searchBarButtonText">Search</h2>
          </div>
        </div>

        <div className="sortContainer">
          <h2 className="sortText">Sorting</h2>
          <img className="sortdownArrowImage" src={downArrow}></img>
        </div>
      </div>{" "}
      <div className="myListsMainContainer">
        <div className="individualListContainer">
          <img className="individualListImage" src={example}></img>
          <h2 className="individualListTitleText">♫ Traks 4 Hoodrates </h2>
          <p className="individualListDescriptionText">
            Made for those hoodrats that cant help but to boogie.Made for those
            hoodrats that cant help but to boogie.Made for those hoodrats that
            cant help but to boogie.
          </p>
          <h2 className="individualListDateText">30-3-20 - 18 Links</h2>
        </div>{" "}
        <div className="individualListContainer">
          <img className="individualListImage" src={example2}></img>
          <h2 className="individualListTitleText"> ▶︎ Constantinople fell </h2>
          <p className="individualListDescriptionText">
            Constantinople developed into a thriving port thanks to its prime
            geographic location between Europe and Asia and its natural harbor.
          </p>
          <h2 className="individualListDateText">24-4-20 - 21 Links</h2>
        </div>
      </div>
    </div>
  );
};

export default MyLists;
