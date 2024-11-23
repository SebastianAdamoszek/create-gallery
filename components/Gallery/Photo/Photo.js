"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  PhotoContainer,
  PhotoDelWrapper,
  RemoveIcon,
  CheckBox,
  CheckIcon,
  ImageWrapper,
  Description,
  DescriptionTextWrapper,
  DescriptionText,
  ButtonSaveDesc,
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

export const Photo = ({ url, docId, userId }) => {
  const [loaded, setLoaded] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [newDescription, setNewDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [user] = useAuthState(auth); // Używamy hooka, aby uzyskać dane zalogowanego użytkownika
  const descriptionsEndRef = useRef(null);
  const pageTopRef = useRef(null);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  useEffect(() => {
    // Nasłuchuj na zmiany w dokumencie
    const photoDocRef = doc(db, `galleries/${user.uid}/photos`, docId);
    const unsubscribe = onSnapshot(photoDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedDescriptions = docSnap.data().descriptions || [];
        setDescriptions(fetchedDescriptions);
      }
    });

    // Clean up nasłuchiwacza przy odmontowywaniu komponentu
    return () => unsubscribe();
  }, [user.uid, docId]);

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const saveDescription = async () => {
    if (!newDescription.trim()) return;
    setSaving(true);
    try {
      const photoDocRef = doc(db, `galleries/${user.uid}/photos`, docId);
      await updateDoc(photoDocRef, {
        descriptions: arrayUnion(newDescription), // Dodaj nowy opis do istniejącej listy
      });
      setNewDescription(""); // Wyczyść pole `textarea` po zapisaniu
    } catch (error) {
      console.error("Błąd podczas zapisywania opisu:", error);
    }
    setSaving(false);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      descriptionsEndRef.current?.scrollTo({
        top: descriptionsEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 600);
  };

  const stayAtTop = () => {
    // Utrzymanie strony u góry
    window.scrollTo({
      top: 0,
      behavior: "instant", // Brak animacji, natychmiastowe przewinięcie
    });
  };

  useEffect(() => {
    scrollToBottom(); // Przewiń tekst do dołu
  }, [descriptions]);

  useEffect(() => {
    stayAtTop(); // Utrzymaj stronę u góry
  }, []); // Wywołanie tylko raz po załadowaniu strony

  return (
    <PhotoContainer ref={pageTopRef} data-aos="fade-up">
      {" "}
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
      <DescriptionTextWrapper ref={descriptionsEndRef}>
        {descriptions.map((desc, index) => (
          <DescriptionText as="h4" key={index} >
            {desc}
          </DescriptionText>
        ))}
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
      const fileName = url.split("/").pop().split("?")[0];
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
    <PhotoDelWrapper $isMarked={isMarkedForDeletion}>
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
      <RemoveIcon $isMarked={isMarkedForDeletion} onClick={confirmDeletion}>
        <FaTrash />
      </RemoveIcon>
      <CheckBox
        type="checkbox"
        checked={isMarkedForDeletion}
        onChange={handleDeleteClick}
      />
      <CheckIcon $isChecked={isMarkedForDeletion}>
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
