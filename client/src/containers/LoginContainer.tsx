import { useNavigate } from 'react-router-dom';
import './LoginContainer.scss';

function LoginContainer({}) {
  const loginRedirectHandler = () => {
    location.assign('/login');
  };
  const editorRedirectHandler = () => {
    location.assign('/editor');
  };

  return (
    <div id="LoginContainer">
      <div id="visualIsland">
        <div id="content">
          <div className="raisedNeomorphic" id="infoIsland">
            SonicInsights is a Spotify playlist generation tool that utilizes user data to create
            personalized playlists with customizable algorithms.
            <br />
            It aims to provide users with a unique and customizable experience, by creating
            playlists based on algorithms that they build.
            <br />
            Authentication through spotify is required for any functionality, but you can try out
            the editor without it.
          </div>
          <div>
            <button onClick={loginRedirectHandler} className="raisedNeomorphic" id="loginButton">
              Login with Spotify
            </button>
            <button onClick={editorRedirectHandler} className="raisedNeomorphic">
              Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
