"use client";
import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  DropdownContainer,
  DropdownButton,
  DropdownMenu,
  User,
  LoaderText,
} from "./ForAdminUsersGalleries.styled";
import Link from "next/link";
import { LoaderBar } from "@/components/Loader/Loader";

export const ForAdminUsersGalleries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        // Użytkownik wylogowany
        setIsAdmin(false);
      }
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

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

  if (isCheckingAuth) {
    return <p>Sprawdzanie uprawnień...</p>;
  }

  // if (!isAdmin) {
  //   return <p>Nie masz uprawnień do wyświetlenia tego komponentu.</p>;
  // }

  return (
    <DropdownContainer ref={dropdownRef} $isAdmin={isAdmin}>
      <DropdownButton
        onClick={toggleMenu}
        $isOpen={isOpen}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <p>
          For Admin <span>^</span>
        </p>
      </DropdownButton>
      <DropdownMenu $isOpen={isOpen}>
        {loading ? (
          <li>
            {/* <LoaderText>Pobieram...</LoaderText> */}
            <LoaderBar/>
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
