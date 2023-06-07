import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { ProductFormValues } from "../../interfaces/interface";
import { useSearchProductsQuery } from "../../redux/apiSliceRedux/apiSlice";
import { Navigate, useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const inputBg = useColorModeValue("none", "gray.600");
  const inputColor = useColorModeValue("black", "white");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<
    ProductFormValues[] | unknown
  >();

  const navigate = useNavigate();

  const { data, isLoading, isError } = useSearchProductsQuery(searchInput);

  const handleSearch = () => {
    console.log(data);
    setSearchProducts(data);
    navigate("/search-products");
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
