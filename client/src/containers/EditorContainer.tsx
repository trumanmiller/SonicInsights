import { useState } from 'react';
import defaultEditorState from '../assets/defaultEditorState';
import EditorContainerSidebar from './components/EditorContainerSidebar';
import './EditorContainer.scss';

import Editor from '@monaco-editor/react';
// import EditorContainerSidebar from './components/EditorContainerSidebar';

function EditorContainer({}) {
  const [editorState, setEditorState] = useState(defaultEditorState);

  return (
    <div id="LoginContainer">
      <EditorContainerSidebar editorState={editorState} />
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

export default EditorContainer;
