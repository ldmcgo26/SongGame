import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playSong, getTopGenres } from "../util/spotify";
import { getAccessToken, logout } from "../util/auth";

const access_token = getAccessToken()

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {   
    if (!access_token) {
      navigate("/login")
    }
  }, [access_token]);

  return (
    <div className='flex justify-center'>
      <div>
        <h1>Home Page</h1>
        <button onClick={playSong}>Play this song!</button>
        <button onClick={getTopGenres}>Get artist</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
