import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LuCirclePlus, LuCircleUser, LuLogOut, LuSearch } from "react-icons/lu";
import { logout } from "../api/endpoints";

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

  const handleLogout = async () => {
    try {
      await logout();
      nav("/login");
    } catch {
      alert("Error logging out!");
    }
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
          onClick={() => handleNavigation("")}
          cursor="pointer"
          fontSize="24px"
          fontWeight="bold"
        >
          Social Media
        </Text>
        <HStack gap="15px">
          <Text onClick={() => handleNavigation("search")} cursor="pointer">
            <LuSearch size="30px" />
          </Text>
          <Text onClick={handleNavigateUser} cursor="pointer">
            <LuCircleUser size="30px" />
          </Text>
          <Text
            onClick={() => handleNavigation("create/post")}
            cursor="pointer"
          >
            <LuCirclePlus size="30px" />
          </Text>
          <Box ml="10px">
            <Text onClick={handleLogout} cursor="pointer">
              <LuLogOut size="30px" />
            </Text>
          </Box>
        </HStack>
      </HStack>
    </Flex>
  );
};
