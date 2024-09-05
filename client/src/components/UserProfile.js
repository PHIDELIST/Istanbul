import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from "../utils";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${backendUrl}/auth/profile`)
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      await axios.post(`${backendUrl}/auth/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setImage(URL.createObjectURL(file)); // Preview uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axios.put(`${backendUrl}/auth/update-profile`, profile)
      .then(response => alert('Profile updated successfully'))
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={image || 'http://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-200"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            onClick={handleImageUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleUpdateProfile} className="w-full max-w-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">First Name:</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Last Name:</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Email:</label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="mt-1 p-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Phone Number:</label>
              <input
                type="text"
                value={profile.phoneNumber || ''}
                onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Address:</label>
              <input
                type="text"
                value={profile.address || ''}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">City:</label>
              <input
                type="text"
                value={profile.city || ''}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">State:</label>
              <input
                type="text"
                value={profile.state || ''}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Zip Code:</label>
              <input
                type="text"
                value={profile.zipCode || ''}
                onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Country:</label>
              <input
                type="text"
                value={profile.country || ''}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
