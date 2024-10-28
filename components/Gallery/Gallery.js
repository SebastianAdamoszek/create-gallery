"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { Photo } from "./Photo/Photo";
import { ButtonAddPhoto } from "./ButtonAddPhoto/ButtonAddPhoto";
import { GalleryPageContainer, GalleryContainer } from "./Gallery.styled";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Funkcja pobierająca zdjęcia w czasie rzeczywistym
    const q = query(collection(db, "photos"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => doc.data()));
    });

    // Unsubskrybuj, aby uniknąć wycieków pamięci
    return () => unsubscribe();
  }, []);

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
