import React, { useState } from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import RecipientListDropdown from "./RecipientListDropdown";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { Calendar, Clock, Plus, X, ArrowLeftRight } from "lucide-react";

const ScheduleInput = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [newProfile, setNewProfile] = useState({ name: "", email: "" });

  const [currentProfile, setCurrentProfile] = useState({
    id: 1,
    name: "Yuvraj Singh",
    email: "yuvrajsingh@gmail.com",
    image: "https://cdn-icons-png.flaticon.com/512/4042/4042326.png",
  });

  // Mock profiles data - would come from API

  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "Marry Kehlani",
      email: "kehlani@gmail.com",
      image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@gmail.com",
      image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      email: "sarah@gmail.com",
      image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png",
    },
  ]);

  // Mock data - in real app, this would come from an API
  const recipientLists = {
    active: { name: "Active Subscribers", count: 156 },
    all: { name: "All Users", count: 289 },
    new: { name: "New Users", count: 45 },
    premium: { name: "Premium Users", count: 78 },
  };

  const recipients = [
    { id: 1, name: "Mario", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 2, name: "Kayla", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 3, name: "Maya", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
    { id: 4, name: "Monica", image: "https://cdn-icons-png.flaticon.com/512/4086/4086699.png" },
    { id: 5, name: "John", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
    { id: 6, name: "Jessie", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 7, name: "David", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 8, name: "Jennie", image: "https://cdn-icons-png.flaticon.com/512/4086/4086699.png" },
    { id: 9, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 10, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
    { id: 11, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 12, name: "Maya", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
    { id: 13, name: "Monica", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
    { id: 14, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 15, name: "Jessie", image: "https://cdn-icons-png.flaticon.com/512/4086/4086600.png" },
    { id: 16, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
    { id: 17, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 18, name: "Monica", image: "https://cdn-icons-png.flaticon.com/512/4086/4086699.png" },
    { id: 19, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/15735/15735344.png" },
    { id: 20, name: "Daniel", image: "https://cdn-icons-png.flaticon.com/512/3963/3963408.png" },
  ];

  // Recepients section

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

  const formatDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) return "Today";
    if (date.toDateString() === new Date(Date.now() + 86400000).toDateString())
      return "Tomorrow";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year : "numeric" });
  };

  const formatTime = (time) => {
    return `${time.hours}:${time.minutes.toString().padStart(2, "0")} ${
      time.period
    }`;
  };

  const handleSchedule = () => {
    setIsScheduled(true);
    // Here typically make an API call to schedule the mail
    const scheduleTime = new Date(selectedDate);
    const hours = selectedTime.hours + (selectedTime.period === "PM" ? 12 : 0);
    scheduleTime.setHours(hours, selectedTime.minutes);
    console.log("Scheduling mail for:", scheduleTime);
  };

  return (
    <div className="max-w-xl h-[95vh] w-1/2 flex flex-col justify-between mx-auto bg-white rounded-lg shadow">
      {/* Sender Profile */}
      <div className="border-b p-6 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-500 mb-4 inline-block p-2">Sender Profile</h2>
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
              <ArrowLeftRight className="w-4 h-4"/>
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
          <h3 className="text-lg text-gray-500 mb-4">Choose Date & Time to Publish</h3>
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
      </div>
    </div>
  );
};

export default ScheduleInput;
