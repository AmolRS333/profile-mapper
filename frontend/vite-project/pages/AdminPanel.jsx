import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { profiles, loading, setProfiles, setLoading, fetchProfiles } =
    useContext(ProfileContext);
  const { user, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: "",
    address: "",
    lat: "",
    lng: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchProfiles();
      } finally {
        // Add a small delay to prevent flickering
        setTimeout(() => {
          setInitialLoad(false);
        }, 500);
      }
    };
    loadData();
  }, [fetchProfiles]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/profiles/${editingId}`,
          formData
        );
        setSuccess("Profile updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/profiles", formData);
        setSuccess("Profile added successfully!");
      }
      fetchProfiles();
      setFormData({
        name: "",
        description: "",
        photo: "",
        address: "",
        lat: "",
        lng: "",
      });
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (profile) => {
    setFormData({
      name: profile.name,
      description: profile.description,
      photo: profile.photo,
      address: profile.address,
      lat: profile.lat,
      lng: profile.lng,
    });
    setEditingId(profile._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await axios.delete(`http://localhost:5000/api/profiles/${id}`);
        fetchProfiles();
        setSuccess("Profile deleted successfully!");
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      photo: "",
      address: "",
      lat: "",
      lng: "",
    });
    setEditingId(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
  };

  if (initialLoad) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex items-center space-x-4">
          <span className="text-zinc-400">Welcome, {user?.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Profile" : "Add New Profile"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Latitude
              </label>
              <input
                type="number"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                step="any"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Longitude
              </label>
              <input
                type="number"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                step="any"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : editingId
                ? "Update Profile"
                : "Add Profile"}
            </button>
          </div>
        </form>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Profiles List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map((profile) => (
              <tr key={profile._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {profile.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{profile.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {profile.lat}, {profile.lng}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleView(profile)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(profile)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(profile._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Details Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedProfile.name}
              </h2>
              <button
                onClick={() => setSelectedProfile(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
            <div className="space-y-4">
              {selectedProfile.photo && (
                <img
                  src={selectedProfile.photo}
                  alt={selectedProfile.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <p className="text-gray-700">{selectedProfile.description}</p>
              <div className="text-gray-600">
                <p>
                  <strong>Address:</strong> {selectedProfile.address}
                </p>
                <p>
                  <strong>Location:</strong> {selectedProfile.lat},{" "}
                  {selectedProfile.lng}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
