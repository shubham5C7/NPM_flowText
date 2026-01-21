// import React, { useState, useEffect, useRef } from 'react';

// const USERS = [
//   { id: '1', name: 'John Doe' },
//   { id: '2', name: 'Jane Smith' },
//   { id: '3', name: 'Alice Johnson' },
//   { id: '4', name: 'Bob Wilson' },
//   { id: '5', name: 'Charlie Brown' }
// ];

// const TextEditor = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [charCount, setCharCount] = useState(0);
//   const [showMentions, setShowMentions] = useState(false);
//   const [mentionQuery, setMentionQuery] = useState('');
//   const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
//   const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
//   const editorRef = useRef(null);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.lang = 'en-US';
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;

//       recognitionRef.current.onresult = (event) => {
//         let transcript = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           transcript += event.results[i][0].transcript;
//         }
//         insertText(transcript + ' ');
//       };

//       recognitionRef.current.onerror = () => setIsRecording(false);
//       recognitionRef.current.onend = () => setIsRecording(false);
//     }
//   }, []);

//   const insertText = (text) => {
//     if (editorRef.current) {
//       editorRef.current.focus();
//       document.execCommand('insertText', false, text);
//       updateCharCount();
//     }
//   };

//   const updateCharCount = () => {
//     if (editorRef.current) {
//       const text = editorRef.current.innerText || '';
//       setCharCount(text.length);
//     }
//   };

//   const handleInput = (e) => {
//     updateCharCount();
    
//     // Check for @ mention
//     const selection = window.getSelection();
//     if (selection.rangeCount > 0) {
//       const range = selection.getRangeAt(0);
//       const textBeforeCursor = range.startContainer.textContent?.substring(0, range.startOffset) || '';
//       const lastAtIndex = textBeforeCursor.lastIndexOf('@');
      
//       if (lastAtIndex !== -1 && lastAtIndex === textBeforeCursor.length - 1) {
//         // Just typed @
//         const rect = range.getBoundingClientRect();
//         setMentionPosition({ top: rect.bottom + 5, left: rect.left });
//         setMentionQuery('');
//         setShowMentions(true);
//         setSelectedMentionIndex(0);
//       } else if (lastAtIndex !== -1) {
//         // Typing after @
//         const query = textBeforeCursor.substring(lastAtIndex + 1);
//         if (query.includes(' ')) {
//           setShowMentions(false);
//         } else {
//           setMentionQuery(query);
//           setShowMentions(true);
//         }
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (showMentions) {
//       const filtered = USERS.filter(user =>
//         user.name.toLowerCase().startsWith(mentionQuery.toLowerCase())
//       );

//       if (e.key === 'ArrowDown') {
//         e.preventDefault();
//         setSelectedMentionIndex((prev) => Math.min(filtered.length - 1, prev + 1));
//       } else if (e.key === 'ArrowUp') {
//         e.preventDefault();
//         setSelectedMentionIndex((prev) => Math.max(0, prev - 1));
//       } else if (e.key === 'Enter' && filtered.length > 0) {
//         e.preventDefault();
//         selectMention(filtered[selectedMentionIndex]);
//       } else if (e.key === 'Escape') {
//         setShowMentions(false);
//       }
//     }
//   };

//   const selectMention = (user) => {
//     if (editorRef.current) {
//       const selection = window.getSelection();
//       if (selection.rangeCount > 0) {
//         const range = selection.getRangeAt(0);
//         const textNode = range.startContainer;
//         const textBeforeCursor = textNode.textContent?.substring(0, range.startOffset) || '';
//         const lastAtIndex = textBeforeCursor.lastIndexOf('@');
        
//         if (lastAtIndex !== -1) {
//           const newRange = document.createRange();
//           newRange.setStart(textNode, lastAtIndex);
//           newRange.setEnd(textNode, range.startOffset);
//           newRange.deleteContents();
          
//           const mentionSpan = document.createElement('span');
//           mentionSpan.className = 'mention';
//           mentionSpan.contentEditable = 'false';
//           mentionSpan.textContent = `@${user.name}`;
          
//           const space = document.createTextNode(' ');
//           newRange.insertNode(space);
//           newRange.insertNode(mentionSpan);
          
//           newRange.setStartAfter(space);
//           newRange.collapse(true);
//           selection.removeAllRanges();
//           selection.addRange(newRange);
//         }
//       }
//     }
//     setShowMentions(false);
//     setMentionQuery('');
//   };

//   const execCommand = (command, value = null) => {
//     editorRef.current?.focus();
//     document.execCommand(command, false, value);
//   };

//   const toggleSpeechToText = () => {
//     if (!recognitionRef.current) {
//       alert('Speech recognition is not supported in your browser');
//       return;
//     }
//     if (isRecording) {
//       recognitionRef.current.stop();
//       setIsRecording(false);
//     } else {
//       recognitionRef.current.start();
//       setIsRecording(true);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const fileInfo = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
//       insertText(fileInfo);
//     }
//   };

//   const insertEmoji = () => {
//     const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💡', '🚀', '⭐'];
//     const emoji = emojis[Math.floor(Math.random() * emojis.length)];
//     insertText(emoji);
//   };

//   const filteredMentions = USERS.filter(user =>
//     user.name.toLowerCase().startsWith(mentionQuery.toLowerCase())
//   );

//   const ToolbarButton = ({ onClick, active, disabled, title, children }) => (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       title={title}
//       style={{
//         display: 'inline-flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: '6px 10px',
//         minWidth: '32px',
//         height: '32px',
//         border: 'none',
//         background: active ? '#e8eaed' : 'transparent',
//         color: disabled ? '#9aa0a6' : '#3c4043',
//         borderRadius: '4px',
//         cursor: disabled ? 'not-allowed' : 'pointer',
//         fontSize: '14px',
//         fontWeight: active ? '600' : '400',
//         transition: 'all 0.15s ease',
//       }}
//       onMouseEnter={(e) => {
//         if (!disabled && !active) {
//           e.currentTarget.style.background = '#f1f3f4';
//         }
//       }}
//       onMouseLeave={(e) => {
//         if (!active) {
//           e.currentTarget.style.background = 'transparent';
//         }
//       }}
//     >
//       {children}
//     </button>
//   );

//   const ToolbarDivider = () => (
//     <div style={{
//       width: '1px',
//       height: '20px',
//       background: '#dadce0',
//       margin: '0 4px'
//     }} />
//   );

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: '#f8f9fa',
//       padding: '40px 20px',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       {/* Main Content */}
//       <div style={{
//         width: '100%',
//         maxWidth: '900px',
//         background: '#fff',
//         borderRadius: '8px',
//         boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
//         overflow: 'hidden'
//       }}>
        
//         {/* Toolbar */}
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '2px',
//           padding: '12px 16px',
//           borderBottom: '1px solid #e8eaed',
//           flexWrap: 'wrap',
//           background: '#fff'
//         }}>
//           <ToolbarButton onClick={() => execCommand('bold')} title="Bold (Ctrl+B)">
//             <strong style={{ fontSize: '15px' }}>B</strong>
//           </ToolbarButton>

//           <ToolbarButton onClick={() => execCommand('italic')} title="Italic (Ctrl+I)">
//             <em style={{ fontSize: '15px', fontFamily: 'serif' }}>I</em>
//           </ToolbarButton>

//           <ToolbarButton onClick={() => execCommand('underline')} title="Underline (Ctrl+U)">
//             <span style={{ textDecoration: 'underline', fontSize: '15px' }}>U</span>
//           </ToolbarButton>

//           <ToolbarDivider />

//           <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="3" y1="6" x2="21" y2="6" />
//               <line x1="3" y1="12" x2="15" y2="12" />
//               <line x1="3" y1="18" x2="18" y2="18" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="3" y1="6" x2="21" y2="6" />
//               <line x1="6" y1="12" x2="18" y2="12" />
//               <line x1="4" y1="18" x2="20" y2="18" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="3" y1="6" x2="21" y2="6" />
//               <line x1="9" y1="12" x2="21" y2="12" />
//               <line x1="6" y1="18" x2="21" y2="18" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarDivider />

//           <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="8" y1="6" x2="21" y2="6" />
//               <line x1="8" y1="12" x2="21" y2="12" />
//               <line x1="8" y1="18" x2="21" y2="18" />
//               <circle cx="4" cy="6" r="1" fill="currentColor" />
//               <circle cx="4" cy="12" r="1" fill="currentColor" />
//               <circle cx="4" cy="18" r="1" fill="currentColor" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <line x1="10" y1="6" x2="21" y2="6" />
//               <line x1="10" y1="12" x2="21" y2="12" />
//               <line x1="10" y1="18" x2="21" y2="18" />
//               <path d="M4 6h1v4" />
//               <path d="M4 10h2" />
//               <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarDivider />

//           <ToolbarButton onClick={() => execCommand('undo')} title="Undo (Ctrl+Z)">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M3 7v6h6" />
//               <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarButton onClick={() => execCommand('redo')} title="Redo (Ctrl+Y)">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M21 7v6h-6" />
//               <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarDivider />

//           <ToolbarButton
//             onClick={toggleSpeechToText}
//             active={isRecording}
//             title="Speech to Text"
//           >
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isRecording ? 'white' : 'currentColor'} strokeWidth="2">
//               <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
//               <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
//               <line x1="12" y1="19" x2="12" y2="23" />
//               <line x1="8" y1="23" x2="16" y2="23" />
//             </svg>
//           </ToolbarButton>

//           <ToolbarButton onClick={insertEmoji} title="Insert Emoji">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <circle cx="12" cy="12" r="10" />
//               <path d="M8 14s1.5 2 4 2 4-2 4-2" />
//               <line x1="9" y1="9" x2="9.01" y2="9" />
//               <line x1="15" y1="9" x2="15.01" y2="9" />
//             </svg>
//           </ToolbarButton>

//           <label>
//             <div style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: '6px 10px',
//               minWidth: '32px',
//               height: '32px',
//               borderRadius: '4px',
//               cursor: 'pointer',
//               transition: 'all 0.15s ease',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'}
//             onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//             >
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
//               </svg>
//             </div>
//             <input
//               type="file"
//               onChange={handleFileUpload}
//               style={{ display: 'none' }}
//               accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//             />
//           </label>
//         </div>

//         {/* Editor Content */}
//         <div style={{ position: 'relative', minHeight: '300px' }}>
//           <div
//             ref={editorRef}
//             contentEditable
//             onInput={handleInput}
//             onKeyDown={handleKeyDown}
//             style={{
//               padding: '30px 40px',
//               minHeight: '300px',
//               fontSize: '16px',
//               lineHeight: '1.8',
//               color: '#202124',
//               outline: 'none'
//             }}
//             data-placeholder="Start typing..."
//           />

//           {showMentions && filteredMentions.length > 0 && (
//             <div style={{
//               position: 'fixed',
//               top: `${mentionPosition.top}px`,
//               left: `${mentionPosition.left}px`,
//               background: '#fff',
//               border: '1px solid #dadce0',
//               borderRadius: '8px',
//               boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
//               minWidth: '200px',
//               maxHeight: '240px',
//               overflowY: 'auto',
//               zIndex: 1000
//             }}>
//               {filteredMentions.map((user, index) => (
//                 <div
//                   key={user.id}
//                   style={{
//                     padding: '10px 16px',
//                     cursor: 'pointer',
//                     background: index === selectedMentionIndex ? '#f1f3f4' : '#fff',
//                     color: '#202124',
//                     fontSize: '14px',
//                     transition: 'background 0.15s ease'
//                   }}
//                   onMouseEnter={() => setSelectedMentionIndex(index)}
//                   onClick={() => selectMention(user)}
//                 >
//                   {user.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Character Count at Bottom */}
//         <div style={{
//           padding: '12px 24px',
//           background: '#f8f9fa',
//           borderTop: '1px solid #e8eaed',
//           textAlign: 'right',
//           fontSize: '13px',
//           color: '#5f6368'
//         }}>
//           <span>{charCount} characters</span>
//         </div>
//       </div>

//       <style>{`
//         [contenteditable]:empty:before {
//           content: attr(data-placeholder);
//           color: #9aa0a6;
//           pointer-events: none;
//           position: absolute;
//         }
//         .mention {
//           color: #1a73e8;
//           background: #e8f0fe;
//           padding: 2px 6px;
//           border-radius: 3px;
//           font-weight: 500;
//           user-select: all;
//         }
//         button[style*="background: rgb(234, 67, 53)"] {
//           animation: pulse 1s infinite;
//         }
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.85; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TextEditor;

import React, { useState, useEffect, useRef } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const USERS = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Wilson' },
  { id: '5', name: 'Charlie Brown' }
];

const TextEditor = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const editorRef = useRef(null);
  const recognitionRef = useRef(null);
  const pickerContainerRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      // Change continuous to false to prevent the mic from "looping" previous text
      recognitionRef.current.continuous = false; 
      recognitionRef.current.interimResults = false; // Set to false to only get the final version

      recognitionRef.current.onresult = (event) => {
        // Only take the last result to prevent repeating previous sentences
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        
        if (event.results[last].isFinal) {
          insertText(transcript.trim() + ' ');
        }
      };

      recognitionRef.current.onerror = () => setIsRecording(false);
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (pickerContainerRef.current && !pickerContainerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const insertText = (text) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand('insertText', false, text);
      updateCharCount();
    }
  };

  const updateCharCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      setCharCount(text.length);
    }
  };

  const handleInput = (e) => {
    updateCharCount();
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const textBeforeCursor = range.startContainer.textContent?.substring(0, range.startOffset) || '';
      const lastAtIndex = textBeforeCursor.lastIndexOf('@');
      
      if (lastAtIndex !== -1 && lastAtIndex === textBeforeCursor.length - 1) {
        const rect = range.getBoundingClientRect();
        setMentionPosition({ top: rect.bottom + 5, left: rect.left });
        setMentionQuery('');
        setShowMentions(true);
        setSelectedMentionIndex(0);
      } else if (lastAtIndex !== -1) {
        const query = textBeforeCursor.substring(lastAtIndex + 1);
        if (query.includes(' ')) {
          setShowMentions(false);
        } else {
          setMentionQuery(query);
          setShowMentions(true);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (showMentions) {
      const filtered = USERS.filter(user =>
        user.name.toLowerCase().startsWith(mentionQuery.toLowerCase())
      );
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => Math.min(filtered.length - 1, prev + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Enter' && filtered.length > 0) {
        e.preventDefault();
        selectMention(filtered[selectedMentionIndex]);
      } else if (e.key === 'Escape') {
        setShowMentions(false);
      }
    }
  };

  const selectMention = (user) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = range.startContainer;
        const textBeforeCursor = textNode.textContent?.substring(0, range.startOffset) || '';
        const lastAtIndex = textBeforeCursor.lastIndexOf('@');
        
        if (lastAtIndex !== -1) {
          const newRange = document.createRange();
          newRange.setStart(textNode, lastAtIndex);
          newRange.setEnd(textNode, range.startOffset);
          newRange.deleteContents();
          const mentionSpan = document.createElement('span');
          mentionSpan.className = 'mention';
          mentionSpan.contentEditable = 'false';
          mentionSpan.textContent = `@${user.name}`;
          const space = document.createTextNode(' ');
          newRange.insertNode(space);
          newRange.insertNode(mentionSpan);
          newRange.setStartAfter(space);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    }
    setShowMentions(false);
    setMentionQuery('');
  };

  const execCommand = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const toggleSpeechToText = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileInfo = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      insertText(fileInfo);
    }
  };

  const handleEmojiSelect = (emoji) => {
    insertText(emoji.native);
    setShowEmojiPicker(false);
  };

  const filteredMentions = USERS.filter(user =>
    user.name.toLowerCase().startsWith(mentionQuery.toLowerCase())
  );

  const ToolbarButton = ({ onClick, active, disabled, title, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 10px',
        minWidth: '32px',
        height: '32px',
        border: 'none',
        background: active ? '#e8eaed' : 'transparent',
        color: disabled ? '#9aa0a6' : '#3c4043',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        fontWeight: active ? '600' : '400',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => { if (!disabled && !active) e.currentTarget.style.background = '#f1f3f4'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div style={{ width: '1px', height: '20px', background: '#dadce0', margin: '0 4px' }} />
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', padding: '40px 20px', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '900px', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', padding: '12px 16px', borderBottom: '1px solid #e8eaed', flexWrap: 'wrap', background: '#fff' }}>
          <ToolbarButton onClick={() => execCommand('bold')} title="Bold"><strong>B</strong></ToolbarButton>
          <ToolbarButton onClick={() => execCommand('italic')} title="Italic"><em>I</em></ToolbarButton>
          <ToolbarButton onClick={() => execCommand('underline')} title="Underline"><span style={{ textDecoration: 'underline' }}>U</span></ToolbarButton>
          <ToolbarDivider />
          {/* ... Align buttons ... */}
          <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" /></svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="12" x2="21" y2="12" /><line x1="6" y1="18" x2="21" y2="18" /></svg>
          </ToolbarButton>
          <ToolbarDivider />
          <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6" /><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" /></svg>
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6" /><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" /></svg>
          </ToolbarButton>
          <ToolbarDivider />
          
          <ToolbarButton onClick={toggleSpeechToText} active={isRecording} title="Speech to Text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isRecording ? 'rgb(234, 67, 53)' : 'currentColor'} strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
          </ToolbarButton>

          <div style={{ position: 'relative' }} ref={pickerContainerRef}>
            <ToolbarButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} active={showEmojiPicker} title="Insert Emoji">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
            </ToolbarButton>
            {showEmojiPicker && (
              <div style={{ position: 'absolute', top: '100%', left: '0', zIndex: 1001, marginTop: '8px' }}>
                <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
              </div>
            )}
          </div>

          <label>
            <div style={{ display: 'inline-flex', padding: '6px 10px', cursor: 'pointer' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66" /></svg></div>
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Editor Content */}
        <div style={{ position: 'relative', minHeight: '300px' }}>
          <div ref={editorRef} contentEditable onInput={handleInput} onKeyDown={handleKeyDown} style={{ padding: '30px 40px', minHeight: '300px', fontSize: '16px', lineHeight: '1.8', color: '#202124', outline: 'none' }} data-placeholder="Start typing..." />
          {showMentions && filteredMentions.length > 0 && (
            <div style={{ position: 'fixed', top: `${mentionPosition.top}px`, left: `${mentionPosition.left}px`, background: '#fff', border: '1px solid #dadce0', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', minWidth: '200px', zIndex: 1000 }}>
              {filteredMentions.map((user, index) => (
                <div key={user.id} style={{ padding: '10px 16px', cursor: 'pointer', background: index === selectedMentionIndex ? '#f1f3f4' : '#fff' }} onClick={() => selectMention(user)}>{user.name}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '12px 24px', background: '#f8f9fa', borderTop: '1px solid #e8eaed', textAlign: 'right', fontSize: '13px', color: '#5f6368' }}>
          <span>{charCount} characters</span>
        </div>
      </div>

      <style>{`
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #9aa0a6; pointer-events: none; position: absolute; }
        .mention { color: #1a73e8; background: #e8f0fe; padding: 2px 6px; border-radius: 3px; font-weight: 500; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }
      `}</style>
    </div>
  );
};

export default TextEditor;