import styled from "styled-components";

export const Burger = styled.ul`
  width: 50px;
  height: 50px;
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 50%;
  border: 2px solid darkgrey;
  position: relative;
  z-index: 200;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 250ms ease-in-out;

  .first {
    transform: ${({ $isOpen }) => ($isOpen ? "translateY(-100px)" : "")};
  }
  .second {
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg) scaleX(1.1)" : "")};
  }
  .third {
    transform: ${({ $isOpen }) =>
      $isOpen
        ? "rotate(-45deg) translateY(-7px) translateX(7px) scaleX(1.1)"
        : ""};
  }

  &:hover .first {
    transform: translateY(-100px) rotate(720deg);
  }

  &:hover .second {
    transform: ${({ $isOpen }) =>
      $isOpen
        ? "rotate(45deg) scaleX(1.1)"
        : "rotate(45deg) translateX(-3px) translateY(7px) scaleX(0.8)"};
    box-shadow: ${({ $isOpen }) =>
      $isOpen ? "0px 0px  2px 1px" : "3px 3px  2px 1px"};
  }

  &:hover .third {
    transform: ${({ $isOpen }) =>
      $isOpen
        ? "rotate(-45deg) translateY(-7px) translateX(7px) scaleX(1.1)"
        : "rotate(-45deg) translateY(-1px) translateX(10px) scaleX(0.8)"};
    box-shadow: ${({ $isOpen }) =>
      $isOpen ? "0px 0px   2px 1px" : "-3px 3px  2px 1px"};
  }

  @media (min-width: 768px) {
    & {
      // display: none;
      visibility: hidden;
    }
  }
`;

export const BurgerLine = styled.li`
  width: 30px;
  padding: 3px;
  margin: 2px;
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 10px;
  transition: all 250ms cubic-bezier(0.25, 0.1, 0.25, 0);

  &.first {
    transition: 150ms ease-in-out;
  }
`;
