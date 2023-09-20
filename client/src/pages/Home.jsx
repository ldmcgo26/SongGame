import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {   
    const access_token = localStorage.getItem("access_token") 
    if (access_token) {
      localStorage.setItem('access_token', access_token);
    } else {
      navigate("/login")
    }
  }, []);

  return (
    <div className='flex justify-center'>
      <div>
        <h1>Home Page</h1>
      </div>
    </div>
  );
}
