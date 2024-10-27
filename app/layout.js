"use client";
import React, { useState, useEffect } from "react";
import { HeaderComponent } from "@/components/Header/Header.js";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import styles from "./layout.module.css";
import { ChatPage } from "@/components/Chat/ChatPage.js";
import { Loader } from "@/components/Loader/Loader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Symulacja ładowania danych
    const timer = setTimeout(() => {
      setLoading(false); // Po upływie 2 sekund ustaw loading na false
    }, 2000); // Możesz zmienić czas ładowania

    return () => clearTimeout(timer); // Czyszczenie timera
  }, []);

  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          {loading ? (
            <Loader />
          ) : (
            <div className="start-layout">
          
              <HeaderComponent />
              <main>{children}</main>

              <footer>
                <ul className={styles.footer}>
                  <li>
                    <p>Footer Content</p>
                  </li>
                </ul>
              </footer>
              <ChatPage />
            </div>
          )}
        </body>
      </html>
    </>
  );
}
