import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { report_user } from "../api/endpoints";

export const Report = () => {
  const storage = JSON.parse(localStorage.getItem("reportUser"));

  const [username, setUsername] = useState(storage ? storage.username : "");
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const missingUsername = username === "";
  const missingReason = reason === "";

  const handleSubmit = async () => {
    const data = await report_user(username, {
      reason: reason,
      description: description,
    });
    console.log(data)
    if (data.success) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  };

  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxW="500px" alignItems="start" gap="20px">
        <Heading>Report</Heading>
        <VStack w="100%" alignItems="start" gap="20px">
          <FormControl isInvalid={missingUsername}>
            <VStack w="100%" gap="5px" alignItems="start">
              {missingUsername ? (
                <FormErrorMessage>Username is required.</FormErrorMessage>
              ) : (
                <FormLabel>Username</FormLabel>
              )}
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <FormControl isInvalid={missingReason}>
            <VStack w="100%" gap="5px" alignItems="start">
              {missingReason ? (
                <FormErrorMessage>Reason is required.</FormErrorMessage>
              ) : (
                <FormLabel>Reason</FormLabel>
              )}
              <Select
                placeholder="Select a reason"
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="harassment">Harassment</option>
                <option value="fraud">Fraud</option>
                <option value="spam">Spam</option>
                <option value="inappropriate">Inappropriate</option>
                <option value="other">Other</option>
              </Select>
            </VStack>
          </FormControl>
          <FormControl>
            <VStack w="100%" gap="5px" alignItems="start">
              <FormLabel>Description</FormLabel>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <Button
            alignSelf="end"
            onClick={handleSubmit}
            colorScheme="blue"
            mt="10px"
          >
            Submit
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};
