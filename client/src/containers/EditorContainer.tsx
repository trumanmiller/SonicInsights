import './EditorContainer.scss';

import Editor from '@monaco-editor/react';

function EditorContainer({}) {
  return (
    <div id="LoginContainer">
      <Editor
        height="100vh"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue={''}
        onChange={() => {}}
      />
    </div>
  );
}

export default EditorContainer;
