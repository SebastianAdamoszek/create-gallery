import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

// Komponent do opakowania całego menu
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Stylizacja przycisku wywołującego menu rozwijane
const DropdownButton = styled.a`
  background-color: transparent;
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
      <DropdownButton onClick={toggleDropdown}>Users Gallery</DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        <li>
          <Link
            href={`/my-gallery/[userId]`}
            as={`/my-gallery/3XtfWqV7VaWoH354YEqemP7Df3h1`}
            onClick={closeMenu}
          >
            <p>Users 1</p>
          </Link>
        </li>
        <li>
          <Link
            href={`/my-gallery/[userId]`}
            as={`/my-gallery/AwY53Zk5sYfSL3XJm663peM5sAC2`}
            onClick={closeMenu}
          >
            <p>Users 2</p>
          </Link>
        </li>
        <li>
          <Link
            href={`/my-gallery/[userId]`}
            as={`/my-gallery/nRFugQ54pyczgojVdK1PaOXshal2`}
            onClick={closeMenu}
          >
            <p>User 3</p>
          </Link>
        </li>
      </DropdownMenu>
    </DropdownContainer>
  );
};
