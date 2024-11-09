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
} from "./ForAdminUsersGalleries.styled";
import Link from "next/link";

export const ForAdminUsersGalleries = () => {
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

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={toggleMenu}
        isOpen={isOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <p>
          For Admin <span>^</span>
        </p>
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {loading ? (
          <li>
            <LoaderText>Pobieram...</LoaderText>
          </li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/ForAdmin/UsersGalleries/[userId]`}
                as={`/ForAdmin/UsersGalleries/${user.id}`}
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
