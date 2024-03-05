import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import styled from "styled-components";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignupPage";

const UserAccessDiv = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 550px) {
    padding: 20px;
  }
`;

const CustomTabs = styled(Tabs)`
  width: 30rem;
  height: 70vh;

  @media (max-width: 550px) {
    width: 100%;
    height: 70vh;
  }
`;

const LoginOrSignUp = () => {
  return (
    <UserAccessDiv>
      <CustomTabs>
        <TabList
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Tab style={{ width: "50%" }}>Log in</Tab>
          <Tab style={{ width: "50%" }}>Sign up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginPage />
          </TabPanel>
          <TabPanel>
            <SignUpPage />
          </TabPanel>
        </TabPanels>
      </CustomTabs>
    </UserAccessDiv>
  );
};

export default LoginOrSignUp;
