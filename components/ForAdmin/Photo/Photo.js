"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  Description,
  DescriptionText,
  ButtonSaveDesc,
  PhotoDelWrapper,
  ImageWrapper,
  RemoveIcon,
  CheckBox,
  CheckIcon,
} from "./Photo.styled";
import { FaTrash, FaCheck } from "react-icons/fa";
import { ref, deleteObject } from "firebase/storage";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "@/firebase/firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import { Loader } from "@/components/Loader/Loader";

export const Photo = ({ url, userId, docId, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const saveDescription = async () => {
    if (!newDescription.trim()) return; // Zapobiegaj dodawaniu pustych opisów
    setSaving(true);
    try {
      if (!docId) {
        throw new Error("Nie znaleziono ID dokumentu");
      }

      const photoDocRef = doc(db, `galleries/${userId}/photos`, docId);
      await updateDoc(photoDocRef, {
        descriptions: arrayUnion(newDescription), // Dodaj nowy opis do istniejącej listy
      });
      console.log("Nowy opis zapisany!");

      // Aktualizuj stan lokalny po zapisie
      setDescriptions((prev) => [...prev, newDescription]);
      setNewDescription(""); // Wyczyść pole `textarea` po zapisaniu
    } catch (error) {
      console.error("Błąd podczas zapisywania opisu:", error);
    }
    setSaving(false);
  };

  useEffect(() => {
    // Pobierz listę opisów z Firestore po załadowaniu komponentu
    const fetchDescriptions = async () => {
      try {
        const photoDocRef = doc(db, `galleries/${userId}/photos`, docId);
        const docSnap = await getDoc(photoDocRef);
        if (docSnap.exists()) {
          const fetchedDescriptions = docSnap.data().descriptions || [];
          setDescriptions(fetchedDescriptions);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania opisów:", error);
      }
    };

    fetchDescriptions();
  }, [userId, docId]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <PhotoContainer data-aos="fade-up">
      {!loaded && <Loader>Pobieranie</Loader>}
      <ImageWrapper>
        <Image
          src={url}
          alt="Przesłane zdjęcie"
          onLoad={handleImageLoad}
          layout="fill"
          objectFit="contain"
          {...props}
        />
      </ImageWrapper>
      {descriptions.map((desc, index) => (
        <DescriptionText as="h4" key={index}>
          {desc}
        </DescriptionText>
      ))}
      <Description
        value={newDescription}
        onChange={handleNewDescriptionChange}
        placeholder="Dodaj komentarz"
      />
      <ButtonSaveDesc onClick={saveDescription} disabled={saving}>
        {saving ? "Zapisuję..." : "Zapisz opis"}
      </ButtonSaveDesc>
    </PhotoContainer>
  );
};

export const PhotoForDel = ({ url, refreshGallery = () => {}, userId }) => {
  const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);

  const handleDeleteClick = () => {
    setIsMarkedForDeletion(!isMarkedForDeletion);
  };

  const confirmDeletion = async () => {
    if (!url || typeof url !== "string") {
      console.error("Niepoprawny URL zdjęcia:", url);
      return;
    }

    try {
      // Wyodrębnienie nazwy pliku (identyfikator)
      const fileName = url.split("/").pop().split("?")[0];
      const decodedFileName = decodeURIComponent(fileName); // Dekodowanie nazwy pliku

      // Usunięcie dokumentu z Firestore
      const photosRef = collection(db, `galleries/${userId}/photos`);
      const q = query(photosRef, where("url", "==", url));
      const querySnapshot = await getDocs(q);

      // Usuwanie dokumentów
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref); // Usunięcie dokumentu z Firestore
        console.log("Zdjęcie usunięte z Firestore");

        // Usuwanie zdjęcia ze Storage
        const storageRef = ref(storage, decodedFileName);
        console.log("Usuwana ścieżka:", storageRef.fullPath);
        await deleteObject(storageRef);
        console.log("Zdjęcie usunięte ze Storage");
      }

      // Resetowanie stanu zaznaczenia
      setIsMarkedForDeletion(false);

      // Odświeżenie galerii po usunięciu
      if (typeof refreshGallery === "function") {
        refreshGallery();
      } else {
        console.warn("refreshGallery nie jest funkcją");
      }
    } catch (error) {
      console.error("Błąd podczas usuwania zdjęcia:", error);
    }
  };

  return (
    <PhotoDelWrapper isMarked={isMarkedForDeletion}>
      <Image
        width={100}
        height={100}
        src={url}
        alt="Opis zdjęcia"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <RemoveIcon isMarked={isMarkedForDeletion} onClick={confirmDeletion}>
        <FaTrash />
      </RemoveIcon>
      <CheckBox
        type="checkbox"
        checked={isMarkedForDeletion}
        onChange={handleDeleteClick}
      />
      <CheckIcon isChecked={isMarkedForDeletion}>
        <FaCheck />
      </CheckIcon>
    </PhotoDelWrapper>
  );
};
