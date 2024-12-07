import styled from "styled-components";

export const ChatPageContainer = styled.div`
  position: fixed;
  background-color: gray;
  border: 3px solid darkgray;
  border-radius: 8px;
  z-index: 0;
  /* cursor: url("/cursor-grab.png"), grab; */
  cursor: grab;

  animation: incrase 0.5s ease-in-out;
  @keyframes incrase {
    0% {
      transform: scale(0.2);
    }
  }

  h3 {
    margin: 0;
    padding: 1px;
    text-align: left;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;

  button {
    padding: 3px;
    border-radius: 7px;
    transition: 0.2s ease-in-out;
  }
  button:hover {
    background-color: rgb(65, 65, 65);
  }
`;

export const HideChatButton = styled.button`
  position: absolute;
  top: -35px;
  right: 0px;
  width: 30px;
  height: 20px;
  background: none;
  border: none;
  font-size: 25px;
  cursor: url("/cursor-pointer.svg"), pointer;
  text-align: center;
`;

export const MinimizedChatButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(70, 100, 255, 0.8),
    rgba(70, 100, 255, 0.3)
  );
  border: none;
  z-index: 1000;
  font-size: 24px;
  cursor: url("/cursor-pointer.svg"), pointer;
  transition: 0.25s ease-in-out;

  animation: slide 0.5s ease-in-out;
  @keyframes slide {
    0% {
      bottom: 300px;
      right: 200px;
      transform: scale(0.2);
    }
    80% {
      bottom: 200px;
      right: 20px;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 250, 0.5);
    font-size: 25px;
  }
`;

export const GuestChatContainer = styled.div`
  padding: 5px;
  text-align: center;
`;
