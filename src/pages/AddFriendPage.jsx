import { Skeleton } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import AddFriendsDiv from "../components/AddFriendsDiv";
import FriendSearchBarHeader from "../components/FriendSearchBarHeader";
import SearchCardComponent from "../components/SearchCardComponent";
import { getSearchResults } from "../services/user";
import Container from "../ui/Container";

const AddFriendPage = () => {
  const [name, setName] = useState("");
  const searchbarRef = useRef(null);
  document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      if (searchbarRef.current) searchbarRef.current.focus();
    }
  });

  const {
    mutate,
    data = [],
    isPending,
  } = useMutation({
    mutationKey: ["search"],
    mutationFn: getSearchResults,
  });

  function setSearchName(event) {
    mutate(event.target.value);
    setName(event.target.value);
  }

  return (
    <Container style={{ flexDirection: "column", flex: 1 }}>
      <FriendSearchBarHeader
        search={false}
        value={name}
        setSearchValue={setSearchName}
        searchBarRef={searchbarRef}
      />
      <AddFriendsDiv>
        {isPending && data.length !== 0
          ? Array.from({ length: 10 }).map((_, index) => {
              return (
                <Skeleton key={index} height="15rem">
                  <SearchCardComponent height="20rem" />
                </Skeleton>
              );
            })
          : data.map((user) => (
              <SearchCardComponent
                key={user._id}
                name={user.name}
                id={user._id}
                profileImage={`${user?.profileImage}`}
              />
            ))}
        {data.length === 0 && !isPending && name.length !== 0 && (
          <p>No users found</p>
        )}
      </AddFriendsDiv>
    </Container>
  );
};

export default AddFriendPage;
