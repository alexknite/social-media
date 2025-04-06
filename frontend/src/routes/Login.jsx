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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { auth_login } = useAuth();

  const missingUsername = username === "";
  const missingPassword = password === "";

  const handleLogin = () => {
    auth_login(username, password);
  };

  return (
    <Flex
      w="100%"
      h="calc(100vh - 90px)"
      justifyContent="center"
      alignItems="center"
    >
      <VStack w="95%" maxW="400px" alignItems="start" gap="30px">
        <Heading>Login</Heading>
        <FormControl isInvalid={missingUsername}>
          <VStack w="100%" gap="10px" alignItems="start">
            {missingUsername ? (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            ) : (
              <FormLabel>Username</FormLabel>
            )}
            <Input
              variant="flushed"
              onChange={(e) => setUsername(e.target.value)}
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
              variant="flushed"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </VStack>
        </FormControl>
        <VStack w="100%" alignItems="center">
          <Button
            onClick={handleLogin}
            w="100%"
            colorScheme="green"
            fontSize="18px"
          >
            Login
          </Button>
          <Text
            onClick={() => nav("/register")}
            cursor="pointer"
            fontSize="14px"
            color="gray.500"
          >
            Don't have an account? Register
          </Text>
        </VStack>
      </VStack>
    </Flex>
  );
};
