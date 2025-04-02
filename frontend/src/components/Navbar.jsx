import { Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export const Navbar = () => {
  const nav = useNavigate();

  const handleNavigation = (route) => {
    nav(`/${route}`);
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
        <Text fontSize="24px" fontWeight="bold">
          Social Media
        </Text>
        <HStack>
          <Text
            onClick={(route) => handleNavigation("alexnite")}
            cursor="pointer"
          >
            <CgProfile size="25px" />
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
};
