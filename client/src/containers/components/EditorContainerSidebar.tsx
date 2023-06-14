export interface EditorContainerSidebarProps {
  editorState: String;
}

function EditorContainerSidebar(props: EditorContainerSidebarProps) {
  const { editorState } = props;
  return (
    <div id="Sidebar" className="raisedNeomorphic">
      <button className="buttonNeomorphic" onClick={runAlgoHandler}>
        Run Algo
      </button>
      <button className="buttonNeomorphic" onClick={() => addAlgoHandler(editorState)}>
        Add Algo
      </button>
    </div>
  );
}

const runAlgoHandler = (): void => {
  console.log('running algo handler');
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

export default EditorContainerSidebar;
