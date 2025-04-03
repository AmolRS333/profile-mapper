import { useState } from "react";
import axios from "axios";

const AddProfileForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/profiles", profile);
      alert("Profile added!");
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lat"
        placeholder="Latitude"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lng"
        placeholder="Longitude"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Profile</button>
    </form>
  );
};

export default AddProfileForm;
