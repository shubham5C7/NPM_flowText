import React from 'react';
import ToolbarButton from './ToolbarButton';

const Toolbar = ({ onBold, onItalic, onUnderline }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <ToolbarButton onClick={onBold} title="Bold">B</ToolbarButton>
      <ToolbarButton onClick={onItalic} title="Italic">I</ToolbarButton>
      <ToolbarButton onClick={onUnderline} title="Underline">U</ToolbarButton>
    </div>
  );
};

export default Toolbar;
