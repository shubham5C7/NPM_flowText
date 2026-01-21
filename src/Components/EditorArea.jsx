import React from 'react';

const EditorArea = React.forwardRef(({ onInput, attachments, removeAttachment }, ref) => (
  <div style={{ position: 'relative', minHeight: '350px' }}>
    <div
      ref={ref}
      contentEditable
      onInput={onInput}
      style={{ padding: '25px', paddingBottom: '80px', minHeight: '350px', outline: 'none', fontSize: '16px', lineHeight: '1.6' }}
      data-placeholder="Use @ to mention or start typing..."
    />
    <div style={{ position: 'absolute', bottom: '15px', left: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {attachments.map(file => (
        <div key={file.id} style={{ background: '#f1f3f4', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', border: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
          <span>📎 {file.name}</span>
          <button onClick={() => removeAttachment(file.id)} style={{ border: 'none', background: 'none', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold' }}>×</button>
        </div>
      ))}
    </div>
  </div>
));

export default EditorArea;