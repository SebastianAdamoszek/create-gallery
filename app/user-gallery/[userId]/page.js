"use client";
import { use, useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Dostęp do Firestore
import {
  collection,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { PhotoPublic } from "@/components/Gallery/PhotoPublic/PhotoPublic";
import {
  GalleryPageContainer,
  GalleryContainer,
} from "@/components/Gallery/Gallery.styled";
import styles from "@/app/page.module.css";
import "@/app/globals.css";

const UserGalleryPage = ({ params }) => {
  const { userId } = params; // Get userId from URL params
  const [photos, setPhotos] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Stan do przechowywania e-maila użytkownika

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

  return (
    <div className={styles.main__next}>
      <GalleryPageContainer>
        <h2>Galeria użytkownika:</h2>
        <h3 className={`${!userEmail ? "loading-text" : ""}`}>
          {userEmail || "Pobieram..."}
        </h3>
        <GalleryContainer>
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <PhotoPublic key={index} url={photo.url} />
            ))
          ) : (
            <p>Brak zdjęć do wyświetlenia.</p>
          )}
        </GalleryContainer>
      </GalleryPageContainer>
    </div>
  );
};

export default UserGalleryPage;
