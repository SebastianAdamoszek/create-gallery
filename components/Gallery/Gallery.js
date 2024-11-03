"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { ButtonsContainer } from "./ButtonsAddDelPhoto/ButtonsAddDelPhoto.styled";
import {
  ButtonAddPhoto,
  ButtonDelPhoto,
} from "./ButtonsAddDelPhoto/ButtonsAddDelPhoto";
import { Photo, PhotoForDel } from "./Photo/Photo";
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

    // Subskrypcja stanu zalogowania
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);

      // Jeśli użytkownik jest zalogowany, pobieramy jego zdjęcia
      if (user) {
        const userId = user.uid;
        const q = query(
          collection(db, `galleries/${userId}/photos`),
          orderBy("timestamp", "desc")
        );

        // Subskrypcja zdjęć
        const unsubscribePhotos = onSnapshot(q, (snapshot) => {
          setPhotos(snapshot.docs.map((doc) => doc.data()));
          setLoading(false);
        });

        return () => unsubscribePhotos();
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
      <ButtonDelPhoto toggleDeleteMode={toggleDeleteMode} />
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
            <PhotoForDel key={index} url={photo.url} />
          ) : (
            <Photo key={index} url={photo.url} />
          )
        )}
            </GalleryContainer>
          )}
        </>
      )}

      {/* {isLoggedIn && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <GalleryContainer>
              {photos.map((photo, index) => (
                <Photo key={index} url={photo.url} />
              ))}
            </GalleryContainer>
          )}
        </>
      )} */}
    </GalleryPageContainer>
  );
};
