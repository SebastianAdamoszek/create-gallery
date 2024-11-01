import styled from "styled-components";

// Stylizacja kontenera dropdown
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Stylizacja przycisku dropdown
export const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 16px;
  width: 110%;

  p {
    margin: 0;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      transition: transform 0.3s ease;
      transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "none")};
    }
  }
`;

// Stylizacja menu dropdown
export const DropdownMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  position: absolute;
  background-color: rgba(12, 38, 124, 0.8);
  border-radius: 5px;
  font-size: 12px;
  z-index: 1;
  display: inline-block;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: 0% 0%;
`;

export const User = styled.p`
  overflow: hidden;
  width: 500%;
`;
