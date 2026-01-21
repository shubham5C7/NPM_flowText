import React, { useState, useEffect, useRef } from 'react';
import { USERS } from './Constants';
import Toolbar from './Toolbar';
import EditorArea from './EditorArea';
import MentionsDropdown from './MentionsDropdown';

const TextEditor = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [attachments, setAttachments] = useState([]);

  const editorRef = useRef(null);
  const recognitionRef = useRef(null);
  const pickerRef = useRef(null);

  // --- Real-time Speech Logic ---
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) insertText(finalTranscript + ' ');
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, []);

  // --- Close Emoji Picker on outside click ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const insertText = (text) => {
    editorRef.current?.focus();
    document.execCommand('insertText', false, text);
    setCharCount(editorRef.current.innerText.length);
  };

  const handleInput = () => {
    setCharCount(editorRef.current.innerText.length);
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const text = range.startContainer.textContent?.substring(0, range.startOffset) || '';
      const lastAt = text.lastIndexOf('@');

      // Mentions Logic: Only show if @ is detected at cursor
      if (lastAt !== -1) {
        const query = text.substring(lastAt + 1);
        if (query.includes(' ')) {
          setShowMentions(false);
        } else {
          const rect = range.getBoundingClientRect();
          setMentionPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX });
          setMentionQuery(query);
          setShowMentions(true);
        }
      } else {
        setShowMentions(false);
      }
    }
  };

  const handleSubmit = () => {
    console.log("🚀 Submit Data:", { 
      content: editorRef.current.innerText, 
      files: attachments 
    });
    editorRef.current.innerHTML = "";
    setAttachments([]);
    setCharCount(0);
    editorRef.current.focus();
  };

  const filteredMentions = USERS.filter(u => 
    u.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '850px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <Toolbar 
        execCommand={(cmd, val) => { editorRef.current.focus(); document.execCommand(cmd, false, val); }}
        toggleMic={() => { 
          if(isRecording) recognitionRef.current.stop(); 
          else recognitionRef.current.start(); 
          setIsRecording(!isRecording); 
        }}
        isRecording={isRecording}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        onEmojiSelect={(e) => insertText(e.native)}
        handleFileUpload={(e) => {
          const file = e.target.files[0];
          if(file) setAttachments([...attachments, { name: file.name, id: Date.now() }]);
        }}
        handleSubmit={handleSubmit}
        pickerRef={pickerRef}
      />
      
      <EditorArea 
        ref={editorRef} 
        onInput={handleInput} 
        attachments={attachments} 
        removeAttachment={(id) => setAttachments(attachments.filter(a => a.id !== id))} 
      />

      {showMentions && filteredMentions.length > 0 && (
        <MentionsDropdown 
          mentions={filteredMentions}
          position={mentionPosition}
          onSelect={(u) => { 
            setShowMentions(false); 
            // Replace the @query part by deleting and inserting
            insertText(`${u.name} `); 
          }}
        />
      )}
      
      <div style={{ padding: '12px 25px', background: '#fcfcfc', borderTop: '1px solid #f0f0f0', textAlign: 'right', color: '#888', fontSize: '13px' }}>
        {charCount} characters
      </div>

      <style>{`
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #bbb; position: absolute; }
        .mention { color: #1a73e8; background: #e8f0fe; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
      `}</style>
    </div>
  );
};

export default TextEditor;