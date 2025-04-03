import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { ProfileContext } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import SearchFilter from "../components/SearchFilter";
import LoadingIndicator from "../components/LoadingIndicator";
import ProfileForm from "../components/ProfileForm";
import axios from "axios";

// Fix for Leaflet marker icons
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Home = () => {
  const { profiles, loading, setProfiles, setLoading, fetchProfiles } =
    useContext(ProfileContext);
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();

  // Fallback data fetching if context fails
  useEffect(() => {
    if (profiles.length === 0 && !loading) {
      fetchProfiles();
    }
  }, [profiles, loading, fetchProfiles]);

  // Set initialLoad to false after the first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileAdded = (newProfile) => {
    // Refresh the profiles list
    fetchProfiles();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-6xl mx-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-zinc-500">Profile Mapper</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {showForm ? "Hide Form" : "Add Your Profile"}
        </button>
      </div>

      {showForm && (
        <div className="w-full mb-8">
          <ProfileForm onProfileAdded={handleProfileAdded} />
        </div>
      )}

      <div className="w-full text-zinc-400 max-w-md mb-6">
        Click on profile to see details
      </div>

      {/* Search Filter */}
      <div className="w-full max-w-md mb-6">
        <SearchFilter filterProfiles={handleSearch} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md text-center">
          {error}
        </div>
      )}

      {/* Content area with fixed height to prevent layout shifts */}
      <div className="w-full min-h-[300px]">
        {loading && initialLoad ? (
          <div className="flex justify-center items-center h-[300px]">
            <LoadingIndicator />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => (
                <div
                  key={profile._id}
                  className="cursor-pointer flex justify-center"
                >
                  <ProfileCard profile={profile} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-[200px]">
                <p className="text-gray-500 text-center">No profiles found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
