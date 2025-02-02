import React from "react";
import { Check, UserPlus } from "lucide-react";


const ProfileSwitcher = ({
  setCurrentProfile,
  setShowProfileMenu,
  showNewProfileForm,
  profiles,
  currentProfile,
  newProfile,
  setShowNewProfileForm,
  setNewProfile,
  setProfiles
}) => {


  const handleCreateProfile = (e) => {
    e.preventDefault();

    const newProfileData = {
      id: profiles.length + 1,
      ...newProfile,
      image: "/api/placeholder/48/48",
    };

    setProfiles([...profiles, newProfileData]);
    setCurrentProfile(newProfileData);
    setNewProfile({ name: "", email: "" });
    setShowNewProfileForm(false);
    setShowProfileMenu(false);
  };

  return (
    <div className="absolute top-full right-0 mt-1 w-72 bg-white border rounded-lg shadow-lg z-20">
      {!showNewProfileForm ? (
        <div className="p-2">
          <div className="space-y-1">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  setCurrentProfile(profile);
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{profile.name}</div>
                  <div className="text-sm text-gray-500">{profile.email}</div>
                </div>
                {currentProfile.id === profile.id && (
                  <Check className="w-4 h-4 text-blue-600" />
                )}
              </button>
            ))}
          </div>

          <div className="border-t mt-2 pt-2">
            <button
              onClick={() => setShowNewProfileForm(true)}
              className="w-full flex items-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create New Profile</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleCreateProfile} className="p-4">
          <h3 className="font-medium mb-4">Create New Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={newProfile.name}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, name: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={newProfile.email}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, email: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowNewProfileForm(false)}
                className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSwitcher;
