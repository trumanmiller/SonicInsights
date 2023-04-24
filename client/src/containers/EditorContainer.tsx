import { useState } from 'react';
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
          run algo
        </button>
        {/* <button className="raisedNeomorphic">submit solution</button> */}
      </div>
      <div id="Editor" className="raisedNeomorphic">
        <Editor
          // height="100vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={''}
          onChange={(arg) => setEditorState('' + arg)}
        />
      </div>
    </div>
  );
}

export default EditorContainer;
