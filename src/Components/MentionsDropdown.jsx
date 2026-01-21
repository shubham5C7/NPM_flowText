import React from 'react';

const MentionsDropdown = ({ mentions, position, onSelect }) => {
  return (
    <div style={{
      position: 'fixed',
      top: `${position.top}px`,
      left: `${position.left}px`,
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
      zIndex: 2000,
      minWidth: '180px',
      maxHeight: '200px',
      overflowY: 'auto'
    }}>
      {mentions.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: '14px',
            borderBottom: '1px solid #f9f9f9',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#f1f3f4'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default MentionsDropdown;