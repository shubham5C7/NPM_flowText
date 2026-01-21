import React from 'react';

const MentionsDropdown = ({ mentions, selectedIndex, onSelect }) => {
  // If no mentions found, show a "no results" message
  if (mentions.length === 0) {
    return (
      <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-50">
        <p className="text-gray-500 text-sm">No users found</p>
      </div>
    );
  }

  return (
    <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50 min-w-[200px]">
      {mentions.map((user, index) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          className={`
            px-4 py-3 cursor-pointer transition-colors duration-150
            flex items-center gap-3
            ${index === selectedIndex 
              ? 'bg-blue-100 text-blue-900' 
              : 'hover:bg-gray-100'
            }
          `}
        >
          {/* User Avatar (first letter of name) */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
            {user.name.charAt(0)}
          </div>
          {/* User Name */}
          <span className="font-medium">{user.name}</span>
        </div>
      ))}
    </div>
  );
};


export default MentionsDropdown;
