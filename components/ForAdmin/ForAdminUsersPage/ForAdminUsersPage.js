"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importujemy funkcje z Firestore
import { db } from "@/firebase/firebase"; // Import konfiguracji Firestore
import { Loader } from "@/components/Loader/Loader";
import "@/app/globals.css";
import styles from "@/app//page.module.css";

export default function ForAdminUserPage() {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null); // Dodajemy stan roli użytkownika
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
        setIsLoggedIn(true);

        try {
          // Pobieramy dokument użytkownika z Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role); // Ustawiamy rolę użytkownika
          } else {
            console.warn("Dokument użytkownika nie istnieje");
          }
        } catch (error) {
          console.error("Błąd podczas pobierania roli użytkownika:", error);
        }
      } else {
        setUserId(null);
        setUserEmail(null);
        setUserRole(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getUsers");
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania użytkowników");
        }
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userRole === "admin") {
      fetchUsers(); // Pobieramy użytkowników tylko dla admina
    }
  }, [userRole]);

  if (!isLoggedIn) {
    return (
      <div className={styles.main__next}>
        <h2>Dostępne tylko dla admina</h2>
      </div>
    );
  }

  if (userRole !== "admin") {
    return (
      <div className={styles.main__next}>
        <h2>Dostępne tylko dla administratorów</h2>
      </div>
    );
  }

  return (
    <div className={styles.main__next}>
      <div className={styles.main__content}>
        <h2>Zalogowany użytkownik:</h2>
        <p>! {userRole}</p>
        {userId ? <p># {userId}</p> : <p>Użytkownik nie jest zalogowany</p>}
        {userEmail && <p>@ {userEmail}</p>}
        <h3>Lista użytkowników:</h3>
        {loading ? (
          <Loader/>
        ) : (
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.uid}>
                  <p>{user.role}</p>
                  <p># {user.uid}</p>
                  <p>@ {user.email}</p>
                </li>
              ))
            ) : (
              <p>Brak użytkowników.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
