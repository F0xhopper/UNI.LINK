import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Content from "./Components/content";
import Login from "./Components/login";
import React, { useState, Fragment } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div className="App">
      {loggedIn ? (
        <React.Fragment>
          <Header />
          <Sidebar />
          <Content />
        </React.Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
