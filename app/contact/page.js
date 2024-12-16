"use client";
import React, { useState, useEffect } from "react";
import { ChatPage } from "@/components/Chat/ChatPage";
import styles from "../page.module.css";

export default function ContactPage() {
  return (
  <div className={styles.main__next}>
      <ChatPage />
      <h2>nr kontaktowy </h2>
      <p>+48 793 083 013</p>
  </div>
  );
}
