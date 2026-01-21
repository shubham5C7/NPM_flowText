import React from 'react';

const ToolbarButton = ({ onClick, title, children, isActive }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        px-3 py-2 mx-1 rounded-lg font-semibold text-sm
        transition-all duration-200 ease-in-out
        ${isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
        }
        hover:shadow-lg active:scale-95
      `}
    >
      {children}
    </button>
  );
};
export default ToolbarButton;
