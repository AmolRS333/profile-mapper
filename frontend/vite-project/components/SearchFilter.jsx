import React from "react";

const SearchFilter = ({ filterProfiles }) => {
  return (
    <input
      type="text"
      placeholder="Search profiles..."
      onChange={(e) => filterProfiles(e.target.value)}
    />
  );
};

export default SearchFilter;
