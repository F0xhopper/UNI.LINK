import { useCallback, useState, useEffect } from "react";
const Sidebar = (props) => {
  const [listForLinkDrop, setListForLinkDrop] = useState("Select List");
  const [linkToDrop, setLinkToDrop] = useState();
  const [myLists, setMyLists] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false); // State to track if dragging over
  const [dropLinkContainerText, setDropLinkContainerText] =
    useState("Drop Link");
  const handleDrop = async (e) => {
    if (setListForLinkDrop !== "Select List") {
      e.preventDefault();
      e.stopPropagation();
      const droppedLink = await e.dataTransfer.getData("text/plain");
      console.log(droppedLink);
      setLinkToDrop(droppedLink);
      addLinkToList(droppedLink);
      setDropLinkContainerText("Dropped Link to" + listForLinkDrop);
      setTimeout(() => {
        setDropLinkContainerText("Drop Link");
        setListForLinkDrop("Select List");
      }, 2000);
    }
  };
  useEffect(() => {
    fetchLists();
  });
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true); // Set state to indicate dragging over
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false); // Set state to indicate dragging left
  };

  const fetchLists = async () => {
    const response = await fetch(
      `http://localhost:3013/lists/${localStorage.getItem("userId")}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch lists");
    }
    const data = await response.json();
    setMyLists(data);
  };
  const addLinkToList = async (link) => {
    try {
      const responseId = await fetch(
        `http://localhost:3013/lists/${listForLinkDrop}/id`
      );
      const data1 = await responseId.json();

      console.log(data1);
      console.log(linkToDrop);

      const response = await fetch(
        `http://localhost:3013/lists/${data1.listId}/links`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            link_name: "Name of the Link", // Replace with actual values
            link_url: link,
            link_type: "Video",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add link to the list");
      }

      const responseData = await response.json();
      console.log("Link added:", responseData.message);
    } catch (error) {
      console.error("Error adding link to the list:", error);
      alert("Failed to add link to the list. Please try again.");
    }
  };

  return (
    <div className="sidebar">
      <div>
        <div
          className={
            props.listsPageOpen == "My Lists"
              ? "sidebarMenuContainerOpen"
              : "sidebarMenuContainer"
          }
          onClick={() => {
            props.setListOpen(false);
            props.setListsPageOpen("My Lists");
          }}
        >
          <h2 className="sidebarMenuText">My Lists</h2>
        </div>{" "}
        <div
          className={
            props.listsPageOpen == "Discover"
              ? "sidebarMenuContainerOpen"
              : "sidebarMenuContainer"
          }
          onClick={() => {
            props.setListOpen(false);
            props.setListsPageOpen("Discover");
          }}
        >
          <h2 className="sidebarMenuText">Discover</h2>
        </div>{" "}
        <div
          className={
            props.listsPageOpen == "Liked"
              ? "sidebarMenuContainerOpen"
              : "sidebarMenuContainer"
          }
          onClick={() => {
            props.setListOpen(false);
            props.setListsPageOpen("Liked");
          }}
        >
          <h2 className="sidebarMenuText">Liked</h2>
        </div>{" "}
      </div>
      <div className="linkDepositContainer">
        {" "}
        <div className="linkDespositSelectorConfirmContainer">
          <select
            className="linkDespositListSelector"
            onChange={(e) => {
              setListForLinkDrop(e.target.value);
            }}
            value={listForLinkDrop}
          >
            <option>Select List</option>
            {myLists.map((list) => {
              return <option>{list.list_name}</option>;
            })}
          </select>{" "}
        </div>
        <div
          className={
            isDraggingOver
              ? `linkDropContainerDraggingOver`
              : `linkDropContainer`
          }
          onDragOver={handleDragOver}
          onMouseLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {dropLinkContainerText}{" "}
          {listForLinkDrop !== "Select List" && "to " + listForLinkDrop}
        </div>{" "}
      </div>
    </div>
  );
};

export default Sidebar;
