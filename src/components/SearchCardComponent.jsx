/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { sendRequestToUser } from "../services/user";

const SearchCardComponent = ({
  profileImage,
  name,
  height,
  id,
  acceptRequest,
}) => {
  const { data, mutate } = useMutation({
    mutationKey: ["addFriend"],
    mutationFn: sendRequestToUser,
    onSuccess: (message) => {},
  });
  console.log(profileImage);

  function handleAddFriend() {
    mutate(id);
  }

  return (
    <Card
      maxW="fit-content"
      boxShadow="var(--box-shadow)"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height || "fit-content",
        flexDirection: "column",
        cursor: "pointer",
        maxHeight: "17rem",
        minWidth: "10rem",
      }}
    >
      <CardBody maxW="fit-content">
        <Image
          src={profileImage}
          height="100px"
          minWidth="100px"
          borderRadius="lg"
        />
        <Heading style={{ textAlign: "center" }} mt="6" size="md">
          {name || "name"}
        </Heading>
      </CardBody>
      <Divider maxW="fit-content" />
      <CardFooter maxW="fit-content">
        <ButtonGroup spacing="2">
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={
              acceptRequest !== undefined
                ? () => acceptRequest(id)
                : handleAddFriend
            }
          >
            {acceptRequest === undefined
              ? data === "Request already sent"
                ? "Request Sent"
                : "Add Friend"
              : "Accept Request"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default SearchCardComponent;
