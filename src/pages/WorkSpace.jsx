import styled from "styled-components";
import SideBar from "../components/SideBar";

const WorkSpaceDiv = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 10px;
`;

const WrokSpace = () => {
  return (
    <WorkSpaceDiv>
      <SideBar />
    </WorkSpaceDiv>
  );
};

export default WrokSpace;
