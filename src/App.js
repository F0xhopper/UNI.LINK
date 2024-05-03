import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Content from "./Components/content";
import Login from "./Components/login";
import React, { useState, Fragment } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState();
  return (
    <div className="App">
      {loggedIn ? (
        <React.Fragment>
          <Header
            accountSettingsOpen={accountSettingsOpen}
            setAccountSettingsOpen={setAccountSettingsOpen}
          />
          <Sidebar />
          <Content
            accountSettingsOpen={accountSettingsOpen}
            setAccountSettingsOpen={setAccountSettingsOpen}
          />
        </React.Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
