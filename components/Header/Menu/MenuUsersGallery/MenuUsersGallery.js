import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

// Komponent do opakowania całego menu
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Stylizacja przycisku wywołującego menu rozwijane
const DropdownButton = styled.div`
  background-color: transparent;
  display: flex;

  p {
    span {
      display: inline-block;
      transform: rotate(180deg) translateY(7px);
    }
  }
`;

// Stylizacja menu rozwijanego
const DropdownMenu = styled.ul`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  position: absolute;
  background-color: rgba(12, 38, 124, 0.8);
  border-radius: 5px;
  width: 100%;
  z-index: 1;
`;
export const Arrows = styled.ul`
  .first {
    transform: ${({ isOpen }) =>
      isOpen
        ? "rotate(45deg) scaleX(1.1)"
        : "rotate(45deg) translateX(-3px) translateY(7px) scaleX(0.8)"};
    box-shadow: ${({ isOpen }) =>
      isOpen ? "0px 0px  2px 1px" : "3px 3px  2px 1px"};
  }

  .second {
    transform: ${({ isOpen }) =>
      isOpen
        ? "rotate(-45deg) translateY(-7px) translateX(7px) scaleX(1.1)"
        : "rotate(-45deg) translateY(-1px) translateX(10px) scaleX(0.8)"};
    box-shadow: ${({ isOpen }) =>
      isOpen ? "0px 0px   2px 1px" : "-3px 3px  2px 1px"};
  }
`;
export const Arrow = styled.li`
  width: 5px;
  /* padding: 3px;
  margin: 2px; */
  background-color: rgba(128, 128, 128, 0.5);
  border-radius: 10px;
  transition: all 250ms cubic-bezier(0.25, 0.1, 0.25, 0);
`;

export const UserGalleryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Funkcja obsługująca otwieranie i zamykanie menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <p>
          Users Gallery <span>^</span>
        </p>
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        <li>
          <Link
            href={`/my-gallery/[userId]`}
            as={`/my-gallery/3XtfWqV7VaWoH354YEqemP7Df3h1`}
            onClick={closeMenu}
          >
            <p>User_1</p>
          </Link>
        </li>
        <li>
          <Link
            href={`/my-gallery/[userId]`}
            as={`/my-gallery/AwY53Zk5sYfSL3XJm663peM5sAC2`}
            onClick={closeMenu}
          >
            <p>User_2</p>
          </Link>
        </li>
        <li>
          <Link
            href={`/my-gallery/[userId]`}
            as={`/my-gallery/nRFugQ54pyczgojVdK1PaOXshal2`}
            onClick={closeMenu}
          >
            <p>User_3</p>
          </Link>
        </li>
      </DropdownMenu>
    </DropdownContainer>
  );
};
