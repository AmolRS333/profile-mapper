import React from "react";

const SearchFilter = ({ filterProfiles }) => {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search profiles..."
        onChange={(e) => filterProfiles(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
      />
    </div>
  );
};

export default SearchFilter;
