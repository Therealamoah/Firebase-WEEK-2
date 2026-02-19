import { useEffect, useState } from "react";
import StudentsForm from "./components/StudentsForm";
import StudentsList from "./components/StudentsList";
import useStudentsStore from "./store/studentsStore";
import Register from "./components/Register";
import Login from "./components/Login";
import useAuthStore from "./store/authStore";

const App = () => {
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const loading = useAuthStore((state) => state.loading);
  const listenToAuth = useAuthStore((state) => state.listenToAuth);
  const logout = useAuthStore((state) => state.logout);

  const fetchStudents = useStudentsStore((state) => state.fetchStudents);

  const [showLogin, setShowLogin] = useState(true);

  // Keep session after refresh
  useEffect(() => {
    listenToAuth();
  }, [listenToAuth]);

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading...
      </p>
    );

  return (
    <div style={appStyle}>
      <h1 style={{ textAlign: "center" }}>Student Register</h1>

      {!user ? (
        <>
          {showLogin ? <Login /> : <Register />}

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            {showLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button onClick={() => setShowLogin(!showLogin)}>
              {showLogin ? "Register" : "Login"}
            </button>
          </p>
        </>
      ) : (
        <>
          <p style={{ textAlign: "center" }}>
            Logged in as <strong>{profile?.name || user.email}</strong>
            {profile?.course ? ` - ${profile.course}` : ""}
          </p>

          <button onClick={logout} style={logoutBtn}>
            Logout
          </button>

          <StudentsForm />
          <StudentsList />
        </>
      )}
    </div>
  );
};

export default App;

const appStyle = {
  maxWidth: "400px",
  margin: "40px auto",
  padding: "20px",
  backgroundColor: "green",
  borderRadius: "10px",
};

const logoutBtn = {
  marginTop: "10px",
  padding: "8px",
  cursor: "pointer",
};
