import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { search_users } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const users = await search_users(search);
    setUsers(users);
  };
  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxW="500px" alignItems="start" gap="20px">
        <Heading>Search Users</Heading>
        <HStack w="100%" gap="5px">

          <Input
            onChange={(e) => setSearch(e.target.value)}
            variant="flushed"
          />
          <Button onClick={handleSearch} colorScheme="blue">
            Search
          </Button>
        </HStack>
        <VStack w="100%">
          {users.map((u) => (
            <UserProfile
              key={`search-${u.username}`}
              username={u.username}
              profile_image={u.profile_image}
              first_name={u.first_name}
              last_name={u.last_name}
            />
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
};

const UserProfile = ({ username, profile_image, first_name, last_name }) => {
  const nav = useNavigate();

  const handleNav = () => {
    nav(`/${username}`);
  };
  return (
    <Flex
      onClick={handleNav}
      cursor="pointer"
      w="100%"
      h="100px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="8px"
      bg="white"
      justifyContent="center"
      alignItems="center"
    >
      <HStack w="90%" gap="20px" alignItems="center">
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
    </Flex>
  );
};
