import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { delete_user, search_users } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";

export const AdminDashboard = () => {
  return (
    <Flex w="100%" justifyContent="center">
      <VStack w="75%">
        <Box w="100%" mt="30px">
          <Heading>Admin Dashboard</Heading>
          <Box>
            <UserControls />
          </Box>
        </Box>
      </VStack>
    </Flex>
  );
};

const UserControls = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await search_users("");
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);

  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxWidth="500px" alignItems="start" gap="20px">
        <Heading fontWeight="300">User Controls</Heading>
        <VStack w="100%">
          {users.map((u) => (
            <UserSettings
              key={`admin-${u.username}`}
              username={u.username}
              profile_image={u.profile_image}
              first_name={u.first_name}
              last_name={u.last_name}
              setUsers={setUsers}
            />
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
};

const UserSettings = ({
  username,
  profile_image,
  first_name,
  last_name,
  setUsers,
}) => {
  const handleDelete = async () => {
    const data = await delete_user(username);

    if (data.success) {
      setUsers((prevUsers) => [
        ...prevUsers.filter((u) => u.username !== username),
      ]);
    } else {
      alert(`There was an error deleting ${username}`);
    }
  };
  return (
    <Flex
      w="100%"
      h="100px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="8px"
      bg="white"
      justifyContent="center"
      alignItems="center"
    >
      <HStack
        w="90%"
        gap="20px"
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack>
          <Box
            boxSize="70px"
            borderRadius="full"
            overflow="hidden"
            bg="white"
            border="1px solid"
          >
            {profile_image ? (
              <Image
                src={`${SERVER_URL}${profile_image}`}
                boxSize="100%"
                objectFit="cover"
              />
            ) : (
              <></>
            )}
          </Box>
          <VStack alignItems="start" gap="3px">
            <Text fontWeight="medium">
              {first_name} {last_name}
            </Text>
            <Text color="gray.600" fontSize="15px">
              @{username}
            </Text>
          </VStack>
        </HStack>
        <Button onClick={handleDelete} colorScheme="red" size="sm">
          Delete User
        </Button>
      </HStack>
    </Flex>
  );
};
