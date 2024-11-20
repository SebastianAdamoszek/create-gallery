import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { handleLogout } from "@/firebase/Authorization";
import { Chat } from "./Chat";
import {
  ChatPageContainer,
  Title,
  MinimizedChatButton,
  GuestChatContainer,
  HideChatButton,
} from "./ChatPage.styled";
import "@/app/globals.css";

export const ChatPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
const [position, setPosition] = useState({ top: "0px", left: "0px" });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 240 && window.innerWidth < 480) {
        setPosition({
          top: !!user ? "105px" : "295px",
          left: !!user ? "0" : "5%",
        });
      } else if (window.innerWidth >= 480 && window.innerWidth < 768) {
        setPosition({
          top: !!user ? "105px" : "295px",
          left: !!user ? "25%" : "5%",
        });
      } else if (window.innerWidth >= 768 && window.innerWidth <= 1199) {
        setPosition({
          top: !!user ? "105px" : "227px",
          left: !!user ? "35%" : "5%",
        });
      } else {
        setPosition({
          top: !!user ? "105px" : "227px",
          left: !!user ? "40%" : "17%",
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  if (loading) {
    return (
      <div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - parseInt(position.left, 10),
      y: e.clientY - parseInt(position.top, 10),
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      top: `${e.clientY - offset.y}px`,
      left: `${e.clientX - offset.x}px`,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - parseInt(position.left, 10),
      y: touch.clientY - parseInt(position.top, 10),
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      top: `${touch.clientY - offset.y}px`,
      left: `${touch.clientX - offset.x}px`,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Funkcja minimalizowania okna
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {!isMinimized && (
        <ChatPageContainer
          style={{
            width: !user ? "270px" : "320px",
            height: !user ? "60px" : "415px",
            top: position.top,
            left: position.left,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <HideChatButton onClick={toggleMinimize}>⬇️</HideChatButton>{" "}
          {user ? (
            <>
              <Title>
                <h3>Witaj na czacie </h3>
                <h3>{user.email}</h3>
                <button onClick={handleLogout}>Wyloguj</button>
              </Title>
              <Chat />
            </>
          ) : (
            <GuestChatContainer>
              <p>Zaloguj się, aby uzyskać dostęp do czatu</p>
            </GuestChatContainer>
          )}
        </ChatPageContainer>
      )}
      {isMinimized && (
        <MinimizedChatButton onClick={toggleMinimize}>💬</MinimizedChatButton>
      )}
    </>
  );
};
