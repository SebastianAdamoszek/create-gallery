"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import { HeaderComponent } from "@/components/Header/Header.js";
import { Inter } from "next/font/google";
import "./globals.css";
import { StartLoader } from "@/components/Loader/Loader";

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
      <html lang="pl">
        <head>
          <title>Serwis zegarmistrzowski</title>
          <meta
            name="description"
            content="Kompleksowe usługi zegarmistrzowskie: wymiana pasków, bransolet, baterii, szkła, dorabianie szkieł, naprawa antyków. Katowice Chorzów. Dojazd do klienta"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="keywords"
            content="zegarmistrz, zegarmistrz kompleksowe usługi, naprawa zegarów, naprawa zegarków wymiana pasków, wymiana bransolet, wymiana baterii, dorabianie szkieł, naprawa antyków, zegary, zegarki, zegarmistrz Katowice, zegarmistrz Chorzów"
          />
          <meta property="og:title" content="Serwis zegarmistrzowski" />
          <meta
            property="og:description"
            content="Profesjonalne usługi zegarmistrzowskie: wymiana pasków, bransolet, baterii, szkła, dorabianie szkieł, naprawa antyków. Obsługujemy Katowice i Chorzów."
          />
          <meta property="og:image" content="/dial2.jpg" />
          <link rel="icon" href="/favicon.ico" type="image/jpg" />

          <Script id="structured-data" type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Serwis zegarmistrzowski",
              description:
                "Kompleksowe usługi zegarmistrzowskie: wymiana pasków, bransolet, baterii, szkła, dorabianie szkieł, naprawa antyków. Katowice i Chorzów.",
              image: "/dial2.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Katowice",
                addressRegion: "Śląskie",
                addressCountry: "PL",
              },
              telephone: "+48 123 456 789",
              openingHours: "Mo-Fr 09:00-18:00",
            })}
          </Script>
        </head>

        <title>Serwis zegarmistrzowski</title>
        <body className={inter.className}>
          {loading ? (
            <StartLoader />
          ) : (
            <div className="start-layout">
              <HeaderComponent />
              <main>{children}</main>

              <footer>
                <ul className="footer">
                  <li>
                    <p>Serwis zegarmistrzowski</p>
                    <p>{'"Czasowa-Klinika" !'}</p>
                    <span>aplikacja w ciągłej rozbudowie</span>
                  </li>
                </ul>
              </footer>
            </div>
          )}
        </body>
      </html>
    </>
  );
}
