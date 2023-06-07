import {
  Box,
  Flex,
  Menu,
  MenuButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SearchProduct from "./SearchProduct";

const SecondaryNavbar = () => {
  const menuBgColor = useColorModeValue("white", "gray.700");

  return (
    <Box flexGrow={1}>
      <Flex
        align="center"
        justify="space-between"
        p={4}
        bg={menuBgColor}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.600")}
        userSelect="none"
      >
        <SearchProduct />
        <Flex display={"flex"}>
          <NavLink to="/wishlist">
            <Menu>
              <MenuButton
                boxSize={10}
                borderRadius={5}
                color={"white"}
                aria-label="cart"
                marginLeft={2}
                bgColor={"teal.400"}
                _hover={{
                  bgColor: "teal.300",
                }}
              >
                <FaRegHeart className="ml-[0.7rem]" />
              </MenuButton>
            </Menu>
          </NavLink>
          <NavLink to="/cart">
            <Menu>
              <MenuButton
                boxSize={10}
                borderRadius={5}
                color={"white"}
                aria-label="cart"
                marginX={2}
                bgColor={"teal.400"}
                _hover={{
                  bgColor: "teal.300",
                }}
              >
                <FaShoppingCart className="ml-[0.7rem]" />
              </MenuButton>
            </Menu>
          </NavLink>
          <Menu>
            <MenuButton
              boxSize={10}
              borderRadius={5}
              aria-label="account"
              color={"white"}
              zIndex={1}
              bgColor={"teal.400"}
              _hover={{
                bgColor: "teal.300",
              }}
            >
              <FaUser className="ml-[0.7rem]" />
            </MenuButton>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SecondaryNavbar;
