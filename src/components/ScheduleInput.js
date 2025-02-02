import React, { useState } from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import RecipientListDropdown from "./RecipientListDropdown";
import { Plus, X} from 'lucide-react';

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
    { id: 10, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 11, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 12, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 13, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 14, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 15, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 16, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 17, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 18, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 19, name: 'Daniel', image: '/api/placeholder/48/48' },
    { id: 20, name: 'Daniel', image: '/api/placeholder/48/48' },

  ];

  // Recepients section 

  const [selectedList, setSelectedList] = useState('active');
  const [showAllRecipients, setShowAllRecipients] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const displayedRecipients = showAllRecipients ? recipients : recipients.slice(0, 15);
  const remainingCount = recipients.length - 15;

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


      {/* Recipient List Selection */}


      <div className="mb-8">
        <h2 className="text-lg text-gray-500 mb-4">Recipient List</h2>
        <RecipientListDropdown 
        showListDropdown = {showListDropdown}
        setShowListDropdown = {setShowListDropdown}
        recipientLists = {recipientLists}
        selectedList = {selectedList}
        setSelectedList = {setSelectedList}
        />
        
        <div className="flex flex-wrap gap-2 max-h-40 justify-between p-4 overflow-scroll scroll-smooth no-scrollbar bg-blue-50 rounded-md">
          {displayedRecipients.map((recipient) => (
            <div
              key={recipient.id}
              className="relative group flex flex-col items-center"
            >
              <button className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100">
                <X className="w-3 h-3" />
              </button>
              <img
                src={recipient.image}
                alt={recipient.name}
                className="w-12 h-12 rounded-full bg-purple-100"
              />
              <span className="text-sm mt-1">{recipient.name}</span>
            </div>
          ))}
          
          {!showAllRecipients && remainingCount > 0 && (
            <button
              onClick={() => setShowAllRecipients(true)}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              +{remainingCount}
            </button>
          )}
          
          <button className="w-12 h-12 rounded-full border-2 border-dashed border-blue-500 flex items-center justify-center text-blue-500">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInput;
