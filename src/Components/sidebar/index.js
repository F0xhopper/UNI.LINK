const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="sidebarMenuContainer">
          <h2 className="sidebarMenuText">My Lists</h2>
        </div>{" "}
        <div className="sidebarMenuContainer">
          <h2 className="sidebarMenuText">Favourites</h2>
        </div>{" "}
        <div className="sidebarMenuContainer">
          <h2 className="sidebarMenuText">Discover</h2>
        </div>{" "}
        <div className="sidebarMenuContainer">
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
