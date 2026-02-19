import { useState } from "react";
import useAuthStore from "../store/authStore";

const Register = () => {
  const register = useAuthStore((state) => state.register);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !course.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await register({ name, course, email, password });
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }; // ✅ properly closed

  return (
    <>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          style={inputStyle}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={inputStyle}
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

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
          Register
        </button>
      </form>
    </>
  );
};

const formStyle = {
  maxWidth: "300px",
  margin: "20px auto",
  padding: "20px",
  backgroundColor: "lightblue",
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

export default Register;
