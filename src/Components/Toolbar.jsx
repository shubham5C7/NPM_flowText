import React from 'react';
import ToolbarButton from './ToolbarButton';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const Toolbar = ({ 
  execCommand, toggleMic, isRecording, 
  showEmojiPicker, setShowEmojiPicker, 
  handleFileUpload, onEmojiSelect, handleSubmit,
  pickerRef
}) => {
  return (
    <div style={{ display: 'flex', padding: '10px', borderBottom: '1px solid #ddd', alignItems: 'center', background: '#fff' }}>
      <ToolbarButton onClick={() => execCommand('bold')} title="Bold"><strong>B</strong></ToolbarButton>
      <ToolbarButton onClick={() => execCommand('italic')} title="Italic"><em>I</em></ToolbarButton>
      <ToolbarButton onClick={() => execCommand('underline')} title="Underline"><u>U</u></ToolbarButton>
      
      <div style={{ width: '1px', height: '20px', background: '#eee', margin: '0 8px' }} />

      <select 
        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer' }} 
        onChange={(e) => execCommand('fontSize', e.target.value)} 
        defaultValue="3"
      >
        <option value="1">Small</option>
        <option value="3">Normal</option>
        <option value="5">Large</option>
        <option value="7">Huge</option>
      </select>

      <div style={{ width: '1px', height: '20px', background: '#eee', margin: '0 8px' }} />

      <ToolbarButton onClick={() => execCommand('justifyLeft')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
      </ToolbarButton>
      <ToolbarButton onClick={() => execCommand('justifyCenter')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
      </ToolbarButton>

      <div style={{ width: '1px', height: '20px', background: '#eee', margin: '0 8px' }} />

      <ToolbarButton onClick={toggleMic} active={isRecording} title="Speech to Text">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isRecording ? 'red' : 'currentColor'} strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      </ToolbarButton>

      <div style={{ position: 'relative' }} ref={pickerRef}>
        <ToolbarButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Emoji">😊</ToolbarButton>
        {showEmojiPicker && (
          <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000, marginTop: '8px' }}>
            <Picker data={data} onEmojiSelect={onEmojiSelect} theme="light" />
          </div>
        )}
      </div>

      <label style={{ cursor: 'pointer', padding: '8px' }} title="Attach File">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
      </label>

      <div style={{ flexGrow: 1 }} />
      <button 
        onClick={handleSubmit} 
        style={{ background: '#1a73e8', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        Submit
      </button>
    </div>
  );
};

export default Toolbar;