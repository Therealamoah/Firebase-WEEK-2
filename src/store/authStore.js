// import create from zustand
import { create } from "zustand";
// import firebase and database functions
import { auth, db } from "../firebase";

// Write & read user profile data to Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";

// import register login logout and keep session after refresh
import {
    createUserWithEmailAndPassword,   // register
    signInWithEmailAndPassword,       // login
    signOut,                          // logout
    onAuthStateChanged,               // keep session after refresh
} from "firebase/auth";

// create auth store
const useAuthStore = create((set) => ({
    user: null,      // firebase auth user object (contains uid, email, etc.)
    profile: null,   // user profile data from Firestore (contains name, age, etc.)
    loading: true,   // loading state for auth actions (register, login, logout, fetch profile)


    // register function - creates user in Firebase Auth and Firestore
    register: async ( { name, course, email, password } ) => {
        // 1. create login credentials in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; // contains uid, email, etc.

        // 2. Build profile to save in firebase (you can add more fields here)
        const profileData = {
            uid:user.uid,
            name,
            course,
            email,
        };

        // 3. save profile at users/uid using the setDoc function
        await setDoc(doc(db, "users", user.uid), profileData);


        // 4. save to Zustand store (user and profile are separate because user is from Firebase Auth and profile is from Firestore)
        set({ user, profile: profileData });
    },

    // Login function - logs in user with Firebase Auth and fetches profile from Firestore
    login: async ({ email, password }) => {
        // 1. sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 2. fetch profile using uid
        const snap = await getDoc(doc(db, "users", user.uid));
        const profileData = snap.exists() ? snap.data() : null;

        // 3. Save to Zustand store
        set({ user, profile: profileData });
    },

    // Logout function - logs out user from Firebase Auth and clears store
    logout: async () => {
        await signOut(auth);
        set({ user: null, profile: null });
    },

    //  SESSION: RUNS ON APP LOAD; KEEPS USERS LOGGED IN AFTER REFRESH
    listenToAuth: () => {
        onAuthStateChanged(auth, async (user) => {    //passing an async function as a callback function
            if (!user) {
                set({ user: null, profile: null, loading: false });
                return;
            }

            // if users logged in fetch profile too
            const snap = await getDoc(doc(db, "users", user.uid));
            const profileData = snap.exists() ? snap.data() : null;

            set({ user, profile: profileData, loading: false });
        });
    },
}));

export default useAuthStore;





