import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

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
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "none")};
    }
  }
`;

export const DropdownMenu = styled.ul`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  padding: 5px;
  position: absolute;
  background-color: rgba(82, 52, 28, 0.7);
  border-radius: 5px;
  z-index: 1;
  display: inline-block;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: 0% 0%;
  li {
    line-height: 1.3;
  }
`;

export const LoaderText = styled.p`
  font-size: 16px;
  background: linear-gradient(90deg, #3498db, #9b59b6);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  animation: shine 1.5s infinite;
  @keyframes shine {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
`

export const User = styled.p`
  overflow: hidden;
  width: 500%;
  font-size: 12px;
  padding: 2px ;
`;
