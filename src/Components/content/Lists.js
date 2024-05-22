import downArrow from "/Users/edenphillips/Desktop/Projects/uni.listv2/src/Images/down-arrow.png";
import React, { useEffect, useState } from "react";

const MyLists = (props) => {
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [originalLists, setOriginalLists] = useState([]);
  const [Lists, setLists] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [sortingType, setSortingType] = useState("Sorting");

  useEffect(() => {
    setLists(null);
    fetchLists();
    console.log("got" + Lists);
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

      // Fetch username for each list
      const listsWithUsername = await Promise.all(
        data.map(async (list) => {
          const username = await fetchUserName(list.userId);
          return { ...list, username }; // Add username to list object
        })
      );

      setOriginalLists(listsWithUsername);
      setLists(listsWithUsername);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };
  const calculateListType = (list) => {
    if (list) {
      if (list.links.length == 0) {
        return "";
      } else if (list.links.every((link) => link.link_type == "Video")) {
        return "▶︎";
      } else if (list.links.every((link) => link.link_type == "Informative")) {
        return "📓";
      } else if (list.links.every((link) => link.link_type == "Song")) {
        return "♫";
      } else if (list.links.every((link) => link.link_type == "Item")) {
        return "🧺";
      } else {
        return "∞";
      }
    }
  };
  const isLiked = (list) => {
    if (list.likes.includes(localStorage.getItem("userId"))) {
      return "♥";
    } else {
      return "♡";
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
  const sortListsByDate = () => {
    const sortedLists = [...Lists].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setLists(sortedLists);
    setSortingType("Newest-Oldest");
  };

  const sortListsAlphabetically = () => {
    const sortedLists = [...Lists].sort((a, b) =>
      a.list_name.localeCompare(b.list_name)
    );
    setLists(sortedLists);
    setSortingType("A-Z");
  };

  const sortListsByLikes = () => {
    const sortedLists = [...Lists].sort(
      (a, b) => b.likes.length - a.likes.length
    );
    setLists(sortedLists);
    setSortingType("Most-Least Likes");
  };
  const sortListsByDateReverse = () => {
    const sortedLists = [...Lists].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setLists(sortedLists);
    setSortingType("Oldest-Newest");
  };

  const sortListsAlphabeticallyReverse = () => {
    const sortedLists = [...Lists].sort((a, b) =>
      b.list_name.localeCompare(a.list_name)
    );
    setLists(sortedLists);
    setSortingType("Z-A");
  };

  const sortListsByLikesReverse = () => {
    const sortedLists = [...Lists].sort(
      (a, b) => a.likes.length - b.likes.length
    );
    setLists(sortedLists);
    setSortingType("Least-Most Likes");
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
              <h2 className="sortText">{sortingType}</h2>
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
            {sortingType != "A-Z" && (
              <h2
                className="sortDropdownOptionText"
                onClick={sortListsAlphabetically}
              >
                A-Z
              </h2>
            )}{" "}
            {sortingType != "Z-A" && (
              <h2
                className="sortDropdownOptionText"
                onClick={sortListsAlphabeticallyReverse}
              >
                Z-A
              </h2>
            )}{" "}
            {sortingType != "Newest-Oldest" && (
              <h2 className="sortDropdownOptionText" onClick={sortListsByDate}>
                Newest-Oldest
              </h2>
            )}
            {sortingType != "Oldest-Newest" && (
              <h2
                className="sortDropdownOptionText"
                onClick={sortListsByDateReverse}
              >
                Oldest-Newests
              </h2>
            )}
            {sortingType != "Most-Least Likesnpm " && (
              <h2 className="sortDropdownOptionText" onClick={sortListsByLikes}>
                Most-Least Likes
              </h2>
            )}
            {sortingType != "Least-Most Likesnpm " && (
              <h2
                className="sortDropdownOptionText"
                onClick={sortListsByLikesReverse}
              >
                Least-Most Likes
              </h2>
            )}
          </div>
        ) : (
          <div className="sortContainer">
            <h2 className="sortText">{sortingType}</h2>
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
      <div
        className={
          props.accountSettingsOpen
            ? "myListsMainContainerAccountSettingsOpen"
            : "myListsMainContainer"
        }
      >
        {Lists
          ? Lists.map((list) => (
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
                  <h2 className="individualListTitleText">
                    {calculateListType(list)} {list.list_name}
                  </h2>
                  <h2 className="individualListTitleText">
                    {isLiked(list)} {list.likes.length}
                  </h2>
                </div>
                <div className="individualListDescriptionTextContainer">
                  <p className="individualListDescriptionText">
                    {list.list_description}
                  </p>
                </div>
                {props.listsPageOpen === "Discover" ? (
                  <h2 className="individualListDateText">
                    {list.created_at} - {list.username} - {list.links.length}{" "}
                    Links
                  </h2>
                ) : (
                  <h2 className="individualListDateText">
                    {list.created_at} - {list.links.length} Links
                  </h2>
                )}
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default MyLists;
