import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { UserReports } from "../components/UserReports";

export const AdminDashboard = () => {
  return (
    <Flex w="100%" justifyContent="center">
      <VStack w="75%">
        <Box w="100%" mt="30px">
          <Heading>Admin Dashboard</Heading>
          <Box pt='50px'>
            <UserReports />
          </Box>
        </Box>
      </VStack>
    </Flex>
  );
};
