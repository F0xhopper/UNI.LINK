import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/header";
import Sidebar from "./Components/sidebar";
import Content from "./Components/content";
import Login from "./Components/login";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [listOpen, setListOpen] = useState();
  const [listsPageOpen, setListsPageOpen] = useState("My Lists");
  const [loggedInAccountDetails, setLoggedInAccountDetails] = useState();
  useEffect(() => {
    // Check if user ID is stored in local storage
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Perform automatic login with the retrieved user ID
      // Assuming you have a function to verify the user ID and log them in
      // For example, loginUser(userId)
      loginUser(userId);
    }
  }, []);
  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`https://uni-link-api-with-ssl.onrender.com/users/${userId}`)
        .then((response) => response.json())
        .then((data) => setLoggedInAccountDetails(data))
        .catch((error) => console.error("Failed to fetch user data:", error));
    }
  }, [accountSettingsOpen]);
  // Function to log in the user
  const loginUser = (userId) => {
    // Perform login logic using the provided user ID
    // For example, setLoggedIn(true)
    setLoggedIn(true);
  };

  return (
    <Router>
      <div
        className={`App ${
          loggedInAccountDetails && loggedInAccountDetails.theme.themeClass
        } `}
      >
        <Routes>
          <Route
            path="/"
            element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />}
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setLoggedIn={setLoggedIn} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <>
                  <Header
                    setLoggedIn={setLoggedIn}
                    accountSettingsOpen={accountSettingsOpen}
                    setAccountSettingsOpen={setAccountSettingsOpen}
                  />
                  <Sidebar
                    setListsPageOpen={setListsPageOpen}
                    listsPageOpen={listsPageOpen}
                    listOpen={listOpen}
                    setListOpen={setListOpen}
                  />
                  <Content
                    listsPageOpen={listsPageOpen}
                    listOpen={listOpen}
                    setListOpen={setListOpen}
                    accountSettingsOpen={accountSettingsOpen}
                    setAccountSettingsOpen={setAccountSettingsOpen}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
