import { useNavigate, Link } from "react-router-dom";
import axios from "../util/api"

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.get('/auth')
      .then((response) => {
      })
      .catch((error) => {
        console.error("Error logging in", error)
      });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  return (
    <div className='flex justify-center'>
      (
        <div>
          <h1>Login Page</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )
    </div>
  );
}

export default Login;