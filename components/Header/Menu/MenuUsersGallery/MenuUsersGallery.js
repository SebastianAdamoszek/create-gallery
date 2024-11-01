"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  User,
} from "./MenuUsersGallery.styled";
import Link from "next/link";

export const UserGalleryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // Nasłuch na zmiany w kolekcji "users" w Firestore
    const usersRef = collection(db, "users");

    const unsubscribe = onSnapshot(usersRef, async (snapshot) => {
      const usersWithGalleries = [];

      for (const doc of snapshot.docs) {
        const userId = doc.id;

        // Odwołanie do kolekcji galerii użytkownika
        const galleryRef = collection(db, `galleries/${userId}/photos`);
        const gallerySnapshot = await getDocs(galleryRef);

        // Sprawdzamy, czy galeria zawiera przynajmniej jeden element
        if (!gallerySnapshot.empty) {
          usersWithGalleries.push({
            id: userId,
            email: doc.data().email,
          });
        }
      }

      setUsers(usersWithGalleries); // Ustawiamy użytkowników z przynajmniej jedną pozycją w galerii
      setLoading(false); // Zatrzymujemy ładowanie po pobraniu danych
    });

    return () => unsubscribe(); // Wyrejestrowanie nasłuchu przy odmontowaniu komponentu
  }, []);

  return (
    <DropdownContainer>
      <DropdownButton
        onClick={toggleMenu}
        isOpen={isOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <p>
          Users Galleries <span>^</span>
        </p>
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {loading ? (
          <li>
            <p>Ładowanie...</p>
          </li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/user-gallery/[userId]`}
                as={`/user-gallery/${user.id}`}
                onClick={closeMenu}
              >
                <User>{user.email}</User>
              </Link>
            </li>
          ))
        )}
      </DropdownMenu>
    </DropdownContainer>
  );
};
