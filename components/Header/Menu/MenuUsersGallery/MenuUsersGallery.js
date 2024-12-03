"use client";
import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  User,
  LoaderText
} from "./MenuUsersGallery.styled";
import Link from "next/link";
import { LoaderBar } from "@/components/Loader/Loader";

export const UsersGalleries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = async () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (!isOpen) {
      setLoading(true);
      await fetchUsersWithGalleries();
      setLoading(false);
    }
  };

  const fetchUsersWithGalleries = async () => {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    const usersWithGalleries = [];

    for (const doc of snapshot.docs) {
      const userId = doc.id;
      const galleryRef = collection(db, `galleries/${userId}/photos`);
      const gallerySnapshot = await getDocs(galleryRef);

      if (!gallerySnapshot.empty) {
        usersWithGalleries.push({
          id: userId,
          email: doc.data().email,
        });
      }
    }

    setUsers(usersWithGalleries);
  };

  // Funkcja zamykająca menu przy kliknięciu poza nim
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={toggleMenu}
        $isOpen={isOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <p>
          Users Galleries <span>^</span>
        </p>
      </DropdownButton>
      <DropdownMenu $isOpen={isOpen}>
        {loading ? (
          <li>
            <LoaderBar/>
          </li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <Link 
                href={`/user-gallery/[userId]`}
                as={`/user-gallery/${user.id}`}
                onClick={() => setIsOpen(false)}
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
