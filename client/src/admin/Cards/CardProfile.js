import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CardProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Retrieve profile from local storage
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    setProfile(storedProfile);
  }, []);

  const handleUpdateProfile = async () => {
    if (window.confirm("Do you want to update your profile?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          "http://localhost:5066/auth/update-profile",
          profile,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="Profile"
                  src={require("../../assets/img/react.jpg").default}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
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
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <button
                  className="font-normal text-lightBlue-500"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
