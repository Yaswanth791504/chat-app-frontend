import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getUserMessages } from "../services/user";
import Message from "./Message";
import MessageInput from "./MessageInput";

export const HomePageDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
`;

const HomePageFriendChat = styled.div`
  border-radius: 20px;
  background-color: #fff;
  box-shadow: var(--box-shadow);
  padding: 10px;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  overflow-y: scroll;
  height: 37.5rem;

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

const MessageDiv = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: end;
`;

const HomePageInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const HomePageMessageDiv = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["chatMessages"],
    queryFn: () => {
      return getUserMessages(id);
    },
    refetchInterval: 500,
  });

  return (
    <HomePageDiv>
      <HomePageFriendChat>
        {data?.map((frinendMessage) => {
          const date = new Date(frinendMessage.sent_at);
          const time = date.toLocaleTimeString().slice(0, 5);

          return (
            <MessageDiv
              style={
                frinendMessage.to === localStorage.getItem("userId")
                  ? { justifyContent: "start" }
                  : {}
              }
              key={frinendMessage._id}
            >
              <Message
                type={
                  frinendMessage.to === localStorage.getItem("userId")
                    ? "from"
                    : "to"
                }
              >
                {frinendMessage.message}
                <p
                  style={{
                    fontSize: "10px",
                    color:
                      frinendMessage.to !== localStorage.getItem("userId")
                        ? "#b2b2b2"
                        : "#ffffff9d",
                  }}
                >
                  {time}
                </p>
              </Message>
            </MessageDiv>
          );
        })}
      </HomePageFriendChat>
      <HomePageInput>
        <MessageInput />
      </HomePageInput>
    </HomePageDiv>
  );
};

export default HomePageMessageDiv;
