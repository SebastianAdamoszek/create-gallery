"use client";
import styles from "@/app/page.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import {
  ButtonToHome,
  QuickQuestionContainer,
  QuickQuestionContent,
  ButtonsListContainer,
  ListContainer,
  ListMore,
  ListLess,
} from "./Welcome.styled";

export const Welcome = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <QuickQuestionContainer>
      <QuickQuestionContent data-aos="fade-up">
        <h3 data-aos="fade-up">{'"Strona Powitalna"'}</h3>
        <Link data-aos="fade-up" href="/home">
          <ButtonToHome>Przejdź do strony głôwnej</ButtonToHome>
        </Link>
        <h1 data-aos="fade-up">
          Serwis zegarmistrzowski {'"Czasowa-Klinika" !'}
        </h1>
        <h2 data-aos="fade-up">Witamy w naszej aplikacji!</h2>
        <ButtonsListContainer>
          <Link href="/login-register">
            <button>Logowanie i Rejestracja</button>
          </Link>
          <Link href="/quick-question">
            <button>Kontynuuj jako gość</button>
          </Link>
        </ButtonsListContainer>

        <ListContainer>
          <ListMore>
            <p> więcej korzyści</p>
            <li>
              + <span>dodatkowe funkcje</span>
            </li>
            <li>
              + <span>własna galeria przesłanych zdjęć</span>
            </li>
            <li>
              + <span>możliwość dodawania i usuwaia zdjęć</span>
            </li>
            <li>
              + <span>dostep do przesłanych zdjeć</span>
            </li>
            <li>
              + <span>odczyt powiadomień</span>
            </li>
            <li>
              + <span>dostęp do publicznego czatu</span>
            </li>
            <li>
              + <span>dostęp do zdjęc użytkowników bez opisów</span>
            </li>
            <li>
              + <span>lepsza komunikacja</span>
            </li>
            <li>
              + <span>kontakt poprzez platforme </span>
            </li>
          </ListMore>

          <ListLess>
            <p>mniej mozliwości</p>
            <li>
              - <span>jednorazowe przesłanie zdjęcia </span>
            </li>
            <li>
              - <span>kontakt z serwisem tylko telefoniczny</span>
            </li>
            <li>
              - <span>brak dostępu do przesłanych zdjęć</span>
            </li>
            <li>
              - <span>brak powiadomień</span>
            </li>
            <li>
              - <span>brak dostępu do zdjęć użytkowników</span>
            </li>
            <li>
              - <span>brak dostępu do czatu</span>
            </li>
          </ListLess>
        </ListContainer>
      </QuickQuestionContent>
    </QuickQuestionContainer>
  );
};
