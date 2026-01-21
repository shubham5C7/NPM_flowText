import React from 'react';

const ToolbarButton = ({ onClick, title, children }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        padding: '6px 10px',
        margin: '0 2px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
