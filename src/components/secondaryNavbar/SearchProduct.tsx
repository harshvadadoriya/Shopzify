import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSearchProductsQuery } from "../../redux/apiSliceRedux/apiSlice";
import { Navigate, useNavigate } from "react-router-dom";
import SearchedProducts from "./SearchedProducts";
import { ProductFormValues } from "../../interfaces/interface";

const SearchProduct = () => {
  const inputBg = useColorModeValue("none", "gray.600");
  const inputColor = useColorModeValue("black", "white");
  const [searchInput, setSearchInput] = useState<string>("");

  const navigate = useNavigate();

  const { data } = useSearchProductsQuery(searchInput);

  const handleSearch = () => {
    if (data) {
      navigate("/search-products", { state: { data } });
    } else {
      navigate("/search-products", { state: { data: [] } });
    }
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
          onChange={(e) => setSearchInput(e.target.value)}
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
