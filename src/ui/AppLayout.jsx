import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import Container from "./Container";

const AppLayoutDiv = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f7f7f7;
`;

const AppLayout = () => {
  return (
    <AppLayoutDiv>
      <SideBar />
      <Container style={{ flex: 1 }}>
        <Outlet />
      </Container>
    </AppLayoutDiv>
  );
};

export default AppLayout;
