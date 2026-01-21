import React from 'react';
import ToolbarButton from './ToolbarButton';

const Toolbar = ({ onBold, onItalic, onUnderline, onClear }) => {
  return (
    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl border-b-2 border-blue-200">
      {/* Bold Button */}
      <ToolbarButton onClick={onBold} title="Make text bold">
        <span className="font-bold">B</span>
      </ToolbarButton>
      
      {/* Italic Button */}
      <ToolbarButton onClick={onItalic} title="Make text italic">
        <span className="italic">I</span>
      </ToolbarButton>
      
      {/* Underline Button */}
      <ToolbarButton onClick={onUnderline} title="Underline text">
        <span className="underline">U</span>
      </ToolbarButton>
      
      {/* Divider line */}
      <div className="h-8 w-px bg-gray-300 mx-2"></div>
      
      {/* Clear Button */}
      <ToolbarButton onClick={onClear} title="Clear all text">
        <span>🗑️ Clear</span>
      </ToolbarButton>
    </div>
  );
};


export default Toolbar;
