import { useState } from 'react';
import defaultEditorState from '../assets/defaultEditorState';
import './EditorContainer.scss';

import Editor from '@monaco-editor/react';

function EditorContainer({}) {
  const [editorState, setEditorState] = useState(defaultEditorState);

  return (
    <div id="LoginContainer">
      <div id="Sidebar" className="raisedNeomorphic">
        <button className="buttonNeomorphic" onClick={runAlgoHandler}>
          Run Algo
        </button>
        <button className="buttonNeomorphic" onClick={() => addAlgoHandler(editorState)}>
          Add Algo
        </button>
      </div>
      <div id="Editor" className="raisedNeomorphic">
        <Editor
          // height="100vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={defaultEditorState}
          onChange={(arg) => setEditorState('' + arg)}
        />
      </div>
    </div>
  );
}

const runAlgoHandler = (): void => {
  console.log('');
};

const addAlgoHandler = (editorState: String): void => {
  fetch('/playlist', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      functionStr: editorState,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status !== 201)
        console.log('ERROR in addAlgoHandler, expect status code 201 got ', data.status);
      else console.log('success adding algo');
    })
    .catch((err) => console.log('ERROR in addAlgoHandler: ', err));
};

export default EditorContainer;
