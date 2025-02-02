import React, { useState } from "react";
import ProfileSwitcher from "./ProfileSwitcher";

const ScheduleInput = () => {

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: '', email: '' });

  const [currentProfile, setCurrentProfile] = useState({
    id: 1,
    name: 'Yuvraj Singh',
    email: 'yuvrajsingh@gmail.com',
    image: '/api/placeholder/48/48'
  });

  // Mock profiles data - would come from API

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Marry Kehlani',
      email: 'kehlani@gmail.com',
      image: '/api/placeholder/48/48'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@gmail.com',
      image: '/api/placeholder/48/48'
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      email: 'sarah@gmail.com',
      image: '/api/placeholder/48/48'
    }
  ]);

  // Mock data - in real app, this would come from an API
  const recipientLists = {
    active: { name: 'Active Subscribers', count: 156 },
    all: { name: 'All Users', count: 289 },
    new: { name: 'New Users', count: 45 },
    premium: { name: 'Premium Users', count: 78 }
  };

  const recipients = [
    { id: 1, name: 'Mario', image: '/api/placeholder/48/48' },
    { id: 2, name: 'Kayla', image: '/api/placeholder/48/48' },
    { id: 3, name: 'Maya', image: '/api/placeholder/48/48' },
    { id: 4, name: 'Monica', image: '/api/placeholder/48/48' },
    { id: 5, name: 'Jennie', image: '/api/placeholder/48/48' },
    { id: 6, name: 'Jessie', image: '/api/placeholder/48/48' },
    { id: 7, name: 'David', image: '/api/placeholder/48/48' },
    { id: 8, name: 'John', image: '/api/placeholder/48/48' },
    { id: 9, name: 'Daniel', image: '/api/placeholder/48/48' },
  ];


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Sender Profile */}
      <div className="mb-8">
        <h2 className="text-lg text-gray-500 mb-4">SENDER PROFILE</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium">{currentProfile.name}</h3>
              <p className="text-gray-500 text-sm">{currentProfile.email}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
            >
              Switch
            </button>
            {showProfileMenu && <ProfileSwitcher 
            setCurrentProfile = {setCurrentProfile} 
            setShowProfileMenu = {setShowProfileMenu}
            showNewProfileForm = {showNewProfileForm}
            profiles = {profiles}
            currentProfile = {currentProfile} 
            setShowNewProfileForm = {setShowNewProfileForm}
            newProfile = {newProfile}
            setNewProfile = {setNewProfile}
            setProfiles = {setProfiles}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInput;
