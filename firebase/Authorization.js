// components/Authorization/Authorization.js
import { auth, googleProvider, db  } from "./firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

/**
 * Logowanie użytkownika
 */
export const loginUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(`Użytkownik ${email} zalogowany`);
    return { success: true };
  } catch (error) {
    console.log("E-mail lub hasło jest nieprawidłowe");
    return { success: false, message: "Nieprawidłowy e-mail lub hasło" };
  }
};

/**
 * Rejestracja użytkownika
 */

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Użytkownik, który został zarejestrowany

    // Dodaj e-mail użytkownika do Firestore
    const db = getFirestore();
    await setDoc(doc(db, "users", user.uid), {
      email: user.email, // Dodaj e-mail
      // Możesz dodać inne dane użytkownika, jeśli chcesz
    });

    return { success: true };
  } catch (error) {
    console.error("Błąd podczas rejestracji:", error);
    return {
      success: false,
      message: error.message || "Błąd podczas rejestracji",
    };
  }
};

/**
 * Logowanie przez Google
 */

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Dodaj e-mail użytkownika do Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email, // Dodaj e-mail
      displayName: user.displayName || "", // Opcjonalnie, dodaj nazwę wyświetlaną
      photoURL: user.photoURL || "", // Opcjonalnie, dodaj URL zdjęcia
      // Możesz dodać inne dane użytkownika, jeśli chcesz
    });

    return { success: true, user }; // Zwraca zalogowanego użytkownika
  } catch (error) {
    console.error("Błąd podczas logowania:", error.message);
    return { success: false, message: error.message };
  }
};

export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("Użytkownik wylogowany");
  } catch (error) {
    console.error("Błąd podczas wylogowania:", error);
  }
};
