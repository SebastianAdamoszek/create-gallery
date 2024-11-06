"use client";
import { useAuthForm } from "./useAuthForm";
import Image from "next/image";
import {
  AuthFormContainer,
  HideFormButton,
  LogInGoogle,
  Form,
  MinimizedFormButton,
  ValidateError,
  LogRegContainer,
  LogButton,
  RegButton,
} from "./AuthForm.styled";

export const AuthForm = () => {
  const {
    user,
    email,
    password,
    error,
    emailError,
    isLogin,
    zoomOut,
    handleEmailChange,
    handlePasswordChange, // Obsługa zmiany hasła
    handleSubmit,
    handleGoogleLogin,
    // toggleAuthMode,
    toggleMinimize,
    showLoginMode,
    showRegisterMode,
  } = useAuthForm(); // Używamy hooka

  return (
    <>
      {!zoomOut && (
        <AuthFormContainer style={{ display: user ? "none" : "flex" }}>
          <HideFormButton onClick={toggleMinimize}>⬇️</HideFormButton>

          <LogRegContainer>
            <LogButton onClick={showLoginMode} disabled={isLogin}>
              Login
            </LogButton>
            <RegButton onClick={showRegisterMode} disabled={!isLogin}>
              Registration
            </RegButton>
          </LogRegContainer>

          <h2>{isLogin ? "Log in" : "Register"}</h2>
          <LogInGoogle>
            <Image
              src="/google.jpg"
              alt="google image"
              width={21}
              height={20}
            />
            <button onClick={handleGoogleLogin}>Log in with Google</button>
          </LogInGoogle>
          <Form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <ValidateError>{emailError}</ValidateError>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange} // Obsługa zmiany hasła required
            />
            {error && <ValidateError>{error}</ValidateError>}
            <button type="submit">{isLogin ? "Log In" : "Register"}</button>
          </Form>
        </AuthFormContainer>
      )}
      {zoomOut && (
        <MinimizedFormButton
          onClick={toggleMinimize}
          title="Formularz rejestracji i logowania"
        >
          📝
        </MinimizedFormButton>
      )}
    </>
  );
};
