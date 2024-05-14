import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import React, { useEffect, useState } from "react";

const MyLists = (props) => {
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [originalLists, setOriginalLists] = useState([]);
  const [Lists, setLists] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchLists();
  }, [props.listsPageOpen]);

  const fetchLists = async () => {
    let apiUrl;
    if (props.listsPageOpen === "My Lists") {
      apiUrl = `http://localhost:3013/lists/${localStorage.getItem("userId")}`;
    } else if (props.listsPageOpen === "Discover") {
      apiUrl = "http://localhost:3013/listss/public";
    } else if (props.listsPageOpen === "Liked") {
      apiUrl = `http://localhost:3013/lists/liked/${localStorage.getItem(
        "userId"
      )}`;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch lists");
      }
      const data = await response.json();
      setOriginalLists(data);
      setLists(data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      const filteredLists = originalLists.filter(
        (list) =>
          list.list_name.toLowerCase().includes(searchInput.toLowerCase()) ||
          list.list_description
            .toLowerCase()
            .includes(searchInput.toLowerCase())
      );
      setLists(filteredLists);
    } else {
      setLists(originalLists);
    }
  };
  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3013/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      return userData.username;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      return ""; // Return empty string if user data fetching fails
    }
  };
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
          <input
            className="searchBarInput"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <div className="searchBarButton">
            <h2 className="searchBarButtonText" onClick={handleSearch}>
              Search
            </h2>
          </div>
        </div>
        {sortDropdownVisible ? (
          <div className="sortDropdownContainer">
            <div className="sortDropdownTextArrowContainer">
              <h2 className="sortText">Sorting</h2>
              <img
                className="sortdownArrowImage"
                onClick={() => {
                  console.log(Lists);
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
      </div>
      <div className="myListsMainContainer">
        {Lists.map((list) => (
          <div
            key={list._id}
            className="individualListContainer"
            onClick={() => props.setListOpen(list._id)}
          >
            <img
              className="individualListImage"
              src={list.image}
              alt="List"
            ></img>{" "}
            <div className="individualListTitleLikesContainer">
              <h2 className="individualListTitleText">{list.list_name}</h2>
              <h2 className="individualListTitleText">♡ {list.likes.length}</h2>
            </div>
            <p className="individualListDescriptionText">
              {list.list_description}
            </p>
            {props.listsPageOpen === "Discover" ? (
              <h2 className="individualListDateText">
                {list.created_at} - {fetchUserName(list.userId)} -{" "}
                {list.links.length} Links
              </h2>
            ) : (
              <h2 className="individualListDateText">
                {list.created_at} - {list.links.length} Links
              </h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLists;
