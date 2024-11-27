import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: ${({ $isAdmin }) => ($isAdmin ? "inline" : "none")};
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
`;

export const User = styled.p`
  overflow: hidden;
  width: 500%;
  font-size: 12px;
  padding: 2px;
`;

export const GalleryPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 5px double;
  border-radius: 15px;
  align-items: center;
  h2 {
    text-align: center;
    padding: 20px 0 5px 0;
  }
  h3 {
    text-align: center;
    font-size: 16px;
    overflow-wrap: break-word;
    width: 300px;
  }
  @media (min-width: 768px) {
    margin-top: 0;
    h2 {
      font-size: 22px;
    }
    h3 {
      font-size: 18px;
      width: 430px;
    }
  }
`;

export const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;

  @media (min-width: 768px) {
  }
  @media (min-width: 1200px) {
    gap: 25px;
  }
`;
