import React from "react";
import {ChevronDown, Users} from 'lucide-react';

const RecipientListDropdown = ({
    showListDropdown,
    setShowListDropdown,
    recipientLists,
    selectedList,
    setSelectedList
}) => {
  return (

    <div className="relative mb-4">

      <button
        onClick={() => setShowListDropdown(!showListDropdown)}
        className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50" >

        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span>{recipientLists[selectedList].name}</span>
          <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
            {recipientLists[selectedList].count}
          </span>
        </div>

        <ChevronDown className="w-5 h-5 text-gray-500" />
      </button>

      {showListDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">

          {Object.entries(recipientLists).map(([key, list]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedList(key);
                setShowListDropdown(false);
              }}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50">

              <span>{list.name}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                {list.count}
              </span>
            </button>

          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientListDropdown;
