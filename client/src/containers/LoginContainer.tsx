import { useNavigate } from 'react-router-dom';
import './LoginContainer.scss';

function LoginContainer({}) {
  const navigate = useNavigate();
  const redirectHandler = () => {
    location.assign('/login');
  };

  return (
    <div id="LoginContainer">
      <div id="visualIsland">
        <div id="content">
          <div className="raisedNeomorphic" id="infoIsland">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            <br />
            nisi ut aliquip ex ea commodo consequat.
          </div>
          <button
            onClick={redirectHandler}
            className="raisedNeomorphic"
            id="loginButton"
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
