/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Container from "../ui/Container";
import FriendSearchBarHeader from "./../components/FriendSearchBarHeader";
import HomePageFriendChats from "./../components/HomePageFriendChats";

const CustomContainer = styled(Container)`
  width: 25rem;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 17rem;
  }
`;

const HomePage = () => {
  return (
    <>
      <CustomContainer>
        <FriendSearchBarHeader />
        <HomePageFriendChats />
      </CustomContainer>
      <Container
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "white",
          borderRadius: "20px",
          justifyContent: "center",
        }}
      >
        Start Messaging by clicking on Friend Chat
      </Container>
    </>
  );
};

export default HomePage;
