import { Background } from "react-imgix";
import styles from "../page.module.css";

export default function HomePage() {
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
        <h2>Witamy w naszej aplikacji!</h2>
        <p>
          Nasze narzędzie zostało stworzone, aby ułatwić komunikację z klientami
          w zakresie usług i napraw. Dzięki przyjaznym funkcjom możesz lepiej
          zarządzać naszą współpracą.
        </p>
        <h2>Przesyłanie zdjęć i opisów</h2>
        <p>
          Udostępniaj zdjęcia i opisy, aby szybko i sprawnie przekazywać
          szczegóły dotyczące możliwości wykonanej usługi. To proste rozwiązanie
          pozwala na bieżąco informować serwis i utrzymywać wysoką jakość
          obsługi.
        </p>
        <h2>Koordynacja i umawianie spotkań</h2>
        <p>
          Organizuj spotkania, koordynuj terminy i dbaj o szczegóły – wszystko w
          jednym miejscu. Dzięki naszej aplikacji Twoja komunikacja z serwisem
          stanie się prostsza i bardziej efektywna.
        </p>
        <h2>Sprawniejsza organizacja pracy</h2>
        <p>
          Używając naszego narzędzia, zyskasz kontrolę nad swoimi reklamacjami i
          lepszą organizację pracy. A jesli jesteś klientem indywidualnym łatwo
          możesz skierować zapytanie do serwisu. Dołącz do nas i zobacz, jak
          możesz usprawnić nasza współprace.
        </p>
        <h2>Rejestracja i logowanie</h2>
        <p>
          Aby w pełni skorzystać z naszej platformy i uzyskać dostęp do
          wszystkich funkcji, musisz się zarejestrować i utworzyć konto.
          Rejestracja jest szybka i prosta — wystarczy kilka kroków, aby zyskać
          pełne możliwości naszego serwisu. Po zalogowaniu się będziesz mógł
          korzystać z personalizowanych opcji i śledzić postęp Twojego zgłoszenia.
        </p>
        <p>
          Pamiętaj, że Twoje konto zapewni Ci pełną kontrolę nad naszą
          korespondencją, a także ułatwi korzystanie z naszej platformy.
          Zachęcamy do rejestracji, aby móc w pełni cieszyć się wszystkimi
          funkcjami, które przygotowaliśmy z myślą o Tobie!
        </p>
        <h2>Dziękujemy, że jesteś z nami!</h2>
      </div>
    </div>
  );
}
