import { Flex, HStack, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      w="100vw"
      h="50px"
      justifyContent="center"
      alignItems="center"
      mt='auto'
    >
      <HStack>
        <Text>Made with ❤️ by alexnite</Text>
      </HStack>
    </Flex>
  );
};
