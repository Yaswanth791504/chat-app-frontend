/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ImageContainer from "./ImageContainer";

const Chat = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  height: 4rem;
  cursor: pointer;
  border-bottom: 0.5px solid #eeeeee5c;
  margin-bottom: 10px;
  padding: 0 15px;
  border-radius: 10px;
  width: 100%;
  &.active,
  &:hover {
    background-color: #eeeeee5c;
  }
`;
const ChatText = styled.div`
  flex: 1;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FriendChat = ({ friend: { name, profileImage, _id: id } }) => {
  return (
    <>
      <Chat to={`/mine/chats/${id}`}>
        <ImageContainer link={`${profileImage}`} alt="profile" size="45px" />
        <ChatText>
          <Text fontSize="md" as="b">
            {name}
          </Text>
          <Text fontSize="xs">Msg</Text>
        </ChatText>
        <div>
          <Text fontSize="xs">time</Text>
        </div>
      </Chat>
    </>
  );
};

export default FriendChat;
