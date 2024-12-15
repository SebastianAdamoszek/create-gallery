"use client";
import styles from "@/app/page.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Link from "next/link";
import {
  QuickQuestionContainer,
  QuickQuestionContent,
  ButtonsListContainer,
  ListContainer,
  ListMore,
  ListLess,
} from "./QuickQuestion.styled";

export const QuickQuestion = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <QuickQuestionContainer>
      <QuickQuestionContent data-aos="fade-up">
        <h1 data-aos="fade-up">
          Serwis zegarmistrzowski {'"czasowa-klinika"!'}
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
          </ListMore>

          <ListLess>
            <p>mniej mozliwości</p>
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
