import React from 'react';

const ToolbarButton = ({ onClick, title, active, children }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      padding: '8px',
      margin: '0 2px',
      border: 'none',
      background: active ? '#e8f0fe' : 'transparent',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      color: active ? '#1a73e8' : '#444',
      transition: 'all 0.2s'
    }}
  >
    {children}
  </button>
);

export default ToolbarButton;