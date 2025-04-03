import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LuCirclePlus, LuCircleUser, LuLogOut, LuSearch } from "react-icons/lu";
import { useAuth } from "../contexts/useAuth";

export const Navbar = () => {
  const { auth, authLoading, auth_logout } = useAuth();
  const nav = useNavigate();

  const handleNavigation = (route) => {
    nav(`/${route}`);
  };

  const handleNavigateUser = () => {
    const user = JSON.parse(localStorage.getItem("userData"))["username"];
    nav(`/${user}`);
    window.location.reload();
  };

  const handleLogout = () => {
    auth_logout();
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
        {authLoading ? (
          <></>
        ) : auth ? (
          <HStack gap="15px">
            <Text onClick={() => handleNavigation("search")} cursor="pointer">
              <LuSearch size="25px" />
            </Text>
            <Text onClick={handleNavigateUser} cursor="pointer">
              <LuCircleUser size="25px" />
            </Text>
            <Text
              onClick={() => handleNavigation("create/post")}
              cursor="pointer"
            >
              <LuCirclePlus size="25px" />
            </Text>
            <Box ml="10px">
              <Text onClick={handleLogout} cursor="pointer">
                <LuLogOut size="25px" />
              </Text>
            </Box>
          </HStack>
        ) : (
          <></>
        )}
      </HStack>
    </Flex>
  );
};
