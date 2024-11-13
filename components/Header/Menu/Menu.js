"use client";
import React, { useState, useEffect, useRef } from "react";
import { Burger, BurgerLine } from "./ButtonMenuMobile.styled.js";
import { Menu, Nav } from "./MenuNav.styled.js";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { UsersGalleries } from "./MenuUsersGallery/MenuUsersGallery.js";
import {ForAdminUsersGalleries} from "@/components/ForAdmin/ForAdminUsersGalleries/ForAdminUsersGalleries.js"

export const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const burgerRef = useRef(null); // Dodajemy referencję do burgera
  const auth = getAuth();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState); // Przełączanie stanu menu
  };

  // Funkcja zamykająca menu przy kliknięciu poza nim
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target) && // Sprawdzamy, czy kliknięcie nie było w menu
      burgerRef.current && !burgerRef.current.contains(event.target) // Sprawdzamy, czy kliknięcie nie było w burgerze
    ) {
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
      <Burger onClick={toggleMenu} isOpen={isOpen} ref={burgerRef}> {/* Użycie referencji dla burgera */}
        <BurgerLine className="first" />
        <BurgerLine className="second" />
        <BurgerLine className="third" />
      </Burger>
      <Nav isOpen={isOpen} ref={dropdownRef}>
        <li>
          <Link href="/home" onClick={() => setIsOpen(false)}>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            {/* <p>Contact</p> */}
            <p>Clock</p>
          </Link>
        </li>
        <li>
          <Link href="/my-gallery" onClick={() => setIsOpen(false)}>
            <p>My Gallery</p>
          </Link>
        </li>
        <li>
          <UsersGalleries />
        </li>
        <li>
          <ForAdminUsersGalleries/>
        </li>
      </Nav>
    </Menu>
  );
};
