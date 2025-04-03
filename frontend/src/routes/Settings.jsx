import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { update_user } from "../api/endpoints";

export const Settings = () => {
  const storage = JSON.parse(localStorage.getItem("userData"));

  const [username, setUsername] = useState(storage ? storage.username : "");
  const [email, setEmail] = useState(storage ? storage.email : "");
  const [profileImage, setProfileImage] = useState(
    storage ? storage.profile_image : "",
  );
  const [firstName, setFirstName] = useState(storage ? storage.first_name : "");
  const [lastName, setLastName] = useState(storage ? storage.last_name : "");
  const [bio, setBio] = useState(storage ? storage.bio : "");

  const handleDelete = async () => {
    console.log("Delete!");
  };

  const handleUpdate = async () => {
    try {
      await update_user({
        username: username,
        email: email,
        profile_image: profileImage,
        first_name: firstName,
        last_name: lastName,
        bio: bio,
      });
      localStorage.setItem(
        "userData",
        JSON.stringify({
          username: username,
          email: email,
          first_name: firstName,
          last_name: lastName,
          bio: bio,
        }),
      );
      alert("Successfully updated user details!");
    } catch {
      alert("Error updating details!");
    }
  };

  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxW="500px" alignItems="start" gap="20px">
        <Heading>Settings</Heading>
        <VStack w="100%" alignItems="start" gap="10px">
          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <input
              onChange={(e) => setProfileImage(e.target.files[0])}
              bg="white"
              type="file"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              bg="white"
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              bg="white"
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              bg="white"
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              bg="white"
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              type="text"
            />
          </FormControl>
          <Button onClick={handleUpdate} w="100%" colorScheme="blue" mt="10px">
            Save Changes
          </Button>
        </VStack>
        <Button onClick={handleDelete} colorScheme="red">
          Delete User
        </Button>
      </VStack>
    </Flex>
  );
};
