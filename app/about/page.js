"use client"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function UserIdPage() {
  const [userId, setUserId] = useState(null);
  const [userIds, setUserIds] = useState([]); // Stan do przechowywania ID wszystkich użytkowników
  const [loading, setLoading] = useState(true); // Stan do zarządzania ładowaniem danych

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Ustaw ID zalogowanego użytkownika
      } else {
        setUserId(null);
      }
    });
  }, []);

  useEffect(() => {
    // Funkcja do pobrania ID wszystkich użytkowników
    const fetchUserIds = async () => {
      try {
        const response = await fetch("/api/getUsers");
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania użytkowników");
        }
        const data = await response.json();
        setUserIds(data.userIds); // Ustaw ID wszystkich użytkowników
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setLoading(false); // Ustaw ładowanie na false po pobraniu danych
      }
    };

    fetchUserIds(); // Wywołaj funkcję
  }, []);

  return (
    <div>
      <h1>ID zalogowanego użytkownika:</h1>
      {userId ? <p>{userId}</p> : <p>Użytkownik nie jest zalogowany</p>}

      <h2>ID wszystkich użytkowników:</h2>
      {loading ? ( // Sprawdzanie, czy dane są ładowane
        <p>Ładowanie...</p>
      ) : (
        <ul>
          {userIds.length > 0 ? (
            userIds.map((id) => <li key={id}>{id}</li>) // Wyświetlanie ID użytkowników w liście
          ) : (
            <p>Brak użytkowników.</p>
          )}
        </ul>
      )}
    </div>
  );
}
