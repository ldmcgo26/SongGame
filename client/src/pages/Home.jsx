import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playSong } from "../util/spotify";
import { getAccessToken, logout } from "../util/auth";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {   
    const access_token = getAccessToken() 
    if (!access_token) {
      navigate("/login")
    }
  }, []);

  return (
    <div className='flex justify-center'>
      <div>
        <h1>Home Page</h1>
        <button onClick={playSong}>Play this song!</button>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
