// 🆕 IMPORTING useState FROM REACT:
// Even though we are using Zustand, we STILL need useState
// because form inputs (name and course) are LOCAL to this component.
import { useState } from "react";

// 🆕 IMPORTING THE ZUSTAND STORE:
// This gives this component access to the GLOBAL students store.
// From here, we can read state or call actions like addStudents().
import useStuedentsStore from "../store/studentsStore";

const StudentForm = () => {

  // ✅ STILL LOCAL STATE:
  // These are form inputs, so they remain local to this component.
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  // 🆕 NEW (ZUSTAND):
  // We are getting the ADD action from the global store.
  // This replaces the setStudents function that was passed as props before.
  const addStudents = useStuedentsStore((state) => state.addStudents);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION (UNCHANGED):
    // We prevent empty form submission.
    if (!name.trim() || !course.trim()) {
      alert("Please fill the form");
      return;
    }

    // ✅ SAME DATA STRUCTURE AS BEFORE:
    // We are still creating a student object the same way.
    // const newStudent = {
    //   id: Date.now(),
    //   name,
    //   course,
    // };

        addStudents({
           name,
           course,
           });
 
  




    // ❌ REMOVED (LOCAL STATE VERSION):
    // This line used to update state in App.jsx via props.
    // setStudents((prevStudents) => [...prevStudents, newStudent]);

    // 🔁 CHANGED:
    // Instead of updating local state through props,
    // we now send the new student to the global store.
    addStudents(newStudent);

    // ✅ RESET FORM INPUTS (UNCHANGED):
    setName("");
    setCourse("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Enter The Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        style={inputStyle}
      />
      <button style={buttonStyle}>Add Student</button>
    </form>
  );
};

export default StudentForm;

// 🎨 STYLES ONLY — NO STATE OR LOGIC CHANGES
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "8px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
};



