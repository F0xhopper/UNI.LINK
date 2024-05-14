const Sidebar = (props) => {
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
          <select className="linkDespositListSelector">
            <option>Select List</option> <option>Create New List</option>
            <option>Traks 4 Hoodrates</option>
            <option>Benching Benches</option>
          </select>{" "}
          <div className="linkDropConfirmButton">✔</div>
        </div>
        <div className="linkDropContainer">Drop Link</div>{" "}
      </div>
    </div>
  );
};

export default Sidebar;
