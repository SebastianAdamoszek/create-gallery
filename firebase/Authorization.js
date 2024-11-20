// components/Authorization/Authorization.js
import { auth, googleProvider, db } from "./firebase";
import { collection, getDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user; // Użytkownik, który został zarejestrowany

    // Dodaj e-mail użytkownika do Firestore
    const db = getFirestore();
    await setDoc(doc(db, "users", user.uid), {
      email: user.email, // Dodaj e-mail
      role: "user", // Domyślna rola to 'user'
      createdAt: new Date(),
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

    // Sprawdzanie, czy użytkownik już istnieje w Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // Jeśli użytkownik nie istnieje, utwórz dokument i ustaw rolę na "user"
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        role: "user", // Domyślna rola to "user"
        createdAt: new Date(),
      });
    } else {
      // Jeśli dokument istnieje, sprawdź czy rola jest już ustawiona na "admin"
      const userData = userDocSnap.data();
      if (!userData.role) {
        // Jeśli rola nie została ustawiona, ustaw ją na "user"
        await setDoc(
          userDocRef,
          {
            role: "user",
          },
          { merge: true }
        );
      }
    }
    console.log(`Użytkownik ${user.email} zalogowany`);
    return { success: true, user }; // Zwraca zalogowanego użytkownika
  } catch (error) {
    console.error("Błąd podczas logowania:", error.message);
    return { success: false, message: error.message };
  }
};

/**
 * Wylogowanie użytkownika
 */
export const handleLogout = async () => {
  try {
    const user = auth.currentUser; // Pobieramy obecnie zalogowanego użytkownika
    if (user) {
      await signOut(auth);
      console.log(`Użytkownik ${user.email} wylogowany`);
      alert("Pomyślnie wylogowano!");

    } else {
      console.log("Nie można wylogować, brak zalogowanego użytkownika");
    }
  } catch (error) {
    console.error("Błąd", error);
  }
};