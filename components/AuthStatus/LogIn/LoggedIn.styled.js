import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid rgba(100, 100, 100, 0.8);
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5),
    rgba(100, 100, 100, 0.2)
  );
  width: 80px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
export const TextTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;
export const TextUser = styled.span`
  font-size: 10px;
  overflow: hidden;
  width: 70px;
  text-align: center;
  z-index: 1;

  &:hover {
    width: auto;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
export const AvatarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 1rem 0;
`;

export const AvatarOption = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;
export const LogOutButton = styled.button`
  font-size: 8px;
  cursor: url("/cursor-pointer.svg") pointer;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2px 10px;
  border-radius: 5px;
  border: none;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(200, 200, 200, 0.8);
    color: rgba(0, 0, 0, 1);
    font-weight: 700;
    border-radius: 2px;
  }
`;

export const Icon = styled.span`
  font-size: 17px;
  padding: 0 0 0 10px;
`;

export const Avatar = styled.img`
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;
