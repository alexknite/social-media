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

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        await register(username, email, firstName, lastName, password);
        alert("Successfully registered!");
        nav("/login");
      } catch {
        alert("Error registering");
      }
    } else {
      alert("Passwords do not match");
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
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            bg="white"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            bg="white"
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            bg="white"
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            onChange={(e) => setLastName(e.target.value)}
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
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="white"
            type="password"
          />
        </FormControl>
        <VStack w="100%" alignItems="center">
          <Button
            onClick={handleRegister}
            w="100%"
            colorScheme="green"
            fontSize="18px"
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
    </Flex>
  );
};
