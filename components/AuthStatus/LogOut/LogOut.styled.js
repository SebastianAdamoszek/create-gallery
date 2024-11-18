import styled from "styled-components";

export const IconContainer = styled.div`
  cursor: url("/cursor-pointer.svg"), pointer;
`;

export const Icon = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5),
    rgba(100, 100, 100, 0.2)
  );
  width: 80px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 35px;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(
      1.05
    ); // Minimalnie większe skalowanie dla wyraźniejszego efektu
    background-color: rgba(
      150,
      150,
      150,
      0.6
    ); // Zmiana koloru na ciemniejszy odcień
  }
`;
