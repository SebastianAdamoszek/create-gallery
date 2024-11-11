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
  border: none;
  font-weight: bold;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
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
  border: none;
  font-weight: bold;
  background: linear-gradient(-135deg, #6a11cb, #2575fc);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(-135deg, #2575fc, #6a11cb);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
