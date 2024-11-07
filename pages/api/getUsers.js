// /pages/api/getUsers.js
import admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const users = listUsersResult.users.map((userRecord) => ({
      uid: userRecord.uid,
      email: userRecord.email, // Pobieranie e-maili użytkowników
    }));
    res.status(200).json({ users });
  } catch (error) {
    console.error("Błąd przy pobieraniu użytkowników:", error);
    res.status(500).json({ error: "Błąd przy pobieraniu użytkowników" });
  }
}
