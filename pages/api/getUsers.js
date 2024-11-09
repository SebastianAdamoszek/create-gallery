// /pages/api/getUsers.js
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  try {
    // Pobieranie listy użytkowników z Firebase Authentication
    const listUsersResult = await admin.auth().listUsers();
    
    // Pobieranie dodatkowych danych o użytkownikach (rola) z Firestore
    const usersWithRoles = await Promise.all(
      listUsersResult.users.map(async (userRecord) => {
        // Pobranie dokumentu użytkownika z Firestore
        const userDocRef = db.collection('users').doc(userRecord.uid);
        const userDoc = await userDocRef.get();
        
        // Jeśli dokument użytkownika istnieje, pobierz dane
        const userData = userDoc.exists ? userDoc.data() : {};
        
        // Tworzymy obiekt z danymi użytkownika i rolą
        const user = {
          uid: userRecord.uid,
          email: userRecord.email,
          role: userData.role,
        };

        // Wypisanie danych użytkownika w konsoli
        console.log('User Data:', user);
        
        return user;
      })
    );

    // Zwracanie wyników z rolą
    res.status(200).json({ users: usersWithRoles });
  } catch (error) {
    console.error("Błąd przy pobieraniu użytkowników:", error);
    res.status(500).json({ error: "Błąd przy pobieraniu użytkowników" });
  }
}
