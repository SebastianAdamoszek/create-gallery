"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { Photo } from "./Photo/Photo";
import { ButtonAddPhoto } from "./ButtonAddPhoto/ButtonAddPhoto";
import { GalleryPageContainer, GalleryContainer } from "./Gallery.styled";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importuj getAuth

export const Gallery = ({userId}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Uzyskanie userId zalogowanego użytkownika
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("Użytkownik nie jest zalogowany");
      return;
    }

    const userId = user.uid;

    // Funkcja pobierająca zdjęcia w czasie rzeczywistym
    const q = query(collection(db, `galleries/${userId}/photos`), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => doc.data()));
    });

    // Unsubskrybuj, aby uniknąć wycieków pamięci
    return () => unsubscribe();
  }, [userId]);

  return (
    <GalleryPageContainer>
      <ButtonAddPhoto />
      <GalleryContainer>
        {photos.map((photo, index) => (
          <Photo key={index} url={photo.url} />
        ))}
      </GalleryContainer>
    </GalleryPageContainer>
  );
};
