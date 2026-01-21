import React from 'react';

const Editor = React.forwardRef(({ onInput, onKeyDown }, ref) => {
  return (
    <div
      ref={ref}
      contentEditable
      onInput={onInput}
      onKeyDown={onKeyDown}
      style={{
        minHeight: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px'
      }}
      data-placeholder="Start typing..."
    ></div>
  );
});

export default Editor;
