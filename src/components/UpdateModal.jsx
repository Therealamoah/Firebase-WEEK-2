import { useState } from "react";

const UpdateModal = ({ student, onUpdate, onCancel }) => {

  // 🆕 LOCAL STATE:
  // Inputs are pre-filled with current student data
  const [name, setName] = useState(student.name);
  const [course, setCourse] = useState(student.course);

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Student</h2>

        <input
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
            style={inputStyle}
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        /> <br/><br/>

        {/* Send updated data back to parent */}
        <button style={updateBtn}
          onClick={() =>
            onUpdate(student.id, name, course)
          }
        >
          Update
        </button>

        {/* Cancel closes the modal */}
        <button style={cancelBtn} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateModal;

const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(31, 4, 98, 0.79)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  };
  
  const modalStyle = {
    backgroundColor: "light-green",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  };
  
  const updateBtn = {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    marginRight: "10px",
  };
  
  const cancelBtn = {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "6px 10px",
  };