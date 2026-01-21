import React, { useState, useRef } from 'react';
import Toolbar from './Toolbar';
import Editor from './Editor';
import MentionsDropdown from './MentionsDropdown';

const TextEditor = () => {
  // List of users that can be mentioned with @
  const USERS = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Alice Johnson' },
    { id: '4', name: 'Bob Wilson' },
    { id: '5', name: 'Emma Brown' },
  ];

  // ========== STATE MANAGEMENT ==========
  // useRef: Creates a reference to the editor div
  const editorRef = useRef(null);
  
  // useState: Manages the component's state
  const [charCount, setCharCount] = useState(0); // Tracks character count
  const [wordCount, setWordCount] = useState(0); // Tracks word count
  const [showMentions, setShowMentions] = useState(false); // Shows/hides mention dropdown
  const [mentionQuery, setMentionQuery] = useState(''); // Stores text after @
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0); // Selected mention in dropdown

  // ========== HELPER FUNCTIONS ==========
  
  // Function to insert text at cursor position
  const insertText = (text) => {
    editorRef.current.focus(); // Focus on editor
    document.execCommand('insertText', false, text); // Insert text
    updateCounts(); // Update character/word count
  };

  // Function to update character and word counts
  const updateCounts = () => {
    const text = editorRef.current.innerText || '';
    
    // Character count
    setCharCount(text.length);
    
    // Word count (split by spaces and filter empty strings)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  // Function that runs every time user types in editor
  const handleInput = (e) => {
    updateCounts(); // Update counts

    // Check if user typed @ symbol for mentions
    const text = editorRef.current.innerText;
    const lastAt = text.lastIndexOf('@'); // Find last @ position

    if (lastAt !== -1) {
      // Extract text after @
      const query = text.substring(lastAt + 1);
      setMentionQuery(query);
      setShowMentions(true); // Show mention dropdown
    } else {
      setShowMentions(false); // Hide mention dropdown
    }
  };

  // Function to handle keyboard shortcuts
  const handleKeyDown = (e) => {
    // If mention dropdown is open and user presses Enter
    if (showMentions && e.key === 'Enter') {
      e.preventDefault(); // Prevent new line
      
      // Filter users based on search query
      const filtered = USERS.filter(user => 
        user.name.toLowerCase().includes(mentionQuery.toLowerCase())
      );
      
      // Insert first matching user
      if (filtered.length > 0) {
        insertText(`@${filtered[0].name} `);
        setShowMentions(false);
      }
    }
  };

  // Function to clear all text in editor
  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerText = ''; // Clear text
      updateCounts(); // Reset counts
    }
  };

  // Function to filter users based on mention query
  const filteredMentions = USERS.filter(user =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  // ========== COMPONENT RENDER ==========
  return (
    <div className="max-w-4xl mx-auto my-8 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ✨ Modern Text Editor
        </h1>
        <p className="text-gray-600">
          A beautiful, feature-rich text editor with mentions support
        </p>
      </div>

      {/* Editor Container */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 relative">
        {/* Toolbar */}
        <Toolbar
          onBold={() => insertText('**bold**')}
          onItalic={() => insertText('*italic*')}
          onUnderline={() => insertText('_underline_')}
          onClear={handleClear}
        />
        
        {/* Editor Area */}
        <Editor 
          ref={editorRef} 
          onInput={handleInput} 
          onKeyDown={handleKeyDown} 
        />
        
        {/* Footer with stats */}
        <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-6 text-sm">
            {/* Character Count */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Characters:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md font-mono">
                {charCount}
              </span>
            </div>
            
            {/* Word Count */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Words:</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md font-mono">
                {wordCount}
              </span>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Ready</span>
          </div>
        </div>

        {/* Mentions Dropdown (shows when typing @) */}
        {showMentions && (
          <MentionsDropdown
            mentions={filteredMentions}
            selectedIndex={selectedMentionIndex}
            onSelect={(user) => {
              insertText(`@${user.name} `);
              setShowMentions(false);
            }}
          />
        )}
      </div>

      {/* Help text */}
      <div className="mt-4 text-center text-sm text-gray-500">
        💡 Tip: Type <span className="font-mono bg-gray-100 px-2 py-1 rounded">@</span> to mention someone
      </div>
    </div>
  );
};

// ============================================
// EXPORT COMPONENT (for NPM package)
// ============================================
export default TextEditor;