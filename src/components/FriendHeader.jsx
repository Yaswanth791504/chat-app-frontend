import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProfile } from "../services/user";
import ImageContainer from "./ImageContainer";

const FriendName = styled.div`
  flex: 1;
`;

const ChatSearchDiv = styled.div`
  width: 100%;
  height: 4.5rem;
  border-radius: 20px;
  background-color: #fff;
  padding: 10px;
  box-shadow: var(--box-shadow);
  display: flex;
  padding: 1rem;
  gap: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  align-items: center;
`;

const FriendHeader = () => {
  const { id } = useParams();
  const { data: friendData } = useQuery({
    queryKey: ["friendChatProfile"],
    queryFn: () => getProfile(id),
    onSuccess: (data) => {
      console.log(data);
    },
    refetchOnMount: true,
  });

  useEffect(() => {});

  return (
    <ChatSearchDiv>
      <ImageContainer
        size="50px"
        link={`${friendData?.data?.user?.profileImage}`}
        alt="profile"
      />
      <FriendName>
        <h1>{friendData?.data?.user?.name}</h1>
      </FriendName>
    </ChatSearchDiv>
  );
};

export default FriendHeader;
