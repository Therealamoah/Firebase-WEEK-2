import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// Firebase imports
import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "../firebase";

const useStudentsStore = create((set) => ({
  students: [],

  //  Fetch students from Firebase
  fetchStudents: async () => {
    try {
      const studentsCol = collection(db, "students"); // "students" collection
      const snapshot = await getDocs(studentsCol);
      const students = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ students });
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  },

  addStudents: async (student) => {
    const newStudent = { ...student, id: uuidv4() };

    // Update store first (optimistic update)
    set((state) => ({
      students: [...state.students, newStudent],
    }));

    // Save to Firebase
    try {
      const docRef = await addDoc(collection(db, "students"), newStudent);
      // Update with actual Firebase ID
      set((state) => ({
        students: state.students.map((s) =>
          s.id === newStudent.id ? { ...s, id: docRef.id } : s,
        ),
      }));
    } catch (err) {
      // Remove from store if Firebase save fails
      set((state) => ({
        students: state.students.filter((s) => s.id !== newStudent.id),
      }));
      console.error("Error adding student:", err);
    }
  },

  deleteStudent: async (id) => {
    // Remove from store instantly
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    }));

    // Delete from Firebase
    try {
      await deleteDoc(doc(db, "students", id));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  },

  updateStudent: async (id, updatedData) => {
    // Update store instantly
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? { ...student, ...updatedData } : student,
      ),
    }));

    // Update in Firebase
    try {
      await updateDoc(doc(db, "students", id), updatedData);
    } catch (err) {
      console.error("Error updating student:", err);
    }
  },
}));

export default useStudentsStore;
