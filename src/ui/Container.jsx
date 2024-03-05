import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0400ff67;
    border-radius: 100px;
  }
`;

export default Container;
