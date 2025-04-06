import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { create_post } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const [description, setDescription] = useState("");
  const nav = useNavigate();

  const handlePost = async () => {
    const data = await create_post(description);
    if (data.success) {
      nav("/");
    } else {
      alert(data.error);
    }
  };

  return (
    <Flex w="100%" h="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxW="450px" alignItems="start" gap="40px">
        <Heading>Create Post</Heading>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            bg="white"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button w="100%" colorScheme="blue" onClick={handlePost}>
          Create Post
        </Button>
      </VStack>
    </Flex>
  );
};
