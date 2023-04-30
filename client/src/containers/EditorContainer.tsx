import { useState } from 'react';
import listenHistoryExample from '../assets/listenHistoryExample.js';
import './EditorContainer.scss';

import Editor from '@monaco-editor/react';

function EditorContainer({}) {
  const [editorState, setEditorState] = useState('');
  const runAlgoHandler = () => {
    fetch('/');
  };

  return (
    <div id="LoginContainer">
      <div id="Sidebar" className="raisedNeomorphic">
        <button className="buttonNeomorphic" onClick={runAlgoHandler}>
          Run Algo
        </button>
        <button className="buttonNeomorphic">Add Algo</button>
      </div>
      <div id="Editor" className="raisedNeomorphic">
        <Editor
          // height="100vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={'' + listenHistoryExample}
          onChange={(arg) => setEditorState('' + arg)}
        />
      </div>
    </div>
  );
}

export default EditorContainer;
