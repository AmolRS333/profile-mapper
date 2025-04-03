import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/profiles");
      setProfiles(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setError("Failed to fetch profiles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        error,
        setProfiles,
        setLoading,
        fetchProfiles,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
