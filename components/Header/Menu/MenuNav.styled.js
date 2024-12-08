import styled from "styled-components";

export const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(82, 52, 28, 0.7);
  position: absolute;
  width: 100%;
  top: 70px;
  left: 0;
  padding: 15px;
  z-index: -1;
  color: auto;
  transform: translateY(-100%) scaleY(0);
  opacity: 1;
  transition: transform 0.5s ease-in-out, opacity 0.3s ease-in-out;
  li {
    width: 130px;
    color: auto;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    transform: translateY(0);
    `}

  @media (min-width: 768px) {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    padding: 15px 0;
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
    li {
      width: auto;
    }
  }

  @media (min-width: 1368px) {
    justify-content: center ;
    gap:  40px;
  }
`;
