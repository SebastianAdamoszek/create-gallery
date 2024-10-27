import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
//  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

 apiKey: "AIzaSyCvwHDOhReMqeY5NBvCsbA3foEiGOvUYnU",

  authDomain: "create-gallery.firebaseapp.com",

  projectId: "create-gallery",

  storageBucket: "create-gallery.appspot.com",

  messagingSenderId: "683983058698",

  appId: "1:683983058698:web:c571ef94bcdf11eaf3acf3",

  measurementId: "G-L9NHQ546Q8",
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Inicjalizacja Firebase Analytics (tylko po stronie klienta)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    } else {
      console.log("Firebase Analytics nie jest wspierany w tym środowisku.");
    }
  });
}

// Inicjalizacja Firebase Authentication i Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
