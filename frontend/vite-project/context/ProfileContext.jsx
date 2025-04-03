import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/profiles")
      .then((response) => {
        setProfiles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      });
  }, []);

  return (
    <ProfileContext.Provider value={{ profiles, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};
