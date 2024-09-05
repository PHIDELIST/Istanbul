import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';
import Orders from '../components/CustomerOrders';

const ProfilePage = () => {
  const activeSection = useSelector((state) => state.profile.activeSection);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <UserProfile />;
      case 'orders':
        return <Orders />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="w-64 bg-gray-800 text-white h-full" />
      <div className="flex-grow p-6 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default ProfilePage;
