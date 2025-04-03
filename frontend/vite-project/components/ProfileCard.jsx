import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";

const ProfileCard = ({ profile }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!profile) {
    return <p className="text-red-500 text-center">Profile data is missing!</p>;
  }

  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => setShowDetails(true)}
      >
        <div className="p-4">
          <div className="flex items-center space-x-4">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Photo</span>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {profile.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {profile.address || "No address available"}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-600 text-sm line-clamp-2">
            {profile.description || "No description available"}
          </p>
        </div>
      </div>

      {showDetails && (
        <ProfileDetails
          profile={profile}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default ProfileCard;
