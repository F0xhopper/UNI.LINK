import { useCallback, useState, useEffect } from "react";
const Sidebar = (props) => {
  const [listForLinkDrop, setListForLinkDrop] = useState("Select List");
  const [linkToDrop, setLinkToDrop] = useState();
  const [myLists, setMyLists] = useState([]);
  const handleDrop = async (e) => {
    console.log("ccalled fucniton");
    e.preventDefault();
    e.stopPropagation();
    const droppedLink = await e.dataTransfer.getData("text/plain");

    setLinkToDrop(droppedLink);
    addLinkToList();
  };
  useEffect(() => {
    fetchLists();
  });
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
  const addLinkToList = async () => {
    try {
      const responseId = await fetch(
        `http://localhost:3013/lists/${listForLinkDrop}/id`
      );
      const data1 = await responseId.json();

      console.log(data1);
      console.log(linkToDrop);

      const secondResponse = await fetch(
        `http://localhost:3013/lists/${data1.listId}/links`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            link_name: "Name of the Link",
            link_url: linkToDrop,
            platform: "Platform Name",
          }),
        }
      );

      if (!secondResponse.ok) {
        throw new Error("Failed to add link to the list");
      }

      const responseData = await secondResponse.json();
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
          style={{
            backgroundColor:
              props.listsPageOpen == "My Lists" ? "white" : "black",
            color: props.listsPageOpen == "My Lists" ? "black" : "white",
          }}
          className="sidebarMenuContainer"
          onClick={() => {
            props.setListOpen(false);
            props.setListsPageOpen("My Lists");
          }}
        >
          <h2 className="sidebarMenuText">My Lists</h2>
        </div>{" "}
        <div
          className="sidebarMenuContainer"
          onClick={() => {
            props.setListOpen(false);
            props.setListsPageOpen("Discover");
          }}
          style={{
            backgroundColor:
              props.listsPageOpen == "Discover" ? "white" : "black",
            color: props.listsPageOpen == "Discover" ? "black" : "white",
          }}
        >
          <h2 className="sidebarMenuText">Discover</h2>
        </div>{" "}
        <div
          className="sidebarMenuContainer"
          onClick={() => {
            props.setListOpen(false);
            props.setListsPageOpen("Liked");
          }}
          style={{
            backgroundColor: props.listsPageOpen == "Liked" ? "white" : "black",
            color: props.listsPageOpen == "Liked" ? "black" : "white",
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
            <option>cv</option>
            <option>Benching Benches</option>
          </select>{" "}
        </div>
        <div
          className="linkDropContainer"
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={handleDrop}
        >
          Drop link{" "}
          {listForLinkDrop !== "Select List" && "to " + listForLinkDrop}
        </div>{" "}
      </div>
    </div>
  );
};

export default Sidebar;
