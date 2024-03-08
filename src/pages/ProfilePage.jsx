/* eslint-disable no-unused-vars */
import {
  Button,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useRef, useState } from "react";
import { HiUpload } from "react-icons/hi";
import styled from "styled-components";
import AlertBox from "../components/AlertBox";
import BackgroundImage from "../components/BackgroundImage";
import FriendProfileCard from "../components/FriendProfileCard";
import ImageContainer from "../components/ImageContainer";
import ProfileForm from "../components/ProfileForm";
import Container from "../ui/Container";
import {
  getProfileInfo,
  getUserFriends,
  updateBackgroundImage,
  updateUserProfileImage,
} from "./../services/user";

const containerStyles = {
  backgroundColor: "#FFF",
  borderRadius: "20px",
  boxShadow: "var(--box-shadow)",
  alignItems: "start",
  padding: "10px",
};

const ProfileName = styled.h1`
  font-family: "Yesteryear", cursive;
  font-weight: 400;
  font-style: normal;
  text-shadow: 2px 3px 6px rgba(145, 145, 145, 1);
  flex: 1;
  display: flex;
  align-items: end;
  justify-content: end;
  font-size: 8rem;
  color: #fff;
  height: 50%;
  align-self: flex-end;
`;

const ProfilePage = () => {
  const handleHiddenRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileDetails, setProfileDetails] = useState({});
  const queryClient = useQueryClient();
  const backgroundImageInput = useRef(null);
  const toast = useToast();
  const [profileDetailsImageLink, setProfileDetailsImageLink] = useState("");

  function InputUpload() {
    handleHiddenRef.current.click();
  }

  let { data: friendsData } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  let { data: myProfileData, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileInfo,
  });
  useEffect(() => {
    if (myProfileData) {
      setProfileDetailsImageLink(myProfileData.backgroundImage);
    }
  }, [myProfileData]);

  const { mutate: updateUserAvatar } = useMutation({
    mutationKey: ["updateProfileImage"],
    mutationFn: updateUserProfileImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  function handleFileOnChange(event) {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    updateUserAvatar(fileUploaded);
  }

  const { mutate: updateBackgroundAvatar } = useMutation({
    mutationKey: ["updateBackgroundImage"],
    mutationFn: updateBackgroundImage,
    onSuccess: (message) => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      return toast({
        title: message.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  function handelBackgroundImageUpdate(event) {
    updateBackgroundAvatar(event.target.files[0]);
  }

  return (
    <Fragment>
      <Container
        style={{
          flex: 1,
          ...containerStyles,
          position: "relative",
          alignItems: "start",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <BackgroundImage link={profileDetailsImageLink}>
          <div style={{ width: "10rem" }}>
            <input
              type="file"
              name="backgroundImage"
              ref={backgroundImageInput}
              id="backgroundImage"
              style={{ display: "none" }}
              onChange={handelBackgroundImageUpdate}
            />
            <Button
              variant="solid"
              colorScheme="blackAlpha"
              onClick={() => backgroundImageInput.current.click()}
            >
              Set background image
            </Button>
          </div>
          {isPending && <Text style={{ color: "#000" }}>Loading...</Text>}
          <ProfileName>
            {myProfileData?.name.split(" ")[0].at(0).toUpperCase() +
              myProfileData?.name.split(" ")[0].slice(1)}
          </ProfileName>
        </BackgroundImage>
        <div style={{ position: "absolute", left: "30px", top: "180px" }}>
          <ImageContainer
            link={myProfileData?.profileImage || ""}
            size="300px"
            style={{
              boxShadow: "var(--box-shadow)",
              border: "5px solid #cf7135",
            }}
          />
          <input
            ref={handleHiddenRef}
            type="file"
            onChange={handleFileOnChange}
            style={{ display: "none" }}
          />
          <IconButton
            onClick={InputUpload}
            isRound={true}
            variant="solid"
            aria-label="Done"
            fontSize="20px"
            style={{
              position: "relative",
              top: "-70px",
              left: "230px",
              height: "3rem",
              width: "3rem",
              backgroundColor: "#1b1a52",
              color: "white",
              boxShadow: "0 0 0 5px white",
            }}
            icon={<HiUpload />}
          />
        </div>
        <ProfileForm user={myProfileData} />
      </Container>
      <Container
        style={{ width: "25rem", ...containerStyles, flexDirection: "column" }}
      >
        <Text fontSize="xl" as="b">
          Friends
        </Text>
        <Container
          style={{
            flexDirection: "column",
            width: "100%",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {friendsData &&
            friendsData?.map((friend, i) => (
              <FriendProfileCard
                key={i}
                id={friend._id}
                friend={friend}
                profileFun={setProfileDetails}
                onOpen={onOpen}
              />
            ))}
        </Container>
      </Container>
      <AlertBox
        isOpen={isOpen}
        onClose={onClose}
        profileDetails={profileDetails}
      />
    </Fragment>
  );
};

export default ProfilePage;
