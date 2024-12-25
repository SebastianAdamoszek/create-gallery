"use client";
import styles from "../page.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 200,
    });
  }, []);

  return (
    <div className={styles.main__next}>
      <div
        style={{
          width: "80%",
          margin: "20px auto",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "10px",
        }}
      >
        <h2 data-aos="fade-up">Witamy w naszej aplikacji!</h2>
        <p data-aos="fade-up" style={{ textAlign: "center" }}>
          Nasze narzędzie zostało stworzone, aby ułatwić komunikację z klientami
          w zakresie usług i napraw. Dzięki przyjaznym funkcjom możesz lepiej
          zarządzać naszą współpracą.
        </p>
        <h2 data-aos="fade-up">Przesyłanie zdjęć i opisów</h2>
        <p data-aos="fade-up" style={{ textAlign: "center" }}>
          {" "}
          Udostępniaj zdjęcia i opisy, aby szybko i sprawnie przekazywać
          szczegóły dotyczące możliwości wykonanej usługi. To proste rozwiązanie
          pozwala na bieżąco informować serwis i utrzymywać wysoką jakość
          obsługi.
        </p>
        <h2 data-aos="fade-up">Koordynacja i umawianie spotkań</h2>
        <p data-aos="fade-up" style={{ textAlign: "center" }}>
          {" "}
          Organizuj spotkania, koordynuj terminy i dbaj o szczegóły – wszystko w
          jednym miejscu. Dzięki naszej aplikacji Twoja komunikacja z serwisem
          stanie się prostsza i bardziej efektywna.
        </p>
        <h2 data-aos="fade-up">Sprawniejsza organizacja pracy</h2>
        <p data-aos="fade-up" style={{ textAlign: "center" }}>
          {" "}
          Używając naszego narzędzia, zyskasz kontrolę nad swoimi reklamacjami i
          lepszą organizację pracy. A jesli jesteś klientem indywidualnym łatwo
          możesz skierować zapytanie do serwisu. Dołącz do nas i zobacz, jak
          możesz usprawnić nasza współprace.
        </p>
        <h2 data-aos="fade-up">Rejestracja i logowanie</h2>
        <p data-aos="fade-up" style={{ textAlign: "center" }}>
          {" "}
          Aby w pełni skorzystać z naszej platformy i uzyskać dostęp do
          wszystkich funkcji, musisz się zarejestrować i utworzyć konto.
          Rejestracja jest szybka i prosta — wystarczy kilka kroków, aby zyskać
          pełne możliwości naszego serwisu. Po zalogowaniu się będziesz mógł
          korzystać z personalizowanych opcji i śledzić postęp Twojego
          zgłoszenia.
        </p>
        <p data-aos="fade-up" style={{ textAlign: "center" }}>
          {" "}
          Pamiętaj, że Twoje konto zapewni Ci pełną kontrolę nad naszą
          korespondencją, a także ułatwi korzystanie z naszej platformy.
          Zachęcamy do rejestracji, aby móc w pełni cieszyć się wszystkimi
          funkcjami, które przygotowaliśmy z myślą o Tobie!
        </p>
        <h2 data-aos="fade-up">Dziękujemy, że jesteś z nami!</h2>
      </div>
    </div>
  );
}
