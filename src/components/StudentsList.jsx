import { useState } from "react";

// 🆕 NEW (ZUSTAND):
import useStuedentsStore from "../store/studentsStore";

import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const StudentsList = () => {
  // 🔹 Get students AND loading state from store
  const students = useStuedentsStore((state) => state.students);
  const loading = useStuedentsStore((state) => state.loading);

  const deleteStudent = useStuedentsStore((state) => state.deleteStudent);
  const updateStudent = useStuedentsStore((state) => state.updateStudent);

  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const handleConfirmDelete = (id) => {
    deleteStudent(id);
    setStudentToDelete(null);
  };

  const handleUpdate = (id, name, course) => {
    updateStudent(id, { name, course });
    setStudentToEdit(null);
  };

  // 🔹 Show loading message while fetching students from Firebase
  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading students...
      </p>
    );
  }

  return (
    <div style={listStyle}>
      {students.map((student) => (
        <div key={student.id} style={itemStyle}>
          <span>
            {student.name}: {student.course}
          </span>
          <div>
            <button style={editBtn} onClick={() => setStudentToEdit(student)}>
              Edit
            </button>
            <button
              style={deleteBtn}
              onClick={() => setStudentToDelete(student)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {studentToDelete && (
        <DeleteModal
          student={studentToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setStudentToDelete(null)}
        />
      )}

      {studentToEdit && (
        <UpdateModal
          student={studentToEdit}
          onUpdate={handleUpdate}
          onCancel={() => setStudentToEdit(null)}
        />
      )}
    </div>
  );
};

export default StudentsList;

// 🎨 STYLES ONLY — NO STATE OR LOGIC CHANGES
const listStyle = {
  marginTop: "20px",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#79cf79",
  marginBottom: "6px",
  padding: "8px",
  borderRadius: "6px",
};

const editBtn = {
  marginRight: "8px",
};

const deleteBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "4px 8px",
  borderRadius: "4px",
};
