import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FriendSearchBarHeader from "../components/FriendSearchBarHeader";
import HomePageFriendChats from "../components/HomePageFriendChats";
import SearchCardComponent from "../components/SearchCardComponent";
import { acceptRequest, getRequests } from "../services/user";
import Container from "../ui/Container";

const RequestsPage = () => {
  const { data } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
  console.log(data);

  const queryClient = useQueryClient();
  const toast = useToast();
  const { mutate: acceptRequestFriend } = useMutation({
    mutationKey: ["acceptrequest"],
    mutationFn: acceptRequest,
    onSuccess: (message) => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      return toast({
        title: "Request Accepted",
        description: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <>
      <Container style={{ width: "25rem", flexDirection: "column" }}>
        <FriendSearchBarHeader />
        <HomePageFriendChats />
      </Container>
      <Container
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "start",
          borderRadius: "20px",
          flexWrap: "wrap",
          overflowY: "scroll",
          padding: "10px",
          gap: "15px",
          position: "relative",
        }}
      >
        {data &&
          data.map((request) => (
            <SearchCardComponent
              key={request._id}
              id={request.from._id}
              name={request.from.name}
              profileImage={`/${request.from.profileImage?.split("\\").at(-1)}`}
              isRequest={true}
              acceptRequest={acceptRequestFriend}
            />
          ))}
        {data && data.length === 0 && (
          <p
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px",
            }}
          >
            No requests
          </p>
        )}
      </Container>
    </>
  );
};

export default RequestsPage;
