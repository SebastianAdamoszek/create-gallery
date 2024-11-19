import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import {
  Container,
  TextTitle,
  Avatar,
  TextUser,
  LogOutButton,
} from "./LoggedIn.styled";

export const LoggedIn = ({ email }) => {

  const user = auth.currentUser;
  const photoURL = user?.photoURL

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
          src={photoURL || "/dial2.jpg"}
          alt="Avatar użytkownika"
        />
      </TextTitle>
      <TextUser>{email || "Użytkownik"}</TextUser>
      <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
    </Container>
  );
};

// return (
//   <Container>
//     <TextTitle>
//       Hi !<Icon>🙂</Icon>
//     </TextTitle>
//     <TextUser>{email}</TextUser>
//     <LogOutButton onClick={handleLogout}>Log out</LogOutButton>
//   </Container>
// );
// };
