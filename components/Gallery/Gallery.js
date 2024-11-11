"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { ButtonsContainer } from "./ButtonsAddDelPhoto/ButtonsAddDelPhoto.styled";
import {
  ButtonAddPhoto,
  ButtonDelPhoto,
} from "./ButtonsAddDelPhoto/ButtonsAddDelPhoto";
import { Photo, PhotoForDel } from "./Photo/Photo";
// import { Photo } from "../ForAdmin/Photo/Photo";
import { GalleryPageContainer, GalleryContainer } from "./Gallery.styled";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Loader } from "../Loader/Loader";
import { getAuth } from "firebase/auth";

export const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
  
      if (user) {
        const userId = user.uid;
        const q = query(
          collection(db, `galleries/${userId}/photos`),
          orderBy("timestamp", "desc")
        );
  
        // Subskrypcja z onSnapshot
        const unsubscribePhotos = onSnapshot(q, (snapshot) => {
          // Zmieniamy sposób, w jaki mapujemy dane, aby dodać id dokumentu
          setPhotos(snapshot.docs.map((doc) => ({
            id: doc.id, // Przypisujemy id dokumentu
            ...doc.data() // Kopiujemy wszystkie dane zdjęcia
          })));
          setLoading(false);
        });
  
        return () => unsubscribePhotos(); // Wyłącz subskrypcję po odmontowaniu
      } else {
        setPhotos([]); // Czyszczenie galerii po wylogowaniu
      }
    });
  
    return () => unsubscribeAuth();
  }, []);
  
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  return (
    <GalleryPageContainer>
      <ButtonsContainer>
        <ButtonDelPhoto
          toggleDeleteMode={toggleDeleteMode}
          isDeleteMode={isDeleteMode}
        />
        <ButtonAddPhoto />
      </ButtonsContainer>

      {isLoggedIn && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <GalleryContainer>
              {photos.map((photo, index) =>
                isDeleteMode ? (
                  <PhotoForDel
                    key={index}
                    url={photo.url}
                    refreshGallery={() => {}}
                  />
                ) : (
                  <Photo key={photo.id} url={photo.url} docId={photo.id} />
                )
              )}
            </GalleryContainer>
          )}
        </>
      )}
    </GalleryPageContainer>
  );
};
