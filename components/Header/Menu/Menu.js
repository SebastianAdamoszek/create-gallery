"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Burger, BurgerLine } from "./ButtonMenuMobile.styled.js";
import { Menu, Nav, NavItem, NavItemText } from "./MenuNav.styled.js";
import Link from "next/link";
import { UsersGalleries } from "./MenuUsersGallery/MenuUsersGallery.js";
import { ForAdminUsersGalleries } from "@/components/ForAdmin/ForAdminUsersGalleries/ForAdminUsersGalleries.js";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // Importowanie hooka z firebase

export const MenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const burgerRef = useRef(null);
  const [user] = useAuthState(auth);
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

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
        <NavItem>
          <Link href="/home" onClick={() => setIsOpen(false)}>
            <NavItemText className={isActive("/home") ? "active" : ""}>
              Home
            </NavItemText>
          </Link>
        </NavItem>
        {!user && (
          <NavItem>
            <Link href="/quick-question" onClick={() => setIsOpen(false)}>
              <NavItemText
                className={isActive("/quick-question") ? "active" : ""}
              >
                Question
              </NavItemText>
            </Link>
          </NavItem>
        )}

        <NavItem>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <NavItemText className={isActive("/contact") ? "active" : ""}>
              Contact
            </NavItemText>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            <NavItemText className={isActive("/about") ? "active" : ""}>
              About
            </NavItemText>
          </Link>
        </NavItem>
        {/* <li>
          <Link href="/users" onClick={() => setIsOpen(false)}>
            <p>Users</p>
          </Link>
        </li> */}
        <NavItem>
          <Link href="/my-gallery" onClick={() => setIsOpen(false)}>
            <NavItemText className={isActive("/my-gallery") ? "active" : ""}>
              My Gallery
            </NavItemText>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/clock" onClick={() => setIsOpen(false)}>
            <NavItemText className={isActive("/clock") ? "active" : ""}>
              Clock
            </NavItemText>
          </Link>
        </NavItem>
        <NavItem className={isActive("/user-gallery") ? "active" : ""}>
          <UsersGalleries />
        </NavItem>
        <NavItem
          className={isActive("/ForAdmin/UsersGalleries") ? "active" : ""}
        >
          <ForAdminUsersGalleries />
        </NavItem>
      </Nav>
    </Menu>
  );
};
