import { Box, Flex, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../components/User/UserDetails";
import { UserPosts } from "../components/User/UserPosts";

export const UserProfile = () => {
  const storage = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = storage ? storage["role"] === "ADMIN" : false;

  const get_username_from_url = () => {
    const url_split = window.location.pathname.split("/");
    return url_split[url_split.length - 1];
  };

  const [username, setUsername] = useState(get_username_from_url());
  const [isOurProfile, setIsOurProfile] = useState(false);
  const nav = useNavigate();

  const handleNav = (route) => {
    nav(`/${route}`);
  };

  useEffect(() => {
    setUsername(get_username_from_url());
  }, []);

  return (
    <Flex w="100%" justifyContent="center">
      <VStack w="75%">
        <Box w="100%" mt="40px">
          <UserDetails
            username={username}
            isOurProfile={isOurProfile}
            setIsOurProfile={setIsOurProfile}
            handleNav={handleNav}
            isAdmin={isAdmin}
          />
        </Box>
        <Box w="100%" mt="30px">
          <UserPosts
            username={username}
            isOurProfile={isOurProfile}
            isAdmin={isAdmin}
          />
        </Box>
      </VStack>
    </Flex>
  );
};
