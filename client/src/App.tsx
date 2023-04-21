import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';

import LoginContainer from './containers/LoginContainer';
import EditorContainer from './containers/EditorContainer';

function App() {
  return (
    <div className="App" id="router">
      <Router>
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route path="/editor" element={<EditorContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
