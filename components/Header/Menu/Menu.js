"use client";
import React, { useState } from "react";
import { Burger, BurgerLine } from "./ButtonMenuMobile.styled.js";
import { Menu, Nav } from "./MenuNav.styled.js";
import Link from "next/link";

export const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
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
          <Link href="/gallery" onClick={closeMenu}>
            <p>Gallery</p>
          </Link>
        </li>
      </Nav>
    </Menu>
  );
};
