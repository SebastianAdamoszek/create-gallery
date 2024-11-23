"use client";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase"; // Dostęp do Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { Photo, PhotoForDel } from "@/components/ForAdmin/Photo/Photo";
import {
  GalleryPageContainer,
  GalleryContainer,
} from "@/components/ForAdmin/ForAdminUsersGalleries/ForAdminUsersGalleries.styled";
import { ButtonsContainer } from "@/components/ForAdmin/ButtonsAddDelPhoto/ButtonsAddDelPhoto.styled";
import {
  ButtonAddPhoto,
  ButtonDelPhoto,
} from "@/components/ForAdmin/ButtonsAddDelPhoto/ButtonsAddDelPhoto";
import { useRouter } from "next/navigation"; // Używamy useRouter do przekierowania

const UserGalleryAdminPage = ({ params }) => {
  const { userId } = params; // Wyciąganie userId z params
  const [photos, setPhotos] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const fetchPhotos = async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, `galleries/${userId}/photos`)
    );
    const photos = [];
    querySnapshot.forEach((doc) => {
      photos.push({ id: doc.id, ...doc.data() });
    });
    return photos;
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        router.push("/home");
      }
    });

    return () => unsubscribeAuth();
  });

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
    setShowModal(true);
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserEmail(docSnap.data().email);
      } else {
        console.log("Brak dokumentu użytkownika");
      }
    };

    fetchUserEmail();
  }, [userId]);

  const handleDeletePhoto = async (photoId) => {
    try {
      await deleteDoc(doc(db, `galleries/${userId}/photos`, photoId));
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Błąd podczas usuwania zdjęcia:", error);
    }
  };

  useEffect(() => {
    const loadPhotos = () => {
      const photosRef = collection(db, `galleries/${userId}/photos`);
      const q = query(photosRef, orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const photos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhotos(photos);
      });

      return () => unsubscribe();
    };

    loadPhotos();
  }, [userId]);

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
              <Photo
                key={photo.id}
                url={photo.url}
                userId={userId}
                docId={photo.id}
              />
            )
          )}
        </GalleryContainer>
      </GalleryPageContainer>
    </div>
  );
};

export default UserGalleryAdminPage;
