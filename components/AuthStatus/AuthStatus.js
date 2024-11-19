import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { LoggedIn, } from "./LogIn/LoggedIn";
import { NotLoggedIn } from "./NotLoggedIn/NotLoggedIn";

export const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Czyszczenie subskrypcji
    return () => unsubscribe();
  }, []);

  return (
    <div>{user ? <LoggedIn email={user.email} /> : <NotLoggedIn />}</div>
  );
};
