import example from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/34ca39ba71e3440bb6196601075e53f5.jpg";
import example2 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/6c2844e70e7ab024197ec10a45a2d04f.jpg";
import example3 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/dde3c421e5aec5523e236b5ebcede04c.jpg";
import example4 from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/d553e2fe73a9c51da337a13ab105480f.jpg";
import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import React, { Fragment, useEffect, useState } from "react";

const MyLists = (props) => {
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3013/lists/${localStorage.getItem("userId")}`
        ); // Change the URL according to your backend API
        if (!response.ok) {
          throw new Error("Failed to fetch user lists");
        }
        const data = await response.json();
        setUserLists(data); // Assuming the response contains an array of lists
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };

    fetchUserLists();
    console.log(userLists);
  }, []);
  return (
    <div>
      <div className="myListsCreateSearchSortContainer">
        <div className="searchBarContainer">
          <div
            className="createListButton"
            onClick={() => {
              props.setCreatingList(true);
              props.setListOpen(true);
            }}
          >
            +
          </div>
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
                  console.log(userLists);
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
        {userLists.map((list) => {
          return (
            <div
              className="individualListContainer"
              onClick={() => {
                props.setListOpen(list._id);
              }}
            >
              <img className="individualListImage" src={list.image}></img>{" "}
              <div className="individualListTitleLikesContainer">
                {" "}
                <h2 className="individualListTitleText"> {list.list_name} </h2>
                <h2 className="individualListTitleText">
                  ♡ {list.likes.length}
                </h2>
              </div>
              <p className="individualListDescriptionText">
                {list.list_description}
              </p>
              <h2 className="individualListDateText">
                {list.created_at} - {list.links.length} Links
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLists;
