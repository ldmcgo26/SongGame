import { setAccessToken } from "../util/auth";

const login_uri = "http://localhost:3000/auth"

export default function Login() {
  return (
    <div className='flex justify-center'>
      <div>
        <h1>Login Page</h1>
        <a href={login_uri} onClick={setAccessToken}>Login</a>
      </div>
    </div>
  );
}
