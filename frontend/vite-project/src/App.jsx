import React from "react";
import { ProfileProvider } from "../context/ProfileContext";
import Home from "../pages/Home";

const App = () => {
  return (
    <ProfileProvider>
      <Home />
    </ProfileProvider>
  );
};

export default App;
