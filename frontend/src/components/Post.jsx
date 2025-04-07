import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuArchive, LuArchiveRestore, LuTrash2 } from "react-icons/lu";
import { Badge, Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { delete_post, toggle_archived, toggle_like } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export const Post = ({
  id,
  username,
  description,
  formatted_date,
  liked,
  like_count,
  archived,
  setPosts,
  home,
}) => {
  const storage = JSON.parse(localStorage.getItem("userData"));

  const [clientLiked, setClientLiked] = useState(liked);
  const [clientLikeCount, setClientLikedCount] = useState(like_count);
  const [clientArchived, setClientArchived] = useState(archived);

  const ownsPost = (storage ? storage.username : "") === username;
  const isAdmin = (storage ? storage.role : "") === "ADMIN";

  const nav = useNavigate();
  const handleNavigation = (route) => {
    nav(`/${route}`);
  };

  const handleToggleLike = async () => {
    const data = await toggle_like(id);
    if (data.now_liked) {
      setClientLiked(true);
      setClientLikedCount(clientLikeCount + 1);
    } else {
      setClientLiked(false);
      setClientLikedCount(clientLikeCount - 1);
    }
  };
  const handleDelete = async () => {
    const data = await delete_post(id);
    if (data.success) {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((p) => p.id !== id);
        return [...updatedPosts];
      });
    }
  };
  const handleToggleArchive = async () => {
    const data = await toggle_archived(id, !clientArchived);
    if (data.success) {
      setClientArchived(data.archived);
    }
    setPosts((prevPosts) => {
      if (home) {
        return [...prevPosts.filter((p) => p.id !== id)];
      } else {
        const post = prevPosts.all.find((p) => p.id === id);
        post.archived = data.archived;

        let unarchived = prevPosts.unarchived;

        if (data.archived) {
          unarchived = [...prevPosts.unarchived.filter((p) => p.id !== id)];
        } else {
          unarchived = [...prevPosts.unarchived, post];
        }

        return {
          all: prevPosts.all,
          unarchived: unarchived,
        };
      }
    });
  };

  return (
    <VStack
      w="400px"
      h="200px"
      border="1px solid"
      borderColor="gray.400"
      borderRadius="8px"
    >
      <HStack
        w="100%"
        flex="1"
        borderBottom="1px solid"
        borderColor="gray.300"
        p="10px 20px"
        bg="gray.50"
        borderRadius="8px 8px 0 0 "
        justifyContent="space-between"
      >
        <HStack>
          {clientArchived ? <Badge colorScheme="red">Archived</Badge> : <></>}
          <Text onClick={() => handleNavigation(username)} cursor="pointer">
            @{username}
          </Text>
        </HStack>
        {ownsPost || isAdmin ? (
          <HStack>
            <Box onClick={handleToggleArchive} cursor="pointer">
              {clientArchived ? <LuArchiveRestore /> : <LuArchive />}
            </Box>
            <LuTrash2 onClick={handleDelete} cursor="pointer" />
          </HStack>
        ) : (
          <></>
        )}
      </HStack>
      <Flex
        flex="6"
        w="100%"
        h="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text textAlign="center">{description}</Text>
      </Flex>
      <Flex
        flex="2"
        w="100%"
        justifyContent="center"
        alignItems="center"
        borderTop="1px solid"
        borderColor="gray.400"
        borderRadius="0 0 8px 8px"
        bg="gray.50"
      >
        <HStack w="90%" justifyContent="space-between">
          <HStack>
            <Box cursor="pointer" onClick={handleToggleLike}>
              {clientLiked ? (
                <Box color="red.600">
                  <FaHeart />
                </Box>
              ) : (
                <FaRegHeart />
              )}
            </Box>
            <Text> {clientLikeCount}</Text>
          </HStack>
          <Text>{formatted_date}</Text>
        </HStack>
      </Flex>
    </VStack>
  );
};
