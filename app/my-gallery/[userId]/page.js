// app/my-gallery/[userId]/page.js
"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Importowanie getAuth
import { Photo } from "@/components/Gallery/Photo/Photo";
import { GalleryPageContainer, GalleryContainer } from "@/components/Gallery/Gallery.styled";

const UserGalleryPage = ({ params }) => {
  const { userId } = params; // Pobieranie userId z parametrów URL
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Funkcja pobierająca zdjęcia w czasie rzeczywistym
    const q = query(
      collection(db, `galleries/${userId}/photos`),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe(); // Unsubscribe on component unmount
  }, [userId]);

  return (
    <GalleryPageContainer>
      <GalleryContainer>
        {photos.map((photo, index) => (
          <Photo key={index} url={photo.url} />
        ))}
      </GalleryContainer>
    </GalleryPageContainer>
  );
};

export default UserGalleryPage;
