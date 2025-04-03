import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ProfileDetails = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">
                  {profile.description || "No description available"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Address
                </h3>
                <p className="text-gray-600">
                  {profile.address || "No address available"}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Location Coordinates
                </h3>
                <p className="text-gray-600">
                  Latitude: {profile.lat}, Longitude: {profile.lng}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Location on Map
              </h3>
              <div className="h-64 w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={[profile.lat, profile.lng]}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[profile.lat, profile.lng]}>
                    <Popup>{profile.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
