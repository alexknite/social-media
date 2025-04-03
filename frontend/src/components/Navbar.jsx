import { Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  LuCirclePlus,
  LuCircleUser,
  LuSearch,
  LuSettings,
} from "react-icons/lu";

export const Navbar = () => {
  const nav = useNavigate();

  const handleNavigation = (route) => {
    nav(`/${route}`);
  };

  const handleNavigateUser = () => {
    const user = JSON.parse(localStorage.getItem("userData"))["username"];
    nav(`/${user}`);
    window.location.reload();
  };
  return (
    <Flex
      w="100vw"
      h="90px"
      bg="green.700"
      justifyContent="center"
      alignItems="center"
    >
      <HStack w="90%" justifyContent="space-between" color="white">
        <Text
          onClick={(route) => handleNavigation("")}
          cursor="pointer"
          fontSize="24px"
          fontWeight="bold"
        >
          Social Media
        </Text>
        <HStack gap="15px">
          <Text
            onClick={(route) => handleNavigation("create/post")}
            cursor="pointer"
          >
            <LuCirclePlus size="30px" />
          </Text>
          <Text onClick={handleNavigateUser} cursor="pointer">
            <LuCircleUser size="30px" />
          </Text>
          <Text
            onClick={(route) => handleNavigation("settings")}
            cursor="pointer"
          >
            <LuSettings size="30px" />
          </Text>
          <Text
            onClick={(route) => handleNavigation("search")}
            cursor="pointer"
          >
            <LuSearch size="30px" />
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
};
