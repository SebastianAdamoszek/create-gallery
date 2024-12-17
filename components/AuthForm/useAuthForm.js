"use client"
import { useState, useEffect } from "react";
import { loginUser, registerUser, loginWithGoogle } from "../../firebase/Authorization"; // Import funkcji autoryzacyjnych
import { useAuthState } from "react-firebase-hooks/auth"; // Importowanie hooka z firebase
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";


export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Przełączanie między logowaniem a rejestracją
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(""); // Walidacja e-maila
  const [zoomOut, setIsMinimized] = useState(false); // Minimalizacja okna
  const [user] = useAuthState(auth); // Hook do monitorowania stanu zalogowania użytkownika
  const [isLoginMode] = useState(true);
  const [isRegisterMode] = useState(false);
  const router = useRouter();

  // Walidacja e-maila
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Obsługa zmiany e-maila
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setEmailError("Adres musi zawierać '@' i domenę.");
    } else {
      setEmailError("");
    }
  };

    // Obsługa zmiany hasła
    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // Aktualizacja hasła
      };

  // Obsługa formularza (logowanie/rejestracja)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Podaj poprawny adres e-mail.");
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    let response;
    if (isLogin) {
      response = await loginUser( email, password); // Logowanie
    } else {
      response = await registerUser( email, password); // Rejestracja
    }

    if (!response.success) {
      setError(response.message);
    } else {
      router.push("/my-gallery"); 
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/my-gallery");
    }
  }, [user, router]);

  // Logowanie przez Google
  const handleGoogleLogin = async () => {
    const response = await loginWithGoogle();
    if (!response.success) {
      setError(response.message);
    }
  };
  
  const showLoginMode = () => {
    setIsLogin(true); // Ustaw tryb logowania
  };
  
  const showRegisterMode = () => {
    setIsLogin(false); // Ustaw tryb rejestracji
  };
  
  

  // Minimalizacja okna
  const toggleMinimize = () => {
    setIsMinimized(!zoomOut);
  };

  return {
    user,
    email,
    password,
    error,
    emailError,
    isLogin,
    zoomOut,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleGoogleLogin,
    toggleMinimize,
    showLoginMode,
    showRegisterMode,
    isLoginMode,
    isRegisterMode
  };
};
