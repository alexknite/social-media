import {
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { login } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    const data = await login(username, password);

    if (data.success) {
      nav(`/${username}`);
    } else {
      alert("Invalid username or password");
    }
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
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            bg="white"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            bg="white"
            type="password"
          />
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
