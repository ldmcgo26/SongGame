import React, { useState } from 'react';
import axios from "./api"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    axios.get('/login')
      .then((response) => {
        console.log("HI")
        setIsLoggedIn(true)
      })
      .catch((error) => {
        console.error("Error logging in", error)
      });
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
          <h1>Login Page</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Home Page</h1>
          
        </div>
      )}
    </div>
  );
}

export default App;