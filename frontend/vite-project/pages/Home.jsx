import React, { useContext, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import SearchFilter from "../components/SearchFilter";
import LoadingIndicator from "../components/LoadingIndicator";

const Home = () => {
  const { profiles, loading } = useContext(ProfileContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="p-4">
      {/* Search Filter */}
      <SearchFilter filterProfiles={handleSearch} />

      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile._id}
                profile={profile}
                onClickSummary={() => handleProfileClick(profile)}
              />
            ))
          ) : (
            <p className="text-gray-500">No profiles found.</p>
          )}
        </div>
      )}

      {/* Map Section */}
      {selectedProfile && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedProfile.name}'s Location
          </h2>
          <MapContainer
            center={[selectedProfile.lat, selectedProfile.lng]}
            zoom={10}
            style={{ width: "100%", height: "400px", marginTop: "10px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[selectedProfile.lat, selectedProfile.lng]}>
              <Popup>{selectedProfile.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Home;
