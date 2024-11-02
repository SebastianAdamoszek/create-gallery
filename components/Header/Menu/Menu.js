"use client";
import React, { useState, useEffect, useRef } from "react";
import { Burger, BurgerLine } from "./ButtonMenuMobile.styled.js";
import { Menu, Nav } from "./MenuNav.styled.js";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { UserGalleryDropdown } from "./MenuUsersGallery/MenuUsersGallery.js";

export const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const auth = getAuth();

    // Funkcja zamykająca menu przy kliknięciu poza nim
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

  return (
    <Menu>
      <Burger onClick={toggleMenu} isOpen={isOpen}>
        <BurgerLine className="first" />
        <BurgerLine className="second" />
        <BurgerLine className="third" />
      </Burger>
      <Nav isOpen={isOpen} ref={dropdownRef}>
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
          {/* users galleries */} <UserGalleryDropdown />
        </li>
      </Nav>
    </Menu>
  );
};
