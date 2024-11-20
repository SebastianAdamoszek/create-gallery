import { handleLogout } from "@/firebase/Authorization";
import { auth } from "@/firebase/firebase";
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
