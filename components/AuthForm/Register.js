"use client";
import { useAuthForm } from "./useAuthForm";
import Image from "next/image";
import {
  LogInGoogle,
  Form,
  ValidateError,
  LogRegContainer,
  LogButton,
  RegButton,
} from "./AuthForm.styled";
import { RegisterContainer,ButtonBack, RegisterFormContainer, Info } from "./Register.styled";
import Link from "next/link";

export const Register = () => {
  const {
    user,
    email,
    password,
    error,
    emailError,
    isLogin,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    handleGoogleLogin,
    showLoginMode,
    showRegisterMode,
  } = useAuthForm();


  return (
    <>
      <RegisterContainer
        style={{ display: user ? "none" : "flex" }}
      >
         <Link data-aos="fade-up" href="/welcome">
          <ButtonBack>Wróć do strony powitalnej</ButtonBack>
        </Link>
        <RegisterFormContainer style={{ display: user ? "none" : "flex" }}>
          <LogRegContainer>
            <LogButton onClick={showLoginMode} disabled={isLogin}>
              Logowanie
            </LogButton>
            <RegButton onClick={showRegisterMode} disabled={!isLogin}>
              Rejestracja
            </RegButton>
          </LogRegContainer>
          <h2>{isLogin ? "Logowanie" : "Rejestracja"}</h2>
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
              onChange={handlePasswordChange}
              required
            />
            {error && <ValidateError>{error}</ValidateError>}
            <button type="submit">
              {isLogin ? "Zaloguj się" : "Zarejestruj się"}
            </button>
          </Form>
        </RegisterFormContainer>
        <Info data-aos="fade-up">Jesli jeszcze nie posiadasz konta kliknij {'"Rejestracja"'}</Info>
      </RegisterContainer>
    </>
  );
};
