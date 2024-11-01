"use client";
import React, { useState } from "react";
import { Burger, BurgerLine } from "./ButtonMenuMobile.styled.js";
import { Menu, Nav } from "./MenuNav.styled.js";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { UserGalleryDropdown } from "./MenuUsersGallery/MenuUsersGallery.js";

export const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const auth = getAuth();
  const user = auth.currentUser;

  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    // Możesz dodać więcej użytkowników do listy
  ];

  return (
    <Menu>
      <Burger onClick={toggleMenu} isOpen={isOpen}>
        <BurgerLine className="first" />
        <BurgerLine className="second" />
        <BurgerLine className="third" />
      </Burger>
      <Nav isOpen={isOpen}>
        <li>
          <Link href="/home" onClick={closeMenu}>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={closeMenu}>
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={closeMenu}>
            <p>Contact</p>
          </Link>
        </li>
        <li>
          <Link href="/my-gallery" onClick={closeMenu}>
            <p>My Gallery</p>
          </Link>
        </li>
        <li>
          {/* users galleries */} <UserGalleryDropdown users={users} />
        </li>
      </Nav>
    </Menu>
  );
};
