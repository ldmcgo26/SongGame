import { useNavigate } from "react-router-dom";
import axios from "../util/api";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.get('/auth')
      .then((response) => {
        localStorage.setItem('accessToken', response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };

  return (
    <div className='flex justify-center'>
      <div>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
