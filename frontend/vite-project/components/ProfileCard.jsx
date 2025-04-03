import React from "react";

const ProfileCard = ({ profile, onClickSummary }) => {
  return (
    <div className="card" onClick={() => onClickSummary(profile)}>
      <img src={profile.photo} alt={profile.name} />
      <h3>{profile.name}</h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default ProfileCard;
