import React, { useState } from "react";
import styles from "../styles/pages/Login.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import CustomInput from "../components/inputs/CustomInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser(username, password);
      navigate("/products");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className={styles.errorMessage}>{error}</p>

          <CustomInput
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <CustomInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.formButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
