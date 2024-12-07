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
  background: linear-gradient(135deg, #1c1f26, #2d3142, #4e5d73, #182747);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(-135deg, #1c1f26, #2d3142, #4e5d73, #182747);
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
  background: linear-gradient(-135deg, #1c1f26, #2d3142, #4e5d73, #182747);
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #1c1f26, #2d3142, #4e5d73, #182747);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
// background: linear-gradient(135deg, rgba(3, 24, 44, 0.9), rgba(0, 26, 53, 0.95), rgba(0, 28, 65, 1), rgba(4, 61, 138, 0.9), rgba(82, 134, 165, 1));
