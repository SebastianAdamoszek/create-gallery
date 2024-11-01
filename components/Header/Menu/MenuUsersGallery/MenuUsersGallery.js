"use client"; // Upewnij się, że to jest dodane, aby działało w trybie klienta
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import getDocs do pobierania dokumentów
import styled from "styled-components"; // Upewnij się, że używasz styled-components
import Link from "next/link"; // Upewnij się, że masz zainstalowany Next.js i odpowiednio skonfigurowany Link

// Stylizacja kontenera dropdown
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Stylizacja przycisku dropdown
const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  width: 200%;

  p {
    margin: 0;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      transition: transform 0.3s ease;
      transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "none")};
    }
  }
`;

// Stylizacja menu dropdown
const DropdownMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  position: absolute;
  background-color: rgba(12, 38, 124, 0.8);
  border-radius: 5px;
  font-size: 12px;
  z-index: 1;
`;

export const User = styled.p`
  overflow: hidden;
  width: 500%;
`

export const UserGalleryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]); // Stan do przechowywania użytkowników
  const [loading, setLoading] = useState(true); // Stan do zarządzania ładowaniem danych

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Funkcja do pobierania użytkowników z Firestore
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users"); // Odwołanie do kolekcji użytkowników
        const snapshot = await getDocs(usersRef); // Pobierz dokumenty

        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email, // Zakładamy, że dokumenty mają pole 'email'
        }));

        setUsers(usersData); // Ustawiamy użytkowników z Firestore
      } catch (error) {
        console.error("Błąd:", error);
      } finally {
        setLoading(false); // Ustaw ładowanie na false po pobraniu danych
      }
    };

    fetchUsers(); // Wywołaj funkcję
  }, []);

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleMenu} isOpen={isOpen} aria-expanded={isOpen} aria-haspopup="true">
        <p>
          Users Galleries <span>^</span>
        </p>
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {loading ? ( // Sprawdzanie, czy dane są ładowane
          <li><p>Ładowanie...</p></li>
        ) : (
          users.map((user) => ( // Pętla po użytkownikach
            <li key={user.id}>
              <Link href={`/user-gallery/[userId]`} as={`/user-gallery/${user.id}`} onClick={closeMenu}>
                <User>{user.email}</User> {/* Wyświetl e-mail użytkownika */}
              </Link>
            </li>
          ))
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
};
