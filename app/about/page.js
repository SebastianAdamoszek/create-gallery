// "use client";
// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import "@/app/globals.css";
// import styles from "../page.module.css";

// export default function UserIdPage() {
//   const [userId, setUserId] = useState(null);
//   const [userIds, setUserIds] = useState([]); // Stan do przechowywania ID wszystkich użytkowników
//   const [loading, setLoading] = useState(true); // Stan do zarządzania ładowaniem danych
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUserId(user.uid); // Ustaw ID zalogowanego użytkownika
//       } else {
//         setUserId(null);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     // Funkcja do pobrania ID wszystkich użytkowników
//     const fetchUserIds = async () => {
//       try {
//         const response = await fetch("/api/getUsers");
//         if (!response.ok) {
//           throw new Error("Błąd podczas pobierania użytkowników");
//         }
//         const data = await response.json();
//         setUserIds(data.userIds); // Ustaw ID wszystkich użytkowników
//       } catch (error) {
//         console.error("Błąd:", error);
//       } finally {
//         setLoading(false); // Ustaw ładowanie na false po pobraniu danych
//       }
//     };

//     fetchUserIds(); // Wywołaj funkcję
//   }, []);

//   useEffect(() => {
//     const auth = getAuth();

//     // Funkcja Firebase do obserwowania stanu zalogowania
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setIsLoggedIn(!!user); // Ustawia `true` jeśli użytkownik jest zalogowany, `false` jeśli nie jest
//     });

//     return () => unsubscribe(); // Czyszczenie nasłuchu
//   }, []);

//   return (
//     <div className={styles.main__next}>
//       <div style={{ display: isLoggedIn ? "none" : "block" , marginTop:"200px" }}>
//         <h2>Dostępne tylko dla zalogowanych użytkowników</h2>
//       </div>
//       <div style={{ display: isLoggedIn ? "block" : "none" }}>
//         {" "}
//         <h2>ID zalogowanego użytkownika:</h2>
//         {userId ? <p>{userId}</p> : <p>Użytkownik nie jest zalogowany</p>}
//         <h3>ID wszystkich użytkowników:</h3>
//         {loading ? ( // Sprawdzanie, czy dane są ładowane
//           <p className="loading-text">Loading...</p>
//         ) : (
//           <ul>
//             {userIds.length > 0 ? (
//               userIds.map((id) => <li key={id}>{id}</li>) // Wyświetlanie ID użytkowników w liście
//             ) : (
//               <p>Brak użytkowników.</p>
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "@/app/globals.css";
import styles from "../page.module.css";

export default function UserIdPage() {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [users, setUsers] = useState([]); // Zmieniamy nazwę stanu na 'users'
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);

      } else {
        setUserId(null);
        setUserEmail(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getUsers");
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania użytkowników");
        }
        const data = await response.json();
        setUsers(data.users); // Ustaw pełną listę użytkowników
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.main__next}>
      <div style={{ display: isLoggedIn ? "none" : "block", marginTop: "200px" }}>
        <h2>Dostępne tylko dla zalogowanych użytkowników</h2>
      </div>
      <div style={{ display: isLoggedIn ? "block" : "none" }}>
        <h2>Zalogowany użytkownik:</h2>
        {userId ? <p># {userId}</p> : <p>Użytkownik nie jest zalogowany</p>}
        {userEmail && <p>@ {userEmail}</p>}
        <h3>Lista użytkowników:</h3>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.uid}>
                  # {user.uid} |@ {user.email}
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
