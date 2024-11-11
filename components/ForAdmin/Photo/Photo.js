"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  Description,
  DescriptionTextWrapper,
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
  onSnapshot,
  arrayUnion,
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

  useEffect(() => {
    // Nasłuchuj na zmiany w dokumencie
    const photoDocRef = doc(db, `galleries/${userId}/photos`, docId);
    const unsubscribe = onSnapshot(photoDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedDescriptions = docSnap.data().descriptions || [];
        setDescriptions(fetchedDescriptions);
      }
    });

    // Clean up nasłuchiwacza przy odmontowywaniu komponentu
    return () => unsubscribe();
  }, [userId, docId]);

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

      setNewDescription(""); // Wyczyść pole `textarea` po zapisaniu
    } catch (error) {
      console.error("Błąd podczas zapisywania opisu:", error);
    }
    setSaving(false);
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const descriptionsEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      descriptionsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 600);
  };

  // Automatyczne przewinięcie po każdej aktualizacji wiadomości
  useEffect(() => {
    scrollToBottom();
  }, [descriptions]);

  console.log(
    "userId:",
    userId,
    "docId:",
    docId,
    "newDescription:",
    newDescription
  );

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
        />
      </ImageWrapper>
      <DescriptionTextWrapper>
        {descriptions.map((desc, index) => (
          <DescriptionText as="h4" key={index}>
            {desc}
          </DescriptionText>
        ))}
        <div ref={descriptionsEndRef} />
      </DescriptionTextWrapper>

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
