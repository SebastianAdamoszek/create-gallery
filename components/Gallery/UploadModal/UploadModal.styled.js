import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 10%;
  left: 0;
  width: calc(100% - 30px);
  margin: 0 15px;
  padding: 10% 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 100;
`;

export const ButtonModal = styled.button` 
  padding: 10px 25px;
  width: 110px;
  border-radius: 10px;
  border: 2px solid rgb(236, 225, 214);
  font-weight: bold;
  background: linear-gradient(
    135deg,
    rgba(48, 27, 10, 0.9),
    rgba(135, 77, 30, 0.9)
  );
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(135, 77, 30, 0.9),
      rgba(48, 27, 10, 0.9)
    );
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;



export const Input = styled.input`
   
    border: 3px solid;
    border-radius: 10px;
    padding: 5px;
    width: 230px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Info = styled.div`
  position: relative;
  display: ${({ isLoggedIn }) => (isLoggedIn ? "none" : "block")};
  width: 300px;
  background-color: gray;
  border: 3px solid darkgray;
  border-radius: 8px;
  padding: 0 0 20px 0;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }
`;

export const ButtonToLogin = styled.button`
padding: 10px 20px;
margin: 10px 0 0 0;
border-radius: 10px;
`
