import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../redux/profileSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <ul className="space-y-6 p-4">
        <li>
          <button 
            className="w-full text-left hover:bg-gray-700 p-2 rounded"
            onClick={() => dispatch(setActiveSection('profile'))}
          >
            User Profile
          </button>
        </li>
        <li>
          <button 
            className="w-full text-left hover:bg-gray-700 p-2 rounded"
            onClick={() => dispatch(setActiveSection('orders'))}
          >
            My Orders
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
