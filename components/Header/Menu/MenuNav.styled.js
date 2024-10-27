import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  background-color: rgba(12, 38, 124, 0.2);
  position: absolute;
  top: 70px;
  left: 0;
  padding: 15px;
  z-index: -1;
  color: auto;
  transform: translateY(-100%) scaleY(0);
  opacity: 1;
  transition: transform 0.5s ease-in-out, opacity 0.3s ease-in-out;
    li {
      width: 25%;
    }

  ${({ isOpen }) =>
    isOpen &&
    `
    font-size: 16px;
    transform: translateY(0);
    opacity: 1;
    animation: show-font 0.5s ease-in-out;
     @keyframes show-font {
        0% {
          color: rgba(0, 0, 0, 0);
        }
        90% {
          color: rgba(0, 0, 0, 0);
        }
        100% {
          color: auto;
        }
    }   
`}

  @media (min-width: 768px) {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: auto;
    gap: 15px;
    background-color: inherit;
    z-index: 0;
    font-size: 16px;
    transform: translateY(0);
    opacity: 1;

    animation: show-font 1s ease-in-out;
    @keyframes show-font {
      0% {
        color: rgba(0, 0, 0, 0);
      }
      100% {
        color: auto;
      }
    }
  }
`;
