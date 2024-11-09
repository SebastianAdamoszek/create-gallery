"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Dostęp do Firestore
import {
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Photo } from "@/components/Gallery/Photo/Photo";
import {
  GalleryPageContainer,
  GalleryContainer,
} from "@/components/Gallery/Gallery.styled";
import styles from "@/app/page.module.css";
import "@/app/globals.css";
import { Gallery } from "@/components/Gallery/Gallery";
import { ButtonsContainer } from "@/components/Gallery/ButtonsAddDelPhoto/ButtonsAddDelPhoto.styled";
import {
  ButtonAddPhoto,
  ButtonDelPhoto,
} from "@/components/Gallery/ButtonsAddDelPhoto/ButtonsAddDelPhoto";

const UserGalleryPage = ({ params }) => {
  const { userId } = params; // Get userId from URL params
  const [photos, setPhotos] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Stan do przechowywania e-maila użytkownika
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    // Query to fetch photos for the specific userId
    const q = query(
      collection(db, `galleries/${userId}/photos`),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [userId]);

  useEffect(() => {
    // Funkcja do pobrania e-maila użytkownika na podstawie userId
    const fetchUserEmail = async () => {
      const docRef = doc(db, "users", userId); // Odwołanie do dokumentu użytkownika w Firestore
      const docSnap = await getDoc(docRef); // Pobierz dokument

      if (docSnap.exists()) {
        setUserEmail(docSnap.data().email); // Ustaw e-mail w stanie
      } else {
        console.log("Brak dokumentu użytkownika");
      }
    };

    fetchUserEmail(); // Wywołanie funkcji
  }, [userId]);

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };


  return (
    <div className={styles.main__next}>
      <GalleryPageContainer>
         <h2>Galeria użytkownika:</h2>
        <h3 className={`${!userEmail ? "loading-text" : ""}`}>
          {userEmail || "Pobieram..."}
        </h3>
        <GalleryContainer>
          {photos.length > 0 ? (
            photos.map((photo, index) => <Photo key={index} url={photo.url} />)
          ) : (
            <p>Brak zdjęć do wyświetlenia.</p>
          )}
        </GalleryContainer>
      </GalleryPageContainer>
    </div>
  );
};

export default UserGalleryPage;
