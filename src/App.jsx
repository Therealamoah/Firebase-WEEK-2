import { useEffect } from "react";
import StudentsForm from "./components/StudentsForm";
import StudentsList from "./components/StudentsList";
import useStuedentsStore from "./store/studentsStore";

const App = () => {
  const fetchStudents = useStuedentsStore((state) => state.fetchStudents);

  useEffect(() => {
    fetchStudents(); // fetch from Firebase on page load
  }, [fetchStudents]);

  return (
    <div style={appStyle}>
      <h1 style={{ textAlign: "center" }}>Student Register</h1>
      <StudentsForm />
      <StudentsList />
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
