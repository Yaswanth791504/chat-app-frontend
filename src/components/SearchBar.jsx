/* eslint-disable react/prop-types */
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

const CustomInput = styled(Input)`
  position: relative;

  &::placeholder {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SearchBar = ({ value, setSearchValue, searchBarRef }) => {
  return (
    <InputGroup>
      <CustomInput
        placeholder="ctrl + k to search"
        value={value}
        onChange={setSearchValue}
        style={{ borderRadius: "20px" }}
        ref={searchBarRef}
      />
      <InputRightElement>
        <FiSearch />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
