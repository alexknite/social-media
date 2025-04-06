import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <VStack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.500"
          size="xl"
        >
          <Text>Loading...</Text>
        </Spinner>
      </VStack>
    </Flex>
  );
};
