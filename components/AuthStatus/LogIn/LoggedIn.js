import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import {
  Container,
  TextTitle,
  TextUser,
  Avatar,
  LogOutButton,
} from "./LoggedIn.styled";

export const LoggedIn = ({ email }) => {
  const user = auth.currentUser;
  
  // do poprawy nie dziala ten sposob
  const photoURL = "/dial2.jpg" || user?.photoURL ;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log(`Użytkownik ${email} wylogowany`);
      alert("Pomyślnie wylogowano!");
    } catch (error) {
      console.error("Błąd podczas wylogowania", error);
      alert("Wystąpił błąd podczas wylogowania.");
    }
  };

  return (
    <Container>
      <TextTitle>
        Hi !{" "}
        <Avatar
          src={photoURL}
          alt="Avatar użytkownika"
        />
      </TextTitle>
      <TextUser>{email || "Użytkownik"}</TextUser>
      <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
    </Container>
  );
};
