"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  PhotoDelWrapper,
  RemoveIcon,
  CheckBox,
  CheckIcon,
  ImageWrapper,
  Description,
  DescriptionText,
  ButtonSaveDesc
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


export const Photo = ({ url, docId, userId}) => {
  const [loaded, setLoaded] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const [user] = useAuthState(auth); // Używamy hooka, aby uzyskać dane zalogowanego użytkownika

  const handleImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  useEffect(() => {
    if (!user || !docId) {
      console.warn("Brak userId lub docId - przerywam pobieranie danych!");
      return;
    }

    // Pobierz opisy z Firestore dla aktualnie zalogowanego użytkownika
    const fetchDescriptions = async () => {
      try {
        console.log("Fetching descriptions for userId:", user.uid, "docId:", docId);
        const photoDocRef = doc(db, `galleries/${user.uid}/photos`, docId);
        const docSnap = await getDoc(photoDocRef);

        if (docSnap.exists()) {
          const fetchedDescriptions = docSnap.data().descriptions || [];
          console.log("Fetched descriptions:", fetchedDescriptions);
          setDescriptions(fetchedDescriptions);
        } else {
          console.warn("Dokument nie istnieje!");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania opisów:", error);
      }
    };

    fetchDescriptions();
  }, [user, docId]); // Uruchamiamy efekt przy zmianie użytkownika lub docId

  const saveDescription = async () => {
    if (!newDescription.trim()) {
      console.log("Opis jest pusty, nie zapisuję");
      return;
    }

    setSaving(true);
    try {
      if (!docId || !user) {
        throw new Error("Brak wymaganych ID dokumentu lub użytkownika");
      }

      const photoDocRef = doc(db, `galleries/${user.uid}/photos`, docId);
      const docSnap = await getDoc(photoDocRef);

      if (!docSnap.exists()) {
        console.error("Nie znaleziono dokumentu, nie mogę zapisać opisu");
        return;
      }

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
  console.log("userId:", userId, "docId:", docId, "newDescription:", newDescription);

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



export const PhotoForDel = ({ url, refreshGallery }) => {
  const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);
  const [user] = useAuthState(auth);

  const handleDeleteClick = () => {
    setIsMarkedForDeletion(!isMarkedForDeletion);
  };

  const confirmDeletion = async () => {
    if (!url || typeof url !== "string") {
      console.error("Niepoprawny URL zdjęcia:", url);
      return;
    }

    try {
      if (!user) {
        console.error("Użytkownik nie jest zalogowany");
        return;
      }

      const userId = user.uid;
      // Uzyskanie nazwy pliku
      const fileName = url.split('/').pop().split('?')[0];
      const decodedFileName = decodeURIComponent(fileName); // Dekodujemy nazwę pliku
      console.log("Nazwa pliku do usunięcia:", fileName);
      console.log("Dekodowana nazwa pliku do usunięcia:", decodedFileName);

      // Usunięcie dokumentu z Firestore na podstawie URL-a
      const photosRef = collection(db, `galleries/${userId}/photos`);
      const q = query(photosRef, where("url", "==", url));
      const querySnapshot = await getDocs(q);

      // Usuwanie każdego dokumentu znalezionego w zapytaniu
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref); // Usunięcie dokumentu z Firestore
        console.log("Zdjęcie usunięte z Firestore");

        // Następnie usuwamy plik ze Storage
        const storageRef = ref(storage, `${decodedFileName}`);
        console.log("Usuwana ścieżka:", storageRef.fullPath); // Logowanie ścieżki
        await deleteObject(storageRef);
        console.log("Zdjęcie usunięte ze Storage");
      }

      // Zresetowanie stanu zaznaczenia do usunięcia
      setIsMarkedForDeletion(false);

      // Odświeżenie galerii po usunięciu
      refreshGallery();
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


//import Imgix from "react-imgix";

// export const Photo = ({ url }) => {
//   return (
//     <Image
//       width={100}
//       height={100}
//       src={url}
//       imgixParams={{
//         fit: "crop",
//         ar: "1:1",
//         auto: "format,compress",
//         q: 75,
//         sepia: 15,
//         blur: 5,
//         sat: 20,
//       }}
//       sizes="(max-width: 800px) 100vw, 800px"
//       alt="Opis zdjęcia"
//       style={{
//         borderRadius: "12px",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
//         margin: "10px",
//       }}
//     />
//   );
// };
