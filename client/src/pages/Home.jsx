import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playSong, getTopGenres } from "../util/spotify";
import { getAccessToken, logout } from "../util/auth";

const access_token = getAccessToken()

export default function Home() {
  const navigate = useNavigate();

  const play = () => navigate("/play")

  useEffect(() => {   
    if (!access_token) {
      navigate("/login")
    }
  }, [access_token]);

  return (
    <div>
      <div className="flex justify-center bg-blue-500 text-9xl text-white px-4 py-2 rounded-full mb-4">
        <p>Song Game</p>
      </div>
      <div className="flex justify-center flex-col ">
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full mb-2" onClick={play}>
          Play!
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
