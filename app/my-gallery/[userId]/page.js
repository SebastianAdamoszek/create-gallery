// app/my-gallery/[userId]/page.js
"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Photo } from "@/components/Gallery/Photo/Photo";
import {
  GalleryPageContainer,
  GalleryContainer,
} from "@/components/Gallery/Gallery.styled";

const UserGalleryPage = ({ params }) => {
  const { userId } = params; // Get userId from URL params
  const [photos, setPhotos] = useState([]);

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

  return (
    <GalleryPageContainer>
      <h2>Galeria użytkownika: {userId}</h2>
      <GalleryContainer>
        {photos.length > 0 ? (
          photos.map((photo, index) => <Photo key={index} url={photo.url} />)
        ) : (
          <p>Brak zdjęć do wyświetlenia.</p>
        )}
      </GalleryContainer>
    </GalleryPageContainer>
  );
};

export default UserGalleryPage;
