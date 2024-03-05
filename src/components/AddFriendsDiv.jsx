import styled from "styled-components";

export const HomePageFriendChat = styled.div`
  height: 87vh;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 20px 10px;
  box-shadow: var(--box-shadow);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3.5rem;
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
const AddFriendsDiv = ({ children }) => {
  return <HomePageFriendChat>{children}</HomePageFriendChat>;
};

export default AddFriendsDiv;
