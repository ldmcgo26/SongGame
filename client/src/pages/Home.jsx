import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { playSong } from "../util/spotify";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {   
    const access_token = localStorage.getItem("access_token") 
    if (!access_token) {
      navigate("/login")
    }
  }, []);

  return (
    <div className='flex justify-center'>
      <div>
        <h1>Home Page</h1>
        <button onClick={playSong}>Play this song!</button>
      </div>
    </div>
  );
}
