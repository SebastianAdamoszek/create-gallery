//ForAdmin/UsersGalleries/[userId]/page.js
"use client";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Dostęp do Firestore
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { Photo, PhotoForDel } from "@/components/ForAdmin/Photo/Photo";
import {
  GalleryPageContainer,
  GalleryContainer,
} from "@/components/ForAdmin/ForAdminUsersGalleries/ForAdminUsersGalleries.styled";
import "@/app/globals.css";
import { ButtonsContainer } from "@/components/ForAdmin/ButtonsAddDelPhoto/ButtonsAddDelPhoto.styled";
import {
  ButtonAddPhoto,
  ButtonDelPhoto,
} from "@/components/ForAdmin/ButtonsAddDelPhoto/ButtonsAddDelPhoto";
import { Loader } from "@/components/Loader/Loader";

const UserGalleryAdminPage = ({ params }) => {
  const { userId } = params; // Get userId from URL params
  const [photos, setPhotos] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Stan do przechowywania e-maila użytkownika
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // Stan do kontrolowania pokazywania modalu

  // Funkcja do pobierania zdjęć z Firestore
  const fetchPhotos = async (userId) => {
    const querySnapshot = await getDocs(collection(db, `galleries/${userId}/photos`));
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({ id: doc.id, ...doc.data() }); // Przechowuj doc.id jako ID dokumentu
    });
    return photos;
  };

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const fetchedPhotos = await fetchPhotos(userId);
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error("Błąd podczas pobierania zdjęć:", error);
      }
    };

    loadPhotos();
  }, [userId]);

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleAddPhoto = () => {
    setShowModal(true); // Pokazujemy modal
  };

  useEffect(() => {
    // Funkcja do pobrania e-maila użytkownika na podstawie userId
    const fetchUserEmail = async () => {
      const docRef = doc(db, "users", userId); // Odwołanie do dokumentu użytkownika w Firestore
      const docSnap = await getDoc(docRef); // Pobierz dokument

      if (docSnap.exists()) {
        setUserEmail(docSnap.data().email); // Ustaw e-mail w stanie
      } else {
        console.log("Brak dokumentu użytkownika");
      }
    };

    fetchUserEmail(); // Wywołanie funkcji
  }, [userId]);

  const handleDeletePhoto = async (photoId) => {
    try {
      await deleteDoc(doc(db, `galleries/${userId}/photos`, photoId));
      console.log("Zdjęcie zostało usunięte.");
      // Aktualizuj stan po usunięciu zdjęcia
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Błąd podczas usuwania zdjęcia:", error);
    }
  };

  return (
    <div className={styles.main__next}>
      <GalleryPageContainer>
        <h2>Galeria użytkownika: {userEmail}</h2>
        <ButtonsContainer>
          <ButtonDelPhoto
            toggleDeleteMode={toggleDeleteMode}
            isDeleteMode={isDeleteMode}
            userId={userId}
          />
          <ButtonAddPhoto onAddPhoto={handleAddPhoto} userId={userId} />
        </ButtonsContainer>

        <GalleryContainer>
          {photos.map((photo) =>
            isDeleteMode ? (
              <PhotoForDel
                key={photo.id}
                url={photo.url}
                photoId={photo.id}
                onDeletePhoto={handleDeletePhoto}
                userId={userId}
              />
            ) : (
              <Photo key={photo.id} url={photo.url} userId={userId} docId={photo.id} />
            )
          )}
        </GalleryContainer>
      </GalleryPageContainer>
    </div>
  );
};

export default UserGalleryAdminPage;

