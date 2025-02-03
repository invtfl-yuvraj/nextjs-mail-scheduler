import React, { useState, useEffect } from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import RecipientListDropdown from "./RecipientListDropdown";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { Calendar, Clock, Plus, X, ArrowLeftRight } from "lucide-react";

const ScheduleInput = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [currentProfile, setCurrentProfile] = useState({
    id: 1,
    name: "Yuvraj Singh",
    email: "yuvrajsingh@gmail.com",
    image: "https://cdn-icons-png.flaticon.com/512/4042/4042326.png",
  });
  const [profiles, setProfiles] = useState([]);
  const [recipientLists, setRecipientLists] = useState({});
  const [recipients, setRecipients] = useState([]);

  // UI states
  const [selectedList, setSelectedList] = useState("active");
  const [showAllRecipients, setShowAllRecipients] = useState(false);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const displayedRecipients = showAllRecipients
    ? recipients
    : recipients.slice(0, 15);
  const remainingCount = recipients.length - 15;

  // Schedule Section

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Schedule states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({
    hours: 12,
    minutes: 0,
    period: "AM",
  });
  const [isScheduled, setIsScheduled] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [profilesRes, listsRes] = await Promise.all([
          fetch("/api/profiles"),
          fetch("/api/recipients/lists"),
        ]);

        const profilesData = await profilesRes.json();
        const listsData = await listsRes.json();

        setProfiles(profilesData);
        setRecipientLists(listsData);

        // If lists are available, set the first list as the default selected list
        if (listsData && listsData.length > 0) {
          setSelectedList(listsData[0].id);
        }

        // Fetch recipients for the initial selected list
        const recipientsRes = await fetch(`/api/recipients/${selectedList}`);
        const recipientsData = await recipientsRes.json();
        setRecipients(recipientsData);
      } catch (err) {
        setError("Failed to load initial data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch recipients when selected list changes
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const res = await fetch(`/api/recipients/${selectedList}`);
        const data = await res.json();
        setRecipients(data);
      } catch (err) {
        console.error("Failed to fetch recipients:", err);
      }
    };

    if (selectedList) {
      fetchRecipients();
    }
  }, [selectedList]);

  useEffect(() => {
    if (recipientLists.length > 0 && selectedList === null) {
      setSelectedList(0); // Select the first list by default
    }
  }, [recipientLists]);

  const handleAddProfile = async (profile) => {
    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Failed to add profile");

      const newProfile = await res.json();
      setProfiles((prev) => [...prev, newProfile]);
    } catch (err) {
      console.error("Failed to add profile:", err);
    }
  };

  const formatDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) return "Today";
    if (date.toDateString() === new Date(Date.now() + 86400000).toDateString())
      return "Tomorrow";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return `${time.hours}:${time.minutes.toString().padStart(2, "0")} ${
      time.period
    }`;
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSchedule = () => {
    const scheduleTime = new Date(selectedDate);
    const hours =
      selectedTime.hours +
      (selectedTime.period === "PM" && selectedTime.hours !== 12 ? 12 : 0);
    scheduleTime.setHours(hours, selectedTime.minutes);

    // Assuming an API call here
    try {
      // Simulated API call
      // fetch('/api/schedule-mail', { method: 'POST', body: JSON.stringify(...) })

      setIsScheduled(true);
      setShowSuccessPopup(true);

      // Reset fields
      setSelectedDate(new Date());
      setSelectedTime({ hours: 12, minutes: 0, period: "AM" });
      setSelectedList(null);
      setRecipients([]);

      // Auto-close popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    } catch (error) {
      console.error("Scheduling failed", error);
    }
  };

  return (
    <div className="max-w-xl h-[95vh] w-1/2 flex flex-col justify-between mx-auto bg-white rounded-lg shadow">
      {/* Sender Profile */}
      <div className="border-b p-6 bg-gray-100">
        <h2 className="text-xl font-bold text-gray-500 mb-4 inline-block p-2">
          Sender Profile
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <img
              src={currentProfile.image}
              alt={currentProfile.name}
              className="w-12 h-12 rounded-full bg-purple-200"
            />
            <div>
              <h3 className="font-semibold">{currentProfile.name}</h3>
              <p className="text-gray-500 text-sm">{currentProfile.email}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="px-4 py-2 border rounded-md text-white font-bold bg-purple-600 hover:bg-purple-800 flex gap-2 items-center justify-between"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <p>Switch</p>
            </button>
            {showProfileMenu && (
              <ProfileSwitcher
                setCurrentProfile={setCurrentProfile}
                setShowProfileMenu={setShowProfileMenu}
                showNewProfileForm={showNewProfileForm}
                profiles={profiles}
                currentProfile={currentProfile}
                setShowNewProfileForm={setShowNewProfileForm}
                newProfile={newProfile}
                setNewProfile={setNewProfile}
                setProfiles={setProfiles}
              />
            )}
          </div>
        </div>
      </div>

      <div className="p-6 w-full h-full flex flex-col justify-between overflow-scroll no-scrollbar">
        {/* Recipient List Selection */}
        <div className="mb-4">
          <h2 className="text-lg text-gray-500 mb-4">Recipient List</h2>
          <RecipientListDropdown
            showListDropdown={showListDropdown}
            setShowListDropdown={setShowListDropdown}
            recipientLists={recipientLists}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />

          <div className="flex flex-wrap gap-2 h-44 justify-center p-4 overflow-scroll scroll-smooth no-scrollbar rounded-md">
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
        {/* Schedule Section */}
        <div className="">
          <h3 className="text-lg text-gray-500 mb-4">
            Choose Date & Time to Publish
          </h3>
          <div className="space-y-3">
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full flex items-center border rounded-lg p-4 hover:bg-gray-50"
              >
                <span className="flex-1">{formatDate(selectedDate)}</span>
                <Calendar className="w-5 h-5 text-gray-400" />
              </button>
              {showDatePicker && (
                <DatePicker
                  setShowDatePicker={setShowDatePicker}
                  setSelectedDate={setSelectedDate}
                  formatDate={formatDate}
                  selectedDate={selectedDate}
                />
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="w-full flex items-center border rounded-lg p-4 hover:bg-gray-50"
              >
                <span className="flex-1">{formatTime(selectedTime)}</span>
                <Clock className="w-5 h-5 text-gray-400" />
              </button>
              {showTimePicker && (
                <TimePicker
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                  setShowTimePicker={setShowTimePicker}
                  selectedDate={selectedDate}
                />
              )}
            </div>
          </div>
        </div>
        {/* Send Button */}
        <button
          onClick={handleSchedule}
          className="w-full py-4 bg-purple-600 font-semibold text-white rounded-lg hover:bg-purple-800 transition-colors"
        >
          {isScheduled ? "Scheduled" : "Schedule Mail"}
        </button>

        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">
                Mail Scheduled Successfully
              </h2>
              <p className="text-gray-600 mb-4">
                Your mail has been scheduled as requested.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleInput;
