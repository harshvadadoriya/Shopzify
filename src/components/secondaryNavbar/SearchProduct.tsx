import {
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchProductsQuery } from "../../redux/apiSliceRedux/apiSlice";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const inputBg = useColorModeValue("none", "gray.600");
  const inputColor = useColorModeValue("black", "white");
  const [searchInput, setSearchInput] = useState<string>("");
  const [isSearchRequested, setIsSearchRequested] = useState<boolean>(false);

  const navigate = useNavigate();

  const { data } = useSearchProductsQuery(searchInput, {
    skip: !isSearchRequested,
  });

  const handleSearch = () => {
    setIsSearchRequested(true);
    if (data) {
      navigate("/search-products", { state: { data } });
    } else {
      navigate("/search-products", { state: { data: [] } });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsSearchRequested(false);
  };

  return (
    <>
      <InputGroup maxW="md">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Search Products"
          borderRadius="md"
          borderWidth={1}
          color={inputColor}
          bgColor={inputBg}
          _focus={{ borderColor: "transparent" }}
          onChange={handleInputChange}
        />
        <IconButton
          aria-label="Search database"
          ml={2}
          icon={<SearchIcon />}
          onClick={handleSearch}
        />
      </InputGroup>
    </>
  );
};

export default SearchProduct;
