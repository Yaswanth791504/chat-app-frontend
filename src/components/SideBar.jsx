import { useDisclosure } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaMessage } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { RiGitClosePullRequestFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlertBox from "./AlertBox";

const SideBarDiv = styled.div`
  height: 100%;
  width: 4rem;
  border-radius: 20px;
  background-color: #1b1a55;
  color: white;
  padding: 20px 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: var(--box-shadow);
`;

const IconsDiv = styled.div`
  height: 15rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  font-size: 1.4rem;
  & ${NavLink} .active {
    color: var(--orange);
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleUserOnclickLogout() {
    localStorage.clear();
    navigate("/auth");
  }

  return (
    <>
      <SideBarDiv>
        <div>Icon</div>
        <IconsDiv>
          <NavLink to="/mine/addfriend">
            <IoMdAddCircle style={{ fontSize: "1.7rem", flex: 1 }} />
          </NavLink>
          <NavLink to="/mine/chats">
            <FaMessage />
          </NavLink>
          <NavLink to="/mine/requests">
            <RiGitClosePullRequestFill
              style={{ fontSize: "1.7rem", flex: 1 }}
            />
          </NavLink>
          <NavLink>
            <BiLogOut
              onClick={onOpen}
              style={{ fontSize: "1.7rem", flex: 1, color: "red" }}
            />
          </NavLink>
        </IconsDiv>
        <NavLink to="/mine/profile">
          <CgProfile style={{ fontSize: "1.7rem", flex: 1, color: "green" }} />
        </NavLink>
      </SideBarDiv>
      <AlertBox
        isOpen={isOpen}
        onClose={onClose}
        onClick={handleUserOnclickLogout}
      />
    </>
  );
};

export default SideBar;
