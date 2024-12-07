import styled from "styled-components";

export const ButtonsContainer = styled.div`
  position: relative;
  left: 0;
  top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
  width: 100%;
  @media (min-width: 768px) {
    gap: 0px;
  }
  @media (min-width: 1024px) {
    width: 70%;
  }
`;

export const ButtonAdd = styled.button`
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

export const ButtonDel = styled.button`
  padding: 10px 25px;
  width: 110px;
  border-radius: 10px;
  border: 2px solid rgb(236, 225, 214);
  font-weight: bold;
  background: linear-gradient(
    -135deg,
    rgba(48, 27, 10, 0.9),
    rgba(135, 77, 30, 0.9)
  );
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(
      -135deg,
      rgba(135, 77, 30, 0.9),
      rgba(48, 27, 10, 0.9)
    );
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
