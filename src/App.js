import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Content from "./Components/content";
import Login from "./Components/login";
import React, { useState, Fragment } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [accountSettingsOpen, setAccountSettingsOpen] = useState();
  return (
    <div className="App">
      {loggedIn ? (
        <React.Fragment>
          <Header
            setLoggedIn={setLoggedIn}
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
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
