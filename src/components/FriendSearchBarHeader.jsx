/* eslint-disable react/prop-types */
import { IconButton } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const ChatSearchDiv = styled.div`
  width: 100%;
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

const FriendSearchBarHeader = ({
  search = true,
  value,
  setSearchValue,
  searchBarRef,
}) => {
  return (
    <ChatSearchDiv>
      <NavLink to="/mine/chats">
        <h1>Chat</h1>
      </NavLink>
      <SearchBar
        searchBarRef={searchBarRef}
        value={value}
        setSearchValue={setSearchValue}
      />

      {search && (
        <NavLink to="/mine/addFriend">
          <IconButton
            isRound={true}
            variant="solid"
            colorScheme="orange"
            aria-label="Done"
            fontSize="20px"
            icon={<IoMdAdd />}
          />
        </NavLink>
      )}
    </ChatSearchDiv>
  );
};

export default FriendSearchBarHeader;
