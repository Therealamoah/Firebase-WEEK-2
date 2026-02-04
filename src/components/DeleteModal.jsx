import React from "react";

const DeleteModal = ({ student, onConfirm, onCancel }) => {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Show student name so user knows what they are deleting */}
        <p>
          Are you sure you want to delete{" "}
          <strong>{student.name}</strong>?
        </p>

        {/* Confirm delete:
            Sends student.id back to StudentsList */}
        <button
          style={confirmBtn}
          onClick={() => onConfirm(student.id)}
        >
          Yes, Delete
        </button>

        {/* Cancel just closes the modal */}
        <button style={cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(97, 1, 1, 0.87)",
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

const confirmBtn = {
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
