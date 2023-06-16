import {
  Text,
  Box,
  Flex,
  Icon,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavItem } from "../../interfaces/interface";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const DesktopSubNav = ({ label, to, subLabel }: NavItem) => {
  return (
    <Box
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("teal.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <NavLink to={to ?? "#"}>
            <Text
              transition={"all .3s ease"}
              _groupHover={{ color: "teal.400" }}
              fontWeight={500}
            >
              {label}
            </Text>
          </NavLink>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"teal.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

export default DesktopSubNav;
