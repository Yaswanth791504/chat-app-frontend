import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getUserFriends } from "../services/user";
import FriendChat from "./FriendChat";

export const HomePageFriendChat = styled.div`
  height: 87vh;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 20px 10px;
  box-shadow: var(--box-shadow);
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0400ff67;
    border-radius: 100px;
  }
`;

const HomePageFriendChats = () => {
  const { data } = useQuery({
    queryKey: ["chats"],
    queryFn: getUserFriends,
  });

  return (
    <HomePageFriendChat>
      {data &&
        data?.map((friend) => <FriendChat key={friend._id} friend={friend} />)}
    </HomePageFriendChat>
  );
};

export default HomePageFriendChats;
