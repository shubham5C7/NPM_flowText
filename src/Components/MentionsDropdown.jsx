const MentionsDropdown = ({ mentions, selectedIndex, onSelect }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50px',
      left: '50px',
      border: '1px solid #ccc',
      background: '#fff',
      borderRadius: '5px',
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000
    }}>
      {mentions.map((user, index) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          style={{
            padding: '8px',
            background: index === selectedIndex ? '#eee' : '#fff',
            cursor: 'pointer'
          }}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default MentionsDropdown;
