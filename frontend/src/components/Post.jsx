import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { toggle_like } from "../api/endpoints";

export const Post = ({
  id,
  username,
  description,
  formatted_date,
  liked,
  like_count,
}) => {
  const [clientLiked, setClientLiked] = useState(liked);
  const [clientLikeCount, setClientLikedCount] = useState(like_count);

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

  return (
    <VStack
      w="400px"
      h="400px"
      border="1px solid"
      borderColor="gray.400"
      borderRadius="8px"
    >
      <HStack
        w="100%"
        flex="1"
        borderBottom="1px solid"
        borderColor="gray.300"
        p="0 20px"
        bg="gray.50"
        borderRadius="8px 8px 0 0 "
      >
        <Text>@{username}</Text>
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
            <Box onClick={handleToggleLike}>
              {clientLiked ? (
                <Box color='red.600'>
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
