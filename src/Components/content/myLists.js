import example from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/34ca39ba71e3440bb6196601075e53f5.jpg";
import example2 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/6c2844e70e7ab024197ec10a45a2d04f.jpg";
import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import React, { Fragment, useState } from "react";

const MyLists = () => {
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  return (
    <div>
      <div className="myListsCreateSearchSortContainer">
        <div className="searchBarContainer">
          <div className="createListButton">+</div>
          <input className="searchBarInput"></input>
          <div className="searchBarButton">
            <h2 className="searchBarButtonText">Search</h2>
          </div>
        </div>
        {sortDropdownVisible ? (
          <div className="sortDropdownContainer">
            <div className="sortDropdownTextArrowContainer">
              <h2 className="sortText">Sorting</h2>
              <img
                className="sortdownArrowImage"
                onClick={() => {
                  setSortDropdownVisible(!sortDropdownVisible);
                }}
                style={{
                  transform: "rotate(180deg)",
                }}
                src={downArrow}
              ></img>
            </div>
            <h2 className="sortDropdownOptionText">A-Z</h2>
            <h2 className="sortDropdownOptionText">Newest-Oldeest</h2>
            <h2 className="sortDropdownOptionText">Oldest-Newest</h2>
            <h2 className="sortDropdownOptionText">Most-Least</h2>
            <h2 className="sortDropdownOptionText">Least-Most Likes</h2>
            <h2 className="sortDropdownOptionText"></h2>
          </div>
        ) : (
          <div className="sortContainer">
            <h2 className="sortText">Sorting</h2>
            <img
              className="sortdownArrowImage"
              src={downArrow}
              onClick={() => {
                setSortDropdownVisible(!sortDropdownVisible);
              }}
            ></img>
          </div>
        )}
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
        <div className="individualListContainer">
          <img className="individualListImage" src={example}></img>
          <h2 className="individualListTitleText">∞ Benching Benches </h2>
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
