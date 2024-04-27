const Sidebar = () => {
  return (
    <div className="sidebar">
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
  );
};

export default Sidebar;
