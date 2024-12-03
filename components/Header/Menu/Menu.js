"use client";
import React, { useState, useEffect, useRef } from "react";
import { Burger, BurgerLine } from "./ButtonMenuMobile.styled.js";
import { Menu, Nav } from "./MenuNav.styled.js";
import Link from "next/link";
import { UsersGalleries } from "./MenuUsersGallery/MenuUsersGallery.js";
import { ForAdminUsersGalleries } from "@/components/ForAdmin/ForAdminUsersGalleries/ForAdminUsersGalleries.js";

export const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const burgerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      burgerRef.current &&
      !burgerRef.current.contains(event.target)
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
      <Burger onClick={toggleMenu} data-isopen={isOpen} ref={burgerRef}>
        <BurgerLine className="first" $isOpen={isOpen} />
        <BurgerLine className="second" $isOpen={isOpen} />
        <BurgerLine className="third" $isOpen={isOpen} />
      </Burger>
      <Nav $isOpen={isOpen} ref={dropdownRef}>
        <li>
          <Link href="/home" onClick={() => setIsOpen(false)}>
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <p>Contact</p>
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/users" onClick={() => setIsOpen(false)}>
            <p>Users</p>
          </Link>
        </li>
        <li>
          <Link href="/my-gallery" onClick={() => setIsOpen(false)}>
            <p>My Gallery</p>
          </Link>
        </li>
        <li>
          <Link href="/clock" onClick={() => setIsOpen(false)}>
            <p>Clock</p>
          </Link>
        </li>
        <li>
          <UsersGalleries />
        </li>
        <li>
          <ForAdminUsersGalleries />
        </li>
      </Nav>
    </Menu>
  );
};
