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
  const descriptionsEndRef = useRef(null);
  const pageTopRef = useRef(null); // Ref na górę strony (opcjonalne, ale pomocne w wielu przypadkach)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  useEffect(() => {
    const photoDocRef = doc(db, `galleries/${userId}/photos`, docId);
    const unsubscribe = onSnapshot(photoDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const fetchedDescriptions = docSnap.data().descriptions || [];
        setDescriptions(fetchedDescriptions);
      }
    });

    return () => unsubscribe();
  }, [userId, docId]);

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const saveDescription = async () => {
    if (!newDescription.trim()) return;
    setSaving(true);
    try {
      const photoDocRef = doc(db, `galleries/${userId}/photos`, docId);
      await updateDoc(photoDocRef, {
        descriptions: arrayUnion(newDescription),
      });
      setNewDescription("");
    } catch (error) {
      console.error("Błąd podczas zapisywania opisu:", error);
    }
    setSaving(false);
  };

  const handleImageLoad = () => {
    setLoaded(true);
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
          {...props}
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
