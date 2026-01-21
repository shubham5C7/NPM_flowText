import React from 'react';

const Editor = React.forwardRef(({ onInput, onKeyDown }, ref) => {
  return (
    <div
      ref={ref}
      contentEditable
      onInput={onInput}
      onKeyDown={onKeyDown}
      className="
        min-h-[300px] p-5 
        bg-white text-gray-800
        focus:outline-none focus:ring-2 focus:ring-blue-400
        text-base leading-relaxed
      "
      style={{
        // Custom placeholder style (shown when editor is empty)
        empty: 'before:content-[attr(data-placeholder)] before:text-gray-400'
      }}
      data-placeholder="Start typing... Use @ to mention someone"
    ></div>
  );
});

export default Editor;
