import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (window.confirm("Do you want to update your profile?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${backendUrl}/auth/update-profile`,
          profile,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Profile updated successfully!");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div className="px-6">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4 flex flex-col justify-start">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
              {profile.firstName} {profile.lastName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {profile.city}, {profile.country}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600">
              <i className="fas fa-phone mr-2 text-lg text-blueGray-400"></i>{" "}
              {profile.phoneNumber}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600">
              <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>{" "}
              {profile.email}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-600">
              <i className="fas fa-home mr-2 text-lg text-blueGray-400"></i>{" "}
              {profile.address}, {profile.city}, {profile.state} {profile.zipCode}, {profile.country}
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 flex justify-end">
            <div className="relative">
              <img
                alt="Profile"
                src={`${backendUrl}/uploads/images/5_tests.jpg`} 
                className="shadow-xl rounded-full h-auto align-middle border-none max-w-150-px"
              />
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-start">
            <div className="w-full lg:w-9/12 px-4">
              <button
                className="font-normal text-lightBlue-500"
                onClick={openModal}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for updating profile */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <i className="fas fa-times"></i>
            </button>
            <h3 className="text-xl font-semibold mb-4">Update Profile</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">First Name:</label>
                <input
                  type="text"
                  value={profile.firstName || ''}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="First Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Last Name:</label>
                <input
                  type="text"
                  value={profile.lastName || ''}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="Last Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Phone Number:</label>
                <input
                  type="text"
                  value={profile.phoneNumber || ''}
                  onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="Phone Number"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Address:</label>
                <input
                  type="text"
                  value={profile.address || ''}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="Address"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">City:</label>
                <input
                  type="text"
                  value={profile.city || ''}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="City"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">State:</label>
                <input
                  type="text"
                  value={profile.state || ''}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="State"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Zip Code:</label>
                <input
                  type="text"
                  value={profile.zipCode || ''}
                  onChange={(e) => setProfile({ ...profile, zipCode: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="Zip Code"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Country:</label>
                <input
                  type="text"
                  value={profile.country || ''}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="mt-1 p-2 border border-gray-300 rounded-md text-black placeholder-gray-500"
                  placeholder="Country"
                />
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
