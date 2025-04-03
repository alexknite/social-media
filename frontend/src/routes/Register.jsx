import {
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { register } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();

  const missingUsername = username === "";
  const missingEmail = email === "";
  const missingFirstName = firstName === "";
  const missingPassword = password === "";
  const missingConfirmPassword = confirmPassword === "";

  const handleRegister = async () => {
    if (
      missingUsername ||
      missingEmail ||
      missingFirstName ||
      missingPassword ||
      missingConfirmPassword
    ) {
      alert("Please complete all required fields.");
    } else {
      try {
        await register(username, email, firstName, lastName, password);
        alert("Successfully registered!");
        nav("/login");
      } catch {
        alert("Error registering");
      }
    }
  };

  return (
    <Flex
      w="100%"
      h="calc(100vh - 90px)"
      justifyContent="center"
      alignItems="center"
    >
      <VStack w="95%" maxW="400px" alignItems="start" gap="20px">
        <Heading>Register</Heading>
        <VStack w="100%">
          <FormControl isInvalid={missingUsername}>
            <VStack w="100%" gap="10px" alignItems="start">
              {missingUsername ? (
                <FormErrorMessage>Username is required.</FormErrorMessage>
              ) : (
                <FormLabel>Username</FormLabel>
              )}
              <Input
                onChange={(e) => setUsername(e.target.value)}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <FormControl isInvalid={missingEmail}>
            <VStack w="100%" gap="10px" alignItems="start">
              {missingEmail ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : (
                <FormLabel>Email</FormLabel>
              )}
              <Input
                onChange={(e) => setEmail(e.target.value)}
                bg="white"
                type="email"
              />
            </VStack>
          </FormControl>
          <FormControl isInvalid={missingFirstName}>
            <VStack w="100%" gap="10px" alignItems="start">
              {missingFirstName ? (
                <FormErrorMessage>First Name is required.</FormErrorMessage>
              ) : (
                <FormLabel>First Name</FormLabel>
              )}
              <Input
                onChange={(e) => setFirstName(e.target.value)}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <FormControl>
            <VStack w="100%" gap="10px" alignItems="start">
              <FormLabel>Last Name</FormLabel>
              <Input
                onChange={(e) => setLastName(e.target.value)}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <FormControl isInvalid={missingPassword}>
            <VStack w="100%" gap="10px" alignItems="start">
              {missingPassword ? (
                <FormErrorMessage>Password is required.</FormErrorMessage>
              ) : (
                <FormLabel>Password</FormLabel>
              )}
              <Input
                onChange={(e) => setPassword(e.target.value)}
                bg="white"
                type="password"
              />
            </VStack>
          </FormControl>
          <FormControl isInvalid={missingConfirmPassword}>
            <VStack w="100%" gap="10px" alignItems="start">
              {missingConfirmPassword ? (
                <FormErrorMessage>
                  Please re-type your password.
                </FormErrorMessage>
              ) : (
                <FormLabel>Confirm Password</FormLabel>
              )}
              <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                bg="white"
                type="password"
              />
            </VStack>
          </FormControl>
          <VStack w="100%" alignItems="center">
            <Button
              onClick={handleRegister}
              w="100%"
              colorScheme="green"
              fontSize="18px"
              mt="10px"
            >
              Register
            </Button>
            <Text
              onClick={() => nav("/login")}
              cursor="pointer"
              fontSize="14px"
              color="gray.500"
            >
              Already have an account? Log in
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};
