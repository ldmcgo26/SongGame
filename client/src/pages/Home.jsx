import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
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
