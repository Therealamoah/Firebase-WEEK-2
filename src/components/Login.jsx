import { useState } from "react";
import useAuthStore from "../store/authStore";

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {
      await login({ email, password });
      alert("Login successful!");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }; 

  return (
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={btnStyle} type="submit">
          Login
        </button>
      </form>
    </>
  );
};

const formStyle = {
  maxWidth: "300px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "lightgreen",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  marginBottom: "10px",
  padding: "8px",
};

const btnStyle = {
  padding: "8px",
  cursor: "pointer",
};

export default Login;
