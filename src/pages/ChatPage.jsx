import Container from "../ui/Container";
import FriendHeader from "./../components/FriendHeader";
import FriendSearchBarHeader from "./../components/FriendSearchBarHeader";
import HomePageFriendChats from "./../components/HomePageFriendChats";
import HomePageMessageDiv from "./../components/HomePageMessageDiv";

const ChatPage = () => {
  return (
    <>
      <Container style={{ width: "25rem", flexDirection: "column" }}>
        <FriendSearchBarHeader />
        <HomePageFriendChats />
      </Container>
      <Container style={{ flex: 1, flexDirection: "column" }}>
        <FriendHeader />
        <HomePageMessageDiv />
      </Container>
    </>
  );
};

export default ChatPage;
