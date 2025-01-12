import React, { useState } from "react";
import styles from "../styles/pages/Login.module.css";
import { useNavigate } from "react-router-dom"; 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    try {
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            console.log(data);
            localStorage.setItem("authTokenMarvel", data.accessToken);
            localStorage.setItem("username", data.username);
            navigate("/products"); 
          }
        });
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className={styles.errorMessage}>{error}</p>
          <input
            className={styles.userNameInput}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.formButton} type="submit">Login</button>
        </form>

   
      </div>
    </div>
  );
};

export default Login;
