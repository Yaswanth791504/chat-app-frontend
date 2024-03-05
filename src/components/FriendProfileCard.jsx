/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Card, Stack, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFriend } from "../services/user";
import ImageContainer from "./ImageContainer";

const FriendProfileCard = ({ id, friend, profileFun, onOpen }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: removefriendMutation } = useMutation({
    mutationKey: ["removeFriend"],
    mutationFn: removeFriend,
    onSuccess: (message) => {
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });
      return toast({
        title: message,
        status: "success",
        isClosable: true,
      });
    },
    onError: (err) => {
      return toast({
        title: err.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  function handleProfileDetails() {
    profileFun(friend);
    onOpen();
  }

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        style={{
          width: "100%",
          minHeight: "5rem",
          alignContent: "center",
          flexWrap: "wrap",
          padding: "10px",
          gap: "0.5rem",
        }}
      >
        <ImageContainer
          link={friend.profileImage}
          alt="profileImage"
          size="50px"
        />
        <Stack
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: "0 10px",
          }}
        >
          <Button
            size="md"
            variant="outline"
            style={{ width: "7rem" }}
            colorScheme="black"
            onClick={handleProfileDetails}
          >
            Profile
          </Button>
          <Button
            size="md"
            variant="solid"
            style={{ width: "7rem" }}
            colorScheme="orange"
            onClick={() => {
              console.log(id);
              removefriendMutation(id);
            }}
          >
            Remove
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default FriendProfileCard;
